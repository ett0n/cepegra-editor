import * as THREE from "three";
import { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function DragDrop() {
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  const ref = useRef<THREE.Mesh>(null!);
  const [position, setPosition] = useState<number[]>([0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const bind = useDrag(({ active, offset: [x, y] }) => {
    const [, , z] = position;
    setPosition([x / 5 / aspect, -y / 5 / aspect, 1]);
  });

  return (
    <>
      {/* <mesh position={position} scale={1} {...bind()} ref={ref}>
        <primitive object={gltf.scene}/>
        </mesh> */}
    </>
  );
}
