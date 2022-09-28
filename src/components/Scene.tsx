import Pikachu from "./pikachu";

const Scene = () => {
  return (
    <>
      <a-sky src="#sky"></a-sky>
      <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity>

      <a-box></a-box>

      <a-camera class="camera" rotation-test></a-camera>
      
      <Pikachu />      
    </>
  );
};

export default Scene;
