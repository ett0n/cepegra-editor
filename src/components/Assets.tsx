const Assets = () => {

  return (
    <>
      <img id="sky" src="assets/images/clouds-sky-anime.jpg"></img>
      <a-sound
        id="sound"
        src="assets/sound/pikachu.mp3"
        preload="auto"
      ></a-sound>
      <a-sound
        id="sound2"
        src="assets/sound/arene_theme.mp3"
        autoplay="true"
        preload="auto"
      ></a-sound>
      <a-asset-item id="pika" src="assets/images/pikachu2.glb"></a-asset-item>
      <a-asset-item
        id="dig"
        src="assets/images/diglett_pokemon.glb"
      ></a-asset-item>

      <a-asset-item id="ville" src="assets/arene/scene.gltf"></a-asset-item>
    </>
  );
};

export default Assets;
