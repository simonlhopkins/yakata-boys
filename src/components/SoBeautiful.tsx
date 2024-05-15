import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const kPauseTime = 3.45;

enum State {
  Idle,
  Intro,
  Countdown,
  Result,
}

function SoBeaitiful() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [state, setState] = useState<State>(State.Idle);
  const [introTextsShowing, setIntroTextsShowing] = useState<number[]>([]);
  useEffect(() => {
    switch (state) {
      case State.Idle:
        break;
      case State.Intro:
        const intervalIds: number[] = [];
        for (let i = 0; i < 3; i++) {
          intervalIds.push(
            setTimeout(() => {
              setIntroTextsShowing((prev) => [...prev, i]);
              console.log(i + 1);
            }, i * 2000)
          );
        }

        intervalIds.push(
          setTimeout(() => {
            setState(State.Countdown);
          }, 6000)
        );
        return () => {
          intervalIds.forEach((i) => clearInterval(i));
        };

      case State.Countdown:
        videoRef.current!.play();
        break;

      case State.Result:
        break;
    }
  }, [state]);

  const inner = (function () {
    switch (state) {
      case State.Idle:
        return (
          <>
            <button
              onClick={() => {
                console.log("hello");
                setState(State.Intro);
              }}
            >
              Start
            </button>
          </>
        );

      case State.Intro:
        const introTexts = [
          "After Seeing Yakiniku for the first time",
          "Michael said one phrase",
          "What was it?",
        ];

        return (
          <>
            {introTexts.map((value, index) => (
              <h1
                key={index}
                className={`${
                  introTextsShowing.includes(index) ? "showing" : ""
                } intro`}
              >
                {value}
              </h1>
            ))}
          </>
        );
      case State.Countdown:
        return (
          <>
            <h1>countdown</h1>
          </>
        );
      case State.Result:
        return (
          <>
            <h1>After Seeing Yakiniku for the first time</h1>
            <h1>Michael said one phrase</h1>
            <h1>What was it?</h1>
          </>
        );
      default:
        return (
          <>
            <h1>default</h1>
          </>
        );
    }
  })();

  return (
    <SoBeautifulWrapper>
      <StyledOverlayWrapper>{inner}</StyledOverlayWrapper>
      <video ref={videoRef}>
        <source src="/media/Tokyo-1/soBeautiful.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={() => {
          setState(State.Countdown);
        }}
      >
        countdown
      </button>
    </SoBeautifulWrapper>
  );
}

const StyledOverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  flex-direction: column;
  * {
    pointer-events: auto;
    z-index: 1;
  }
  .intro {
    font-size: 2rem;
    opacity: 0;
    transition: all 1s;
    &.showing {
      opacity: 1;
    }
  }
`;
const SoBeautifulWrapper = styled.div`
  position: relative;
  width: 200px;
  video {
    width: 100%;
    height: auto;
  }
`;

export default SoBeaitiful;
