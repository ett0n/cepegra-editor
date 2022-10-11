/* eslint-disable */
import { Canvas, useLoader } from "@react-three/fiber";
import axios from "axios";
import type { Character, CharacterAttr, Accessories, Accessory } from "./types/Character";
import type { User, UserAttr } from "./types/Appusers";
import { Scene } from "./components/threescene/Scene";
import { Suspense, useState } from "react";
import Menu from "./components/threescene/Menu";

export default function App() {
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
