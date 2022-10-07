// ------------- I M P O R T ------------- 
import { useState } from "react";
import "aframe";
import StartScreen from "./components/StartScreen";
import LastScreenQR from "./components/LastScreenQR";
import LastScreenViewer from "./components/LastScreenViewer";
import LoadingScreen from "./components/LoadingScreen";


const App: React.FC = () => {
  // ------------- S T A T E ------------- 

  // ------------- R E A C T I O N ------------- 

  // ------------- R E N D U ------------- 
  return (
    <div className="App">
      {/* <a-scene>
        <a-box src="https://i.imgur.com/mYmmbrp.jpg" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
        <a-sky color="#222" src="/assets/sky2.png"></a-sky>
      </a-scene> */}
      <StartScreen  />
      {/* <LastScreenQR/> */}
      {/* <LastScreenViewer/> */}
      {/* <LoadingScreen/> */}

    </div>
  );
}

export default App;
