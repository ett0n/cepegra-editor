import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function menu({ setObj }) {
  useEffect(() => {
    const connasse = document.getElementById("connard");
    connasse?.addEventListener("dragenter", () => {
      console.log("pupute");
    }),
      [];
  });

  const handleClick = (event) => {
    console.log(event.target.dataset.name);
    setObj(event.target.dataset.name);
  };

  return (
    <>
      <div className="menu">
        <ul className="menu-list">
          <li
            onClick={(event) => handleClick(event)}
            data-name="chapeau-1"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={(event) => handleClick(event)}
            data-name="bottes-3"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={(event) => handleClick(event)}
            data-name="gants-5"
            className="menu-item"
            draggable
          ></li>
          <li className="menu-item" draggable></li>
          <li className="menu-item" draggable></li>
          <li className="menu-item" draggable></li>
          <li className="menu-item" draggable></li>
          <li className="menu-item" draggable></li>
        </ul>
      </div>
      <button>back</button>
    </>
  );
}
