import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { clamp, mapRange } from "../Util";
import useViewportPercentage from "../hooks/UseViewportPercentage";

const kFramesPerSecond = 2;

function SuzumeTrainCanvas() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, percentage } = useViewportPercentage<HTMLImageElement>();
  const [frames, setFrames] = useState<string[]>([]);
  const [maxFrames, setMaxFrames] = useState<number | null>(null);
  const modPercent = clamp(mapRange(percentage, 0.4, 0.6, 0, 1), 0, 1);
  const frameNumber = Math.floor(
    mapRange(modPercent, 0, 1, 0, frames.length - 1)
  );

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const loadedmetadata = () => {
      console.log("meta data loaded");
      const duration = video.duration;
      const totalFrames = Math.floor(kFramesPerSecond * duration);
      setMaxFrames(totalFrames);
      const context = canvas.getContext("2d");
      console.log("total frames:", totalFrames);

      const generateFrames = async () => {
        const ret = [];
        for (let i = 0; i < totalFrames; i++) {
          const time = mapRange(i, 0, totalFrames, 0.1, duration);
          video.currentTime = time;

          const frame = await new Promise<string>((resolve) => {
            console.log("adding listener");
            video.addEventListener(
              "seeked",
              function onSeeked() {
                console.log("seeked");
                context!.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frameUrl = canvas.toDataURL("image/png");
                video.removeEventListener("seeked", onSeeked);
                const img = new Image();
                img.src = frameUrl;
                img.onload = () => resolve(frameUrl);
                resolve(frameUrl);
              },
              { once: true }
            );
            console.log(`setting time to ${time}`);
          });
          ret.push(frame);
          console.log("");
          setFrames((prev) => [...prev, frame]);
        }
        return ret;
      };
      generateFrames().then((frames) => {
        // setFrames(frames);
      });
    };

    video.addEventListener("loadedmetadata", loadedmetadata);

    return () => {
      video.removeEventListener("loadedmetadata", loadedmetadata);
    };
  }, []);
  const showImg = maxFrames && maxFrames == frames.length;
  return (
    <StyledSuzumeTrainCanvas>
      <video ref={videoRef} autoPlay>
        <source src="/media/Tokyo-1/suzumeTrain.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} width={"720px"} height={"1280px"}></canvas>
      <img
        id="actualImg"
        ref={ref}
        src={showImg ? frames[frameNumber] : " "}
      ></img>
      <StyledLoadingScreen
        style={{
          display: showImg ? "none" : "auto",
        }}
      >
        <img src="/media/gifs/loading.gif"></img>
        {maxFrames != null && <h1>{`${frames.length}/${maxFrames}`}</h1>}
      </StyledLoadingScreen>
    </StyledSuzumeTrainCanvas>
  );
}
const StyledLoadingScreen = styled.div`
  background-image: url("/media/gifs/background_1.gif");
  h1 {
    color: white;
  }
`;
const StyledSuzumeTrainCanvas = styled.div`
  position: relative;

  canvas {
    display: none;
  }
  video {
    display: none;
  }
  #actualImg {
    background-color: aliceblue;
    width: 100%;
    height: 100%;
  }
`;

export default SuzumeTrainCanvas;
