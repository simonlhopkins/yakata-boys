import styled from "styled-components";
import "./App.css";
import SoBeaitiful from "./components/SoBeautiful";
import { useEffect, useRef } from "react";
import SongManager from "./SongManager";
import MichaelCheers from "./components/High/MichaelCheers";

function App() {
  const songManager = useRef(new SongManager());

  useEffect(() => {
    const initSongManager = async () => {
      // await songManager.current.init();
      console.log("success");
    };
    document.addEventListener("click", initSongManager);

    return () => {
      document.removeEventListener("click", initSongManager);
    };
  }, []);
  return (
    <StyledApp>
      <img src="/gundam.gif" alt="gundam" />
      {/* <SoBeaitiful /> */}
      <MichaelCheers />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  img {
    border: 3px solid orange;
  }
  width: 100%;
  height: 100%;
  background-image: url("media/Nakasendo/landscape_1.jpg");
  background-size: contain;
  overflow: hidden;
`;

export default App;
