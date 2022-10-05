import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { useGLTF, OrbitControls} from "@react-three/drei";
import { sRGBEncoding, Texture, TextureLoader } from "three";

function Taupiqueur() {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader,'/assets/images/grass.png');
  const sky = useLoader(TextureLoader,'/assets/images/sky_3.png');
  //const textureElevation = useLoader(TextureLoader,'/assets/images/grass_N.png'); Elevation if we have time
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
    useFrame((state, delta) => (clicked ? ref.current.rotation.y += 0.04: 0));


    // test //

    
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(50, 50);
      texture.anisotropy = 16;
      
       



    // fin test //



  return (
    <>
    {/* sans le ref la rotation ne fonctionne pas */}
    <mesh scale={100} position={[0, 0, 0]}>
      <meshStandardMaterial map={sky} side={THREE.DoubleSide}/>
      <sphereGeometry/>
    </mesh>
    <mesh ref={ref} scale={clicked ? 1.5 : 1} onClick={() => click(!clicked)}>
        <primitive position= {[0, 1, 0]} object= {gltf.scene} />
    </mesh>

    {/* <primitive  position= {[3, 1, 0]} object= {gltf.scene.clone()} /> */}

    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} rotation={[-Math.PI / 2, 0, 0]} >
        <meshStandardMaterial roughness={5}
        map={texture} 
        color={"green"}
        //color={hovered ? "limegreen" : "green"}
        >
        </meshStandardMaterial>
        <planeGeometry args={[100, 100]}/>
    </mesh>
    </>
  );
}

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
      
      <OrbitControls target={[1, 1, 0]} maxPolarAngle={1.45} />
        <ambientLight position={[0, 5, 6]} intensity={2}/>
        <Taupiqueur></Taupiqueur>
      </Canvas>
    </div>
  );
}