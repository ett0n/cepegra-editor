/* ------------- I M P O R T ------------- */

import { Canvas } from "@react-three/fiber";
import FooterComponent from "../components/FooterComponent";
import { Hero } from "../components/threescene/Hero";
import axios from "axios";
import { AccessoriesStr, Character } from "../types/Character";
import { SetStateAction, useEffect, useState } from "react";
import { characters } from "../functions";
import { OrbitControls } from "@react-three/drei";

/* ------ useEffect and state refresh ------ */
const LastScreenViewer = ({ getUserId }: { getUserId: number | undefined }) => {
  useEffect(() => {
    FetchCharacterApi(getUserId!);
  }, []);
  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: null,
    head: null,
    body: null,
    hand_l: null,
    hand_r: null,
    feet: null,
  });

  const [getPseudo, setPseudo] = useState<string>("");
  // fetch currenct character from API
  const FetchCharacterApi = async (idUser: number) => {
    await axios
      .get(`${import.meta.env.VITE_API}appusers/${idUser}?populate[characters][populate][accessories][populate]=*`)
      //if API down
      .catch((error: string) => {
        console.log("apidown or wrong id", error);
      })
      .then((response: any) => {
        console.log("jecalllapi");
        let characterResponse = response.data.data.attributes.characters.data;
        setPseudo(response.data.data.attributes.pseudo);
        characterResponse.forEach((element: Character) => {
          characters.push(element);
        });
        let charNumber = characters.length - 1;
        //character[x].accessory_name
        let accessories = {
          hatN: characters[charNumber].attributes.accessories.hat.name,
          headN: characters[charNumber].attributes.accessories.head.name,
          bodyN: characters[charNumber].attributes.accessories.body.name,
          hand_lN: characters[charNumber].attributes.accessories.hand_l.name,
          hand_rN: characters[charNumber].attributes.accessories.hand_r.name,
          feet: characters[charNumber].attributes.accessories.feet.name,
        };
        console.log(accessories);
        //refreshing accessory state with API accessories
        setAccessories({
          hat: accessories.hatN !== null ? `/assets/accessories/hats/${accessories.hatN}/${accessories.hatN}.glb` : null,
          head: accessories.headN !== null ? `/assets/accessories/heads/${accessories.headN}/${accessories.headN}.glb` : null,
          body: accessories.bodyN !== null ? `/assets/accessories/bodies/${accessories.bodyN}/${accessories.bodyN}.glb` : null,
          hand_l: accessories.hand_lN !== null ? `/assets/accessories/hands/${accessories.hand_lN}/${accessories.hand_lN}.glb` : null,
          hand_r: accessories.hand_rN !== null ? `/assets/accessories/hands/${accessories.hand_rN}/${accessories.hand_rN}.glb` : null,
          feet: accessories.feet !== null ? `/assets/accessories/feet/${accessories.feet}/${accessories.feet}.glb` : null,
        });
        console.log(getAccessories);
      });
  };
  return (
    <>
      <div className="grid m-20 ">
        <div className="bg-slate-50 p-5 rounded-l-xl rounded-tr-lg bg-white w-max absolute top-60 left-1/4">
          <p>I'm alive !</p>
        </div>
        <Canvas>
          <ambientLight intensity={0.5} />
          <OrbitControls target={[0, 1.4, 0]} maxPolarAngle={1.45} enablePan={false} enableZoom={false} />
          <Hero getAccessories={getAccessories} setAccessories={setAccessories} />
        </Canvas>
        <div className="m-10 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p>{getPseudo}</p>
            <p className="p-10 text-2xl italic text-center">Rendez-vous dans le viewer !</p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default LastScreenViewer;
