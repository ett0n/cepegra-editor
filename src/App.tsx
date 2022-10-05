import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { useGLTF, OrbitControls} from "@react-three/drei";
import { sRGBEncoding, Texture, TextureLoader } from "three";

const sol = "/assets/images/grass.png"

function Taupiqueur() {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, sol);
  const day = useLoader(TextureLoader,'/assets/images/sky.png');
  const night = useLoader(TextureLoader,'/assets/images/sky_2.png');
  //const textureElevation = useLoader(TextureLoader,'/assets/images/grass_N.png'); Elevation if we have time
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
    useFrame((state, delta) => (ref.current.rotation.y += 0.0015));


    // test //

    
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(50, 50);
      texture.anisotropy = 16;
      
       



    // fin test //



  return (
    <>
    {/* sans le ref la rotation ne fonctionne pas */}
    <mesh  ref={ref} scale={100} position={[0, 0, 0]} onClick={() => click(!clicked)}>
      <meshStandardMaterial map={clicked ? day : night} side={THREE.DoubleSide}/>
      <sphereGeometry/>
    </mesh>
    <mesh scale={clicked ? 1.5 : 1} >
        <primitive position= {[0, 1, 0]} object= {gltf.scene} />
    </mesh>

    {/* <primitive  position= {[3, 1, 0]} object= {gltf.scene.clone()} /> */}

    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} rotation={[-Math.PI / 2, 0, 0]} >
        <meshStandardMaterial roughness={5}
        map={texture} 
        //color={"green"}
        color={clicked ? "limegreen" : "green"}
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
      <Canvas camera={{ fov: 50, position: [5, 5, 5] }}>
      
      <OrbitControls target={[1, 1, 0]} maxPolarAngle={1.45} />
        <ambientLight position={[0, 5, 6]} intensity={2}/>
        <Taupiqueur></Taupiqueur>
      </Canvas>
    </div>
  );
}