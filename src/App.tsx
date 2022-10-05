import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { useGLTF, OrbitControls} from "@react-three/drei";
import { TextureLoader } from "three";

function Taupiqueur() {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader,
    '/assets/images/grass.jpeg ');
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
    useFrame((state, delta) => (clicked ? ref.current.rotation.y += 0.04: 0));

  return (
    <>
    {/* sans le ref la rotation ne fonctionne pas */}
    <mesh ref={ref} scale={clicked ? 1.5 : 1} onClick={() => click(!clicked)}>
    <primitive position= {[0, 1, 0]} object= {gltf.scene} />
    </mesh>

    <primitive  position= {[3, 1, 0]} object= {gltf.scene.clone()} />

    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} rotation={[-Math.PI / 2, 0, 0]} >
        <meshStandardMaterial map={texture}
        //color={hovered ? "hotpink" : "red"}
        >
        </meshStandardMaterial>
        <planeGeometry args={[100, 100]} />
    </mesh>
    </>
  );
}

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
      <OrbitControls target={[1, 1, 0]} maxPolarAngle={1.45} />
        <ambientLight intensity={2} />
        <Taupiqueur></Taupiqueur>
      </Canvas>
    </div>
  );
}