import { useState, useRef, useEffect, useCallback } from 'react';

type UseHoverResult = {
  hovered: boolean;
  ref: React.MutableRefObject<HTMLElement | null>;
};

export function useHover<T extends HTMLElement>(): UseHoverResult {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave]);

  return { hovered, ref };
}
