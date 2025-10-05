// src/components/ui/hover-card.tsx
import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';

const HoverCard = ({ children, ...props }: HoverCardPrimitive.HoverCardProps) => {
  const isTouchDevice = React.useMemo(() => {
    return typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // Disable hover behavior completely on touch devices
  return (
    <HoverCardPrimitive.Root 
      openDelay={isTouchDevice ? 0 : 100}
      closeDelay={isTouchDevice ? 0 : 300}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Root>
  );
};

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      asChild
      // Add touch-action to prevent browser interference
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Trigger>
  );
});
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const isTouchDevice = React.useMemo(() => {
    return typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        {
          'hidden pointer-events-none': isTouchDevice,
          'block': !isTouchDevice
        },
        className
      )}
      onPointerDownOutside={(e) => {
        if (e.detail.originalEvent.pointerType === 'touch') {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };