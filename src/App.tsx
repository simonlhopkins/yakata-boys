import styled from "styled-components";
import "./App.css";
import SoBeaitiful from "./components/SoBeautiful";
import { useEffect, useRef } from "react";
import SongManager from "./SongManager";
import MichaelCheers from "./components/High/MichaelCheers";
import Tokyo1 from "./components/Tokyo-1";

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
      {/* <SoBeaitiful /> */}
      <MichaelCheers />
      <Tokyo1 />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  max-width: 100%;
  height: 100%;
  background-size: contain;
  /* overflow: hidden; */
  margin-bottom: 100px;
`;

export default App;
