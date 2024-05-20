import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { clamp, mapRange, smoothstep } from "../Util";
import useScrollPercent from "../hooks/UseScrollPercents";
import useViewportPercentage from "../hooks/UseViewportPercentage";

function Tokyo1() {
  const [scrollPercent, containerRef, uiScreenRef] = useScrollPercent();

  const dogRef = useRef<HTMLImageElement>(null);
  let currentPercent;
  if (scrollPercent < 0.5) {
    currentPercent = mapRange(scrollPercent, 0.4, 0.5, 0, 1);
  } else {
    currentPercent = mapRange(scrollPercent, 0.7, 0.8, 1, 0);
  }
  currentPercent = smoothstep(clamp(currentPercent, 0, 1));
  currentPercent = mapRange(currentPercent, 0, 1, -120, 0);

  useEffect(() => {
    if (dogRef.current) {
      const dog = dogRef.current;
      dog.style.transform = `translateX(${currentPercent}%)`;
    }
  });
  return (
    <StyledTokyo1Wrapper ref={containerRef}>
      <div id="fixedContainerWrapper">
        <div ref={uiScreenRef} id="fixedContainer">
          <img
            id="anineko"
            src="/media/gifs/anineko.gif"
            alt=""
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              right: "0px",
              bottom: "-8px",
            }}
          />
          <img
            src="/media/gifs/AnnannPant.gif"
            alt=""
            ref={dogRef}
            style={{
              width: "100px",
              height: "115px",
              position: "absolute",
              left: "8px",
              top: "8px",
            }}
          />
        </div>
      </div>

      <img src="/media/Tokyo-1/IMG_0999.jpeg" alt="" />
      <img src="/media/Tokyo-1/IMG_1001.jpeg" alt="" />
      <img src="/media/Tokyo-1/IMG_1002.jpeg" alt="" />
      <SuzumeTrain />
      <img src="/media/Tokyo-1/IMG_1003.jpeg" alt="" />
      <img src="/media/Tokyo-1/IMG_1004.jpeg" alt="" />
      <img src="/media/Tokyo-1/IMG_1010.jpeg" alt="" />
    </StyledTokyo1Wrapper>
  );
}

const StyledTokyo1Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
  justify-content: center;
  width: 100%;
  img,
  video {
    max-width: 100%;
    width: 512px;
    height: auto;
    margin: 5px;
  }
  #fixedContainerWrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    /* display: block; */
    left: 0;
    top: 0;
  }
  #fixedContainer {
    position: sticky;
    display: flex;
    top: 0px;
    width: 100%;
    height: 100svh;
    box-sizing: border-box;
    /* border: 3px dashed black; */
  }
`;

function SuzumeTrain() {
  const { ref, percentage } = useViewportPercentage<HTMLVideoElement>();
  const [isLoaded, setIsLoaded] = useState(false);
  const updateVideoTime = () => {
    //todo, this doesn't work corrently because if images above are not loaded/load after the video, it it gives an incorrect value
    const video = ref.current!;
    const trainScrollPercent = clamp(
      mapRange(percentage, 0.3, 0.8, 0, 1),
      0,
      1
    );
    video.currentTime = mapRange(trainScrollPercent, 0, 1, 0, video.duration);
  };
  useEffect(() => {
    const video = ref.current!;
    const handleLoad = () => {
      setIsLoaded(true);
      updateVideoTime();
    };
    video.addEventListener("loadeddata", handleLoad);

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoad);
      }
    };
  }, []);

  if (isLoaded) {
    updateVideoTime();
  }

  return (
    <StyledSuzumeTrain ref={ref}>
      <source src="/media/Tokyo-1/suzumeTrain.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </StyledSuzumeTrain>
  );
}

const StyledSuzumeTrain = styled.video`
  width: 100%;
  /* width: 640px; */
  /* max-width: 640px; */
  height: auto;
`;

export default Tokyo1;
