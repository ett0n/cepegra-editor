import { useState } from "react";
import "aframe";
import SecondConnexionScreen from "./components/SecondConnexionScreen";
function App() {
  return (
    <div className="App">
      {/* Dans le startscreen, prévoir reroutage vers second connexion screen si déjà connecté */}
      <SecondConnexionScreen />

    </div>
  );
}

export default App;
