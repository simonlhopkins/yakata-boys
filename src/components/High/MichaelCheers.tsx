import { useRef, useState } from "react";
import styled from "styled-components";

const kFrameRate = 6;
function MichaelCheers() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isCheersing, setIsCheersing] = useState<boolean>(false);
  const [isKanpai, setIsKanpai] = useState<boolean>(false);
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
            disabled={isCheersing}
            onClick={async () => {
              setIsCheersing(true);
              await animateCheers([0, 1, 2, 2, 2, 1, 0]);
              setIsCheersing(false);
            }}
          >
            Cheers?
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
