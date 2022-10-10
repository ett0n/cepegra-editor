import * as THREE from "three";
import { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useGLTF} from "@react-three/drei";
import { useFrame, useThree} from "@react-three/fiber";

export default function menu() {
  

    return (
      <>
        <div className="menu">
            <ul className="menu-list">
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
                <li className="menu-item" draggable></li>
            </ul>
        </div>
        <button>back</button>
      </>
    )
}
