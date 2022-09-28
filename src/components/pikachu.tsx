const Pikachu = () => {
  return (
    <>
      <a-entity
        id={"pika"}
        gltf-model="#pika"
        animation-mixer="clip:Idle; 
        repetitions:Infinity"
        position="0 -1.56886 -2.1"
      ></a-entity>
    </>
  );
};

export default Pikachu;
