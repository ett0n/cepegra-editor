import { useEffect, useState } from "react";
import "aframe";
import Pikachu from "./components/pikachu";
import Assets from "./components/Assets";

function App() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="App">
        <a-scene>
          <a-assets>
            <Assets />
          </a-assets>

          

          <a-sky src="#sky"></a-sky>
          <a-entity sound="src: #sound"></a-entity>
          <a-entity sound="src: #sound2"></a-entity>

          <a-entity
            class="dig"
            gltf-model="assets/images/diglett_pokemon.glb"
            position="0 0.24989 -5.78067"
            animation-mixer="clip:Sphere|Jump; 
          repetitions:Infinity"
            scale="1 1 1"
            suis
          ></a-entity>

          <a-camera class="camera" rotation-test>
            {mounted ? <Pikachu /> : ""}
          </a-camera>
        </a-scene>
      </div>
    </>
  );
}

export default App;
