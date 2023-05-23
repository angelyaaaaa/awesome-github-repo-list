import { useRef, useEffect } from 'react';

type ObserverSectionProps = {
  onRefresh: () => void;
};
const ObserverSection = ({ onRefresh }: ObserverSectionProps) => {
  const refObserver = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          onRefresh()
        }
      }
      // { 
      //   root: refObserver?.current,
      //   rootMargin: '0px',
      //   threshold: 0.5
      // }
    );

    if (refObserver?.current) {
      observer.observe(refObserver?.current);
    }

    return () => {
      if (refObserver.current) {
        observer.unobserve(refObserver?.current);
      }
    };
  }, [onRefresh]);

  return (
    <div 
      ref={refObserver}
      className="observer-section"
    />
  )
};

export default ObserverSection; 
