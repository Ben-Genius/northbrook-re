"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Flip,
    ScrambleTextPlugin,
    DrawSVGPlugin,
    MotionPathPlugin,
    useGSAP
  );
}

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  useGSAP,
};
