// ------------- I M P O R T -------------
/* --- import dependencies --- */
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

/* --- import type --- */
import type { UserSignIn } from "./types/UserSignin";

/* --- import component --- */
import StartScreen from "./views/StartScreen";
import ConnexionScreen from "./views/SecondConnexionScreen";
import LastScreenQR from "./views/LastScreenQR";
import LastScreenViewer from "./views/LastScreenViewer";
import LoadingScreen from "./views/LoadingScreen";
import { Editor } from "./views/Editor";

const App = () => {
  /* ------------- S T A T E ------------- */
  const [getUserId, setUserId] = useState<number>();

  /* ------------- R E A C T I O N ------------- */

  console.log("User id: ", getUserId);
  /* ------------- R E N D U ------------- */
  return (
    <div className="App">
      {/* - - - Routage de l'application - - - */}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="StartScreen" element={<StartScreen setUserId={setUserId} />}></Route>
            <Route path="ConnexionScreen" element={<ConnexionScreen setUserId={setUserId} />}></Route>
            <Route path="LoadingScreen" element={<LoadingScreen />}></Route>
            <Route
              path="Editor"
              element={
                <div id="canvas-container">
                  <Editor />
                </div>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ConnexionScreen /> */}
      {/* <LastScreenQR/> */}
      {/* <LastScreenViewer/> */}
      {/* <LoadingScreen/> */}
    </div>
  );
};
export default App;
