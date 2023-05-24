import { useEffect, useRef, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';

type VirtualDisplayType = {
  startIndex: number;
  getEndIndex: (listLength: number) => number;
  refContainer: React.RefObject<HTMLDListElement>;
};
const useVirtualDisplay = (itemHeight: number, visibleItems: number): VirtualDisplayType => {
  const [scrollTop, setScrollTop] = useState(0);
  const refContainer = useRef<HTMLDListElement>(null);

  const handleScroll = useThrottledCallback(() => {
    if (refContainer.current) {
      setScrollTop(refContainer.current.scrollTop);
    }
  }, 100);

  useEffect(() => {
    console.log('virtual list useEffect', refContainer.current);
    if (refContainer.current) {
      refContainer.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (refContainer.current) {
        refContainer.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const startIndex = Math.floor(scrollTop / itemHeight);
  return {
    startIndex,
    getEndIndex: (listLength: number) => Math.min(startIndex + visibleItems, listLength),
    refContainer,
  }
};

export default useVirtualDisplay;