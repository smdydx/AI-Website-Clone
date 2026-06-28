import { useState, useRef, useCallback, TouchEvent } from "react";

interface UseSwipeCardsOptions {
  totalCards: number;
  threshold?: number; // minimum swipe distance in px
}

export function useSwipeCards({ totalCards, threshold = 40 }: UseSwipeCardsOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  const isDragging = useRef(false);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    // Prevent default browser behavior (such as navigation or page horizontal scrolling)
    // if the user is swiping horizontally to ensure gesture is captured smoothly.
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    if (Math.abs(diffX) < threshold) return;

    // Swipe is only valid if horizontal movement is larger than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && activeIndex < totalCards - 1) {
        // Swipe left → next
        setActiveIndex((prev) => prev + 1);
      } else if (diffX < 0 && activeIndex > 0) {
        // Swipe right → prev
        setActiveIndex((prev) => prev - 1);
      }
    }
  }, [activeIndex, totalCards, threshold]);

  const onTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const onTouchCancel = useCallback(() => {
    isDragging.current = false;
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalCards) {
      setActiveIndex(index);
    }
  }, [totalCards]);

  return {
    activeIndex,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    goTo,
    isFirst: activeIndex === 0,
    isLast: activeIndex === totalCards - 1,
  };
}
