/* eslint-disable */
import { Canvas, useLoader } from "@react-three/fiber";
import { Scene } from "./components/threescene/Scene";
import { Suspense, useState } from "react";
import Menu from "./components/threescene/Menu";
import { AccessoriesStr } from "./types/Character";

const App = () => {
  console.log(import.meta.env.VITE_API);
  // fonctionnalité à venir
  const [getSelectedObj, setSelectedObj] = useState<String[]>([]);

  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: "/assets/accessories/hats/sphere-1/sphere-1.glb",
    head: "/assets/accessories/heads/glasses-1/glasses-1.glb",
    body: "/assets/accessories/bodies/rectangle-1/rectangle-1.glb",
    hand_l: "/assets/accessories/hands/hammer-1/hammer-1.glb",
    hand_r: "/assets/accessories/hands/hammer-1/hammer-1.glb",
    feet: "/assets/accessories/feet/sneakers-1/sneakers-1.glb",
  });

  return (
    <div id="canvas-container">
      <Suspense fallback={null}>
        <Menu setSelectedObj={setSelectedObj} getAccessories={getAccessories} setAccessories={setAccessories} />
        <Canvas>
          <Scene getAccessories={getAccessories} setAccessories={setAccessories} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
