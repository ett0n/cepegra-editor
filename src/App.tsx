/* eslint-disable */
import { Canvas, useLoader } from "@react-three/fiber";
import { Scene } from "./components/threescene/Scene";
import { Suspense, useState } from "react";
import Menu from "./components/threescene/Menu";

const App = () => {
  // fonctionnalité à venir
  const [getSelectedObj, setSelectedObj] = useState<String[]>([])
  return (
    <div id="canvas-container">
      <Suspense fallback={null}>
        <Menu setSelectedObj={setSelectedObj} />
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App
