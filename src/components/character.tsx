import { useState } from "react";
import "aframe";
// /Users/stagiaire/Desktop/physic/cepegra-editor/public/assets

function Perso() {
  return (
    <div className="App">
    <a-scene>
        <a-assets>
          <img id="sky" src="../public"></img>
          <a-sound id="sound"  src="./src/assets/sound/pikachu.mp3"  preload="auto"></a-sound>
          <a-sound id="sound2"  src="./src/assets/sound/arene_theme.mp3"  autoplay="true" preload="auto"></a-sound>
          {/* <a-asset-item id="pika" src="../public/assets/images/pikachu2.glb"></a-asset-item> */}
          <a-asset-item id="dig" src="./src/assets/images/diglett_pokemon.glb"></a-asset-item>

          <a-asset-item id="ville" src="/assets/arene/scene.gltf"></a-asset-item>
          </a-assets>

        <a-sky src="#sky"></a-sky>
        <a-entity sound="src: #sound"></a-entity>
        <a-entity sound="src: #sound2"></a-entity>

        <a-entity class="dig" gltf-model="./src/assets/images/diglett_pokemon.glb" position="0 0.24989 -5.78067" animation-mixer="clip:Sphere|Jump; 
        repetitions:Infinity" scale="1 1 1">
        </a-entity>

      <a-camera class="camera" rotation-test>
        {/* <a-entity id ="pika" gltf-model="#pika" animation-mixer="clip:Idle; 
          repetitions:Infinity" position="0 -1.56886 -2.1">
        </a-entity> */}

      </a-camera>
    </a-scene>
    </div>
  );
}

export default Perso;
