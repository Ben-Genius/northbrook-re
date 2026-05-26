const FRAME_COUNT = 220;
const BASE_URL = "/hero/frame_";
const EXT = ".webp";

export const frameCache = new Map<number, HTMLImageElement>();
let loadedCount = 0;

export function getFrameLoadProgress(): number {
  return loadedCount / FRAME_COUNT;
}

export { FRAME_COUNT };

if (typeof window !== "undefined") {
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `${BASE_URL}${String(i).padStart(3, "0")}${EXT}`;
    img.onload = img.onerror = () => {
      loadedCount++;
    };
    frameCache.set(i, img);
  }
}
