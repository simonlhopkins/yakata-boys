import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const kFrameRate = 6;
function MichaelCheers() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isCheersing, setIsCheersing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const promises = [0, 1, 2]
      .map((num) => `/media/michaelCheers/crack_${num}.JPG`)
      .map((url) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            resolve();
          };
        });
      });
    Promise.all(promises).then(() => {
      setIsLoading(false);
    });
  }, []);
  const animateCheers = (frames: number[]) =>
    new Promise<void>((resolve) => {
      const setImg = (url: string) => {
        imgRef.current!.src = url;
      };
      const anim = frames;

      anim.forEach((item, i) => {
        setTimeout(
          () => setImg(`/media/michaelCheers/crack_${item}.JPG`),
          (i / kFrameRate) * 1000
        );
      });

      setTimeout(() => resolve(), (anim.length / kFrameRate) * 1000);
    });
  return (
    <StyledMichaelCheers>
      <StyledOverlay className={`${isCheersing ? "hidden" : ""}`}>
        {!isCheersing && (
          <button
            disabled={isCheersing || isLoading}
            onClick={async () => {
              setIsCheersing(true);
              await animateCheers([0, 1, 2, 2, 2, 1, 0]);
              setIsCheersing(false);
            }}
          >
            {isLoading ? "loading" : "乾杯"}
          </button>
        )}
      </StyledOverlay>
      <img ref={imgRef} src="/media/michaelCheers/idle.JPG" />
    </StyledMichaelCheers>
  );
}

const StyledOverlay = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  .formParent {
    background-color: white;
  }

  button {
    font-size: 2rem;
  }
`;
const StyledMichaelCheers = styled.div`
  position: relative;
  max-width: 500px;
  margin: auto;
  img {
    width: 100%;
  }
`;

export default MichaelCheers;
