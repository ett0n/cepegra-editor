/* eslint-disable */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { AccessoriesStr } from "../types/Character";

import { Scene } from "../components/threescene/Scene";
import { Menu } from "../components/threescene/Menu";
import axios from "axios";
import { Navigate } from "react-router";

const Editor = ({ getUserId }: { getUserId: number | undefined }) => {
  console.log(import.meta.env.VITE_API);

  const [getToLastScreen, setToLastScreen] = useState<boolean>(false);
  const [getSelectedObj, setSelectedObj] = useState<String[]>([]);

  const [getAccessoriesShort, setAccessoriesShort] = useState<AccessoriesStr>({
    hat: null,
    head: null,
    body: null,
    hand_l: null,
    hand_r: null,
    feet: null,
  });

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
              name: getAccessoriesShort.hat,
              color: null,
            },
            head: {
              name: getAccessoriesShort.head,
              color: null,
            },
            body: {
              name: getAccessoriesShort.body,
              color: null,
            },
            hand_l: {
              name: getAccessoriesShort.hand_l,
              color: null,
            },
            hand_r: {
              name: getAccessoriesShort.hand_r,
              color: null,
            },
            feet: {
              name: getAccessoriesShort.feet,
              color: null,
            },
            background: {
              name: "sky-2",
              color: null,
            },
          },
        },
      });
      setToLastScreen(true);
      console.log("le facteur a livré le colis");
      console.log(getAccessoriesShort);
    } catch (error) {
      console.log(error);
    }
  };
  const PostToApi = () => {
    console.log("legrostest", getUserId);
    AxiosPostToApi();
  };

  //Validation de navigate
  if (getToLastScreen === true) {
    return <Navigate to="/lastscreen" />;
  }
  return (
    <div id="canvas-container">
      <Suspense fallback={null}>
        <Menu setSelectedObj={setSelectedObj} getAccessories={getAccessories} setAccessories={setAccessories} getAccessoriesShort={getAccessoriesShort} setAccessoriesShort={setAccessoriesShort} PostToApi={PostToApi} />
        <Canvas>
          <Scene getAccessories={getAccessories} setAccessories={setAccessories} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export { Editor };
