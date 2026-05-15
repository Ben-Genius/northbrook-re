"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ImageSequencePlayerProps {
  frameCount: number;
  baseUrl: string;
  extension: string;
  className?: string;
  onFrameUpdate?: (frameIndex: number) => void;
  progress?: number;
}

const BATCH_SIZE = 10; // frames loaded per idle callback tick

export default function ImageSequencePlayer({
  frameCount,
  baseUrl,
  extension,
  className,
  onFrameUpdate,
  progress,
}: ImageSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount));
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const loadedCountRef = useRef(0);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const img = imagesRef.current[index];
    if (!img?.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const pw = window.innerWidth * dpr;
    const ph = window.innerHeight * dpr;
    const imgRatio = img.width / img.height;
    const canvasRatio = pw / ph;
    let dw: number, dh: number, dx: number, dy: number;

    if (imgRatio > canvasRatio) {
      dh = ph; dw = ph * imgRatio; dx = (pw - dw) / 2; dy = 0;
    } else {
      dw = pw; dh = pw / imgRatio; dx = 0; dy = (ph - dh) / 2;
    }

    ctx.clearRect(0, 0, pw, ph);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, dw, dh);
    onFrameUpdate?.(index);
  }, [onFrameUpdate]);

  // Step 1: load frame 0 immediately for first paint
  useEffect(() => {
    const img = new Image();
    img.src = `${baseUrl}001${extension}`;
    img.onload = () => {
      imagesRef.current[0] = img;
      loadedCountRef.current = 1;
      setFirstFrameReady(true);
      setImagesLoaded(1);
    };
    img.onerror = () => {
      loadedCountRef.current = 1;
      setFirstFrameReady(true);
      setImagesLoaded(1);
    };
  }, [baseUrl, extension]);

  // Step 2: load remaining frames in idle-time batches
  useEffect(() => {
    if (!firstFrameReady) return;

    let nextIndex = 2; // frame 1 is done, start at 2
    let idleHandle: number;

    const loadBatch = (deadline: IdleDeadline) => {
      while (nextIndex <= frameCount && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
        const i = nextIndex - 1; // 0-based array index
        const frameNum = String(nextIndex).padStart(3, "0");
        const img = new Image();
        img.src = `${baseUrl}${frameNum}${extension}`;
        img.onload = img.onerror = () => {
          loadedCountRef.current++;
          setImagesLoaded(loadedCountRef.current);
        };
        imagesRef.current[i] = img;
        nextIndex++;
      }
      if (nextIndex <= frameCount) {
        idleHandle = requestIdleCallback(loadBatch, { timeout: 500 });
      }
    };

    if (typeof requestIdleCallback !== "undefined") {
      idleHandle = requestIdleCallback(loadBatch, { timeout: 500 });
    } else {
      // Safari fallback: batch via setTimeout
      const fallbackLoad = () => {
        const end = Math.min(nextIndex + BATCH_SIZE, frameCount + 1);
        while (nextIndex < end) {
          const i = nextIndex - 1;
          const frameNum = String(nextIndex).padStart(3, "0");
          const img = new Image();
          img.src = `${baseUrl}${frameNum}${extension}`;
          img.onload = img.onerror = () => {
            loadedCountRef.current++;
            setImagesLoaded(loadedCountRef.current);
          };
          imagesRef.current[i] = img;
          nextIndex++;
        }
        if (nextIndex <= frameCount) setTimeout(fallbackLoad, 16);
      };
      setTimeout(fallbackLoad, 16);
    }

    return () => {
      if (typeof cancelIdleCallback !== "undefined" && idleHandle) {
        cancelIdleCallback(idleHandle);
      }
    };
  }, [firstFrameReady, frameCount, baseUrl, extension]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        renderFrame(0);
      };

      window.addEventListener("resize", setCanvasSize);
      setCanvasSize();

      return () => window.removeEventListener("resize", setCanvasSize);
    },
    { scope: containerRef, dependencies: [firstFrameReady] }
  );

  // Drive frame from scroll progress prop
  useEffect(() => {
    if (progress === undefined) return;
    const frameIndex = Math.min(
      Math.floor(progress * (frameCount - 1)),
      imagesLoaded - 1
    );
    if (frameIndex >= 0) renderFrame(frameIndex);
  }, [progress, frameCount, imagesLoaded, renderFrame]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
