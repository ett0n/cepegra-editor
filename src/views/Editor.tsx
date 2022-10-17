/* eslint-disable */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { AccessoriesStr } from "../types/Character";

import { Scene } from "../components/threescene/Scene";
import { Menu } from "../components/threescene/Menu";

const Editor = () => {
  console.log(import.meta.env.VITE_API);
  const [getSelectedObj, setSelectedObj] = useState<String[]>([]);

  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: null,
    head: null,
    body: null,
    hand_l: null,
    hand_r: null,
    feet: null,
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

export { Editor };
