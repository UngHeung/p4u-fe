import { useState } from 'react';

const useMouseDragAndTouchScroll = (
  ref: React.RefObject<HTMLUListElement>,
  isDragging: boolean,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleStart = (event: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);

    if (!ref.current) return;

    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    setStartX(pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    if (!('touches' in event)) {
      event.preventDefault();
    }

    if (!ref.current) return;

    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    const x = pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return { isDragging, handleStart, handleMove, handleEnd };
};

export default useMouseDragAndTouchScroll;
