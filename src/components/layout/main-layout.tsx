// src/components/layout/main-layout.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useMobileView } from '@/hooks/use-mobile-view';
import { isTouchDevice } from '@/utils/device-utils';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useMobileView();
  const [isTouch, setIsTouch] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    setIsTouch(isTouchDevice());

    const updateViewportHeight = () => {
      const newHeight = `${window.innerHeight}px`;
      setViewportHeight(newHeight);
      document.documentElement.style.setProperty('--viewport-height', newHeight);
    };

    // Initial setup
    updateViewportHeight();

    // Handle mobile viewport changes
    if (isMobile) {
      window.addEventListener('resize', updateViewportHeight);
      window.visualViewport?.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.visualViewport?.removeEventListener('resize', updateViewportHeight);
      document.documentElement.style.removeProperty('--viewport-height');
    };
  }, [isMobile]);

  return (
    <div 
      className={`
        flex flex-col min-h-screen
        ${isMobile ? 'touch-optimized' : ''}
        ${isTouch ? 'coarse-pointer' : 'fine-pointer'}
      `}
      style={{ '--viewport-height': viewportHeight }}
    >
      <Header />
      <main className={`
        flex-1 w-full
        ${isMobile ? 'overflow-y-auto touch-action-pan-y' : ''}
      `}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
