import { useRef, useState, useEffect } from "react";
import { clamp, mapRange } from "../Util";

// Hook to track element visibility in viewport

function useViewportPercentage<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const onScroll = () => {
      const rect = elementRef.current!.getBoundingClientRect();
      const percent = mapRange(
        rect.top,
        window.innerHeight,
        -elementRef.current!.clientHeight,
        0,
        1
      );
      setPercentage(clamp(percent, 0, 1));
    };

    if (isVisible) {
      document.addEventListener("scroll", onScroll);
    }
    onScroll();
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        root: null, // Use the viewport as the root
        rootMargin: "0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { ref: elementRef, percentage };
}

export default useViewportPercentage;
