// src/utils/device-utils.ts

/**
 * Detects if the device supports touch events
 */
export const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    (navigator.maxTouchPoints > 0) ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

/**
 * Gets the device type based on viewport width
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Checks if device is iOS
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

/**
 * Checks if device is Android
 */
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};