import React, { useEffect, useRef, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMagneticActive, setIsMagneticActive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position refs for smooth lerp interpolation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });

  // Magnetic attraction state
  const magneticState = useRef<{
    active: boolean;
    center: { x: number; y: number };
    strength: number; // 0 to 1
    activeElement: HTMLElement | null;
  }>({
    active: false,
    center: { x: 0, y: 0 },
    strength: 0,
    activeElement: null,
  });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad, not touch)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
      }

      // 1. Check for interactive elements (hover state)
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('button, a, input, textarea, [role="button"], .cursor-pointer, [data-cursor="interactive"]')
      );
      setIsHoveringInteractive(isInteractive);

      // 2. Compute Magnetic Pull towards Contact Pills
      const magneticElements = document.querySelectorAll<HTMLElement>('[data-magnetic="true"]');
      let foundMagnetic = false;
      let closestDist = Infinity;
      let strongestPull = 0;
      let targetCenter = { x: 0, y: 0 };
      let closestEl: HTMLElement | null = null;

      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        // Proximity radius scales with pill size (captures mouse approaching the button)
        const proximityRadius = Math.max(rect.width * 0.65, 95);

        if (dist < proximityRadius && dist < closestDist) {
          closestDist = dist;
          foundMagnetic = true;
          // Smooth progressive pull: quadratic curve for organic gravitational suction
          const normalized = Math.max(0, 1 - dist / proximityRadius);
          strongestPull = Math.pow(normalized, 1.35);
          targetCenter = { x: cx, y: cy };
          closestEl = el;

          // Subtle physical micro-translation on the pill itself towards mouse
          const pullPill = 0.16 * strongestPull;
          el.style.transform = `translate3d(${(e.clientX - cx) * pullPill}px, ${(e.clientY - cy) * pullPill}px, 0)`;
          el.style.transition = 'transform 0.08s ease-out';
        } else {
          // Reset elements that lost proximity
          if (el !== closestEl) {
            el.style.transform = 'translate3d(0px, 0px, 0px)';
            el.style.transition = 'transform 0.35s ease-out';
          }
        }
      });

      if (foundMagnetic && closestEl) {
        magneticState.current = {
          active: true,
          center: targetCenter,
          strength: strongestPull,
          activeElement: closestEl,
        };
        setIsMagneticActive(true);
      } else {
        if (magneticState.current.activeElement) {
          magneticState.current.activeElement.style.transform = 'translate3d(0px, 0px, 0px)';
          magneticState.current.activeElement.style.transition = 'transform 0.35s ease-out';
        }
        magneticState.current = {
          active: false,
          center: { x: 0, y: 0 },
          strength: 0,
          activeElement: null,
        };
        setIsMagneticActive(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHoveringInteractive(false);
      setIsMagneticActive(false);
      if (magneticState.current.activeElement) {
        magneticState.current.activeElement.style.transform = 'translate3d(0px, 0px, 0px)';
        magneticState.current.activeElement.style.transition = 'transform 0.35s ease-out';
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth animation loop for magnetic interpolation
    const render = () => {
      const { active, center, strength } = magneticState.current;

      // Calculate target destination for outer ring with magnetic displacement
      let targetRingX = mousePos.current.x;
      let targetRingY = mousePos.current.y;
      let targetDotX = mousePos.current.x;
      let targetDotY = mousePos.current.y;

      if (active && strength > 0) {
        // Outer ring has strong magnetic attraction towards pill center
        const ringPull = 0.65 * strength;
        targetRingX += (center.x - mousePos.current.x) * ringPull;
        targetRingY += (center.y - mousePos.current.y) * ringPull;

        // Inner dot experiences subtle magnetic tug
        const dotPull = 0.32 * strength;
        targetDotX += (center.x - mousePos.current.x) * dotPull;
        targetDotY += (center.y - mousePos.current.y) * dotPull;
      }

      // Interpolate outer ring position (smooth lerp)
      const ringEase = active ? 0.24 : 0.18;
      ringPos.current.x += (targetRingX - ringPos.current.x) * ringEase;
      ringPos.current.y += (targetRingY - ringPos.current.y) * ringEase;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.88 : active ? 1.08 : 1
        })`;
      }

      // Interpolate dot position (fluid response to magnetic pull)
      const dotEase = active ? 0.45 : 0.9;
      dotPos.current.x += (targetDotX - dotPos.current.x) * dotEase;
      dotPos.current.y += (targetDotY - dotPos.current.y) * dotEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${
          isHoveringInteractive || active ? 0.6 : isClicking ? 1.4 : 1
        })`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);

  const isEnlarged = isHoveringInteractive || isMagneticActive;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer stylized ring follower with magnetic scale and glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full transition-all duration-200 ease-out will-change-transform"
        style={{
          width: isEnlarged ? '56px' : '32px',
          height: isEnlarged ? '56px' : '32px',
          border: isMagneticActive
            ? '1.5px solid rgba(255, 255, 255, 1)'
            : isHoveringInteractive
            ? '1.5px solid rgba(255, 255, 255, 0.9)'
            : '1px solid rgba(255, 255, 255, 0.45)',
          backgroundColor: isMagneticActive
            ? 'rgba(255, 255, 255, 0.16)'
            : isHoveringInteractive
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: isEnlarged ? 'blur(1px)' : 'none',
          boxShadow: isMagneticActive
            ? '0 0 20px rgba(255, 255, 255, 0.25)'
            : 'none',
          opacity: isEnlarged ? 1 : 0.75,
        }}
      />

      {/* Inner precise focus dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-white transition-[opacity,transform] duration-150 ease-out will-change-transform"
        style={{
          width: '5px',
          height: '5px',
          opacity: isEnlarged ? 0.35 : 0.95,
        }}
      />
    </div>
  );
};
