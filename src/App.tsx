// ------------- I M P O R T ------------- 
import { useState } from "react";
import type { UserSignIn } from "./types/UserSignin";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import StartScreen from "./components/StartScreen";
import ConnexionScreen from "./components/SecondConnexionScreen";
import LastScreenQR from "./components/LastScreenQR";
import LastScreenViewer from "./components/LastScreenViewer";
import LoadingScreen from "./components/LoadingScreen";


const App = () => {
  /* ------------- S T A T E ------------- */
  const [getUser, setUser] = useState<UserSignIn>({
    pseudo: "",
    mail: "",
    password: ""
})

  /* ------------- R E A C T I O N ------------- */ 
  //form
  // const HandleAddUser = (newUser: UserSignIn) => {
  //   setUser(newUser);
  // };

  console.log("App user from props: ", getUser)
  /* ------------- R E N D U ------------- */
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="StartScreen" element={<StartScreen setUser={setUser} />}></Route>
            <Route path="ConnexionScreen" element={<ConnexionScreen />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ConnexionScreen /> */}
      {/* <LastScreenQR/> */}
      {/* <LastScreenViewer/> */}
      {/* <LoadingScreen/> */}

    </div>
  );
}

export default App;
