import { useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";

const hat = "/assets/images/lumberjack.glb"





export default function menu({setSelectedObj}:{setSelectedObj : Array<string>}) {
    const gltf = useGLTF(hat)
    
    useEffect (() =>{
        const connasse = document.getElementById("connard");
    connasse?.addEventListener("dragenter", () =>{
    console.log("pupute")
    }),[]}) 

    const handleclick = (event : Event) => {
      setSelectedObj(event.target.dataset.name)
    }

    

    return (
      <>
        <div className="menu">
            <ul className="menu-list">
                <li onClick={(event)=>handleclick(event)} data-name="lumberjack" className="menu-item" draggable></li>
                <li onClick={handleclick} data-name="bonnet" className="menu-item" draggable></li>
                <li onClick={handleclick} data-name="manteau" className="menu-item" draggable></li>
                <li onClick={handleclick} data-name="gants" className="menu-item" draggable></li>
                <li onClick={handleclick} data-name="pantalon" className="menu-item" draggable></li>
                <li onClick={handleclick} data-name="chaussettes" className="menu-item" draggable></li>
            </ul>
        </div>
        <button>back</button>
      </>
    )
}
