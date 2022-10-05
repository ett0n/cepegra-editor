import * as THREE from "three";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { useGLTF, OrbitControls} from "@react-three/drei";
import { AnimationClip, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const sol = "/assets/images/grass.png"

function Taupiqueur() {
  let mixer: any = null;
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, sol);
  const day = useLoader(TextureLoader,'/assets/images/sky.png');
  const night = useLoader(TextureLoader,'/assets/sky2.png');
  
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  mixer = new THREE.AnimationMixer(gltf.scene);
  mixer.clipAction(gltf.animations[0]).play();
  useFrame((state, delta) => {
    mixer.update(delta);
  });

  const gltf2 = useGLTF("/assets/images/lumberjack.glb");
  

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
    useFrame((state, delta) => (ref.current.rotation.y += 0.007));
    // tiling de la texture
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(50, 50);
      texture.anisotropy = 16;

  return (
    <>
    <mesh  ref={ref} scale={100} position={[0, 0, 0]} onClick={() => click(!clicked)}>
      <meshStandardMaterial map={clicked ? day : night} side={THREE.DoubleSide}/>
      <sphereGeometry/>
    </mesh>
    <mesh scale={clicked ? 10 : 5} >
        <primitive position= {[0, 1, 0]} object= {clicked ? gltf2.scene: gltf.scene} />
    </mesh>

    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} rotation={[-Math.PI / 2, 0, 0]} >
        <meshStandardMaterial roughness={3} map={texture} 
        color={clicked ? "limegreen" : "darkgreen"}>
        </meshStandardMaterial>
        <circleGeometry args={[100, 100]}/>
    </mesh>
    </>
  );
}


export default function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 75, position: [5, 15, 5] }}>

      <OrbitControls target={[1, 1, 0]} maxPolarAngle={1.45} />
        <ambientLight position={[0, 5, 6]} intensity={2}/>
        <Taupiqueur></Taupiqueur>
      </Canvas>
    </div>
  );
}

// const textureElevation = useLoader(TextureLoader,'/assets/images/grass_N.png'); Elevation if we have time

// si plutard il y'a un probleme dans l'animation essayer d'implementer le suspense