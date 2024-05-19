import { MutableRefObject, useState, useRef, useEffect } from "react";
import { clamp } from "../Util";

export default function useScrollPercent(): [
  number,
  MutableRefObject<HTMLDivElement | null>,
  MutableRefObject<HTMLDivElement | null>
] {
  const [scrollPercent, setScrollPercent] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const uiScreen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (container.current && uiScreen.current) {
        const containerHeight = container.current.offsetHeight;
        const uiScreenOffsetTop = uiScreen.current.offsetTop;
        const uiScreenHeight = uiScreen.current.offsetHeight;
        setScrollPercent(
          clamp(uiScreenOffsetTop / (containerHeight - uiScreenHeight), 0, 1)
        );
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return [scrollPercent, container, uiScreen];
}
