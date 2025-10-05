// src/types/mobile.d.ts
declare interface TouchEventHandlers {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
}

declare type MobileOrientation = 'portrait' | 'landscape';