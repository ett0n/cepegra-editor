/* eslint-disable */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { AccessoriesStr } from "../types/Character";

import { Scene } from "../components/threescene/Scene";
import { Menu } from "../components/threescene/Menu";
import axios from "axios";

const Editor = ({ getUserId }: { getUserId: number | undefined }) => {
  console.log(import.meta.env.VITE_API);

  const [getSelectedObj, setSelectedObj] = useState<String[]>([]);

  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: null,
    head: null,
    body: null,
    hand_l: null,
    hand_r: null,
    feet: null,
  });
  const AxiosPostToApi = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API}characters?populate=deep`, {
        data: {
          appuser: {
            id: getUserId,
          },
          accessories: {
            hat: {
              name: getAccessories.hat,
              color: null,
            },
            head: {
              name: getAccessories.head,
              color: null,
            },
            body: {
              name: getAccessories.body,
              color: null,
            },
            hand_l: {
              name: getAccessories.hand_l,
              color: null,
            },
            hand_r: {
              name: getAccessories.hand_r,
              color: null,
            },
            feet: {
              name: getAccessories.feet,
              color: null,
            },
            background: {
              name: "sky-2",
              color: null,
            },
          },
        },
      });

      console.log("le facteur a livré le colis");
    } catch (error) {
      console.log(error);
    }
  };
  const PostToApi = () => {
    console.log("legrostest", getUserId);
    AxiosPostToApi();
  };
  return (
    <div id="canvas-container">
      <Suspense fallback={null}>
        <Menu setSelectedObj={setSelectedObj} getAccessories={getAccessories} setAccessories={setAccessories} PostToApi={PostToApi} />
        <Canvas>
          <Scene getAccessories={getAccessories} setAccessories={setAccessories} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export { Editor };
