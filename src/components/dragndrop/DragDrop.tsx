import * as THREE from "three";
import { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useGLTF} from "@react-three/drei";
import { useFrame, useThree} from "@react-three/fiber";

export default function DragDrop() {
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
    const ref = useRef<THREE.Mesh>(null!);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    useFrame(() => {
        // ref.current.rotation.z += 0.01
        ref.current.rotation.y += 0.01 
    });
    const bind = useDrag(({active,  offset: [x, y] }) => {
      const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    });

    return (
      <>
        <mesh position={position} scale={1} {...bind()} ref={ref}>
          
         <spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2}  castShadow />
        <primitive object={gltf.scene}/>
            <meshLambertMaterial attach="material"/>

        </mesh>
      </>
    )
}
