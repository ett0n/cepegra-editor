import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AccessoriesStr } from "../../types/Character";
import axios from "axios";

const Menu = ({ setSelectedObj, getAccessories, setAccessories }: { setSelectedObj: any; getAccessories: AccessoriesStr; setAccessories: Dispatch<SetStateAction<AccessoriesStr>> }) => {
  /* --------- variables & states --------- */
  const [getListAccessories, setListAccessories] = useState<any>([{ id: 0, cat_name: "Loading...", Accessory: [] }]);
  const [getActiveCat, setActiveCat] = useState<string>("");
  const [getSubMenu, setSubMenu] = useState<{ id: number; uid_name: string }[]>([]);

  //CALL API
  const FetchApi = async () => {
    try {
      const result = await axios.get(import.meta.env.VITE_API + "accessories?populate=deep");
      // console.log("lesobjetsdanslpai");
      const accessoriesResult = result.data.data[0].attributes.Category;
      CustomListAccessories(accessoriesResult);
    } catch (error) {
      console.log(error);
    }
  };

  /* ------ useEffect and state refresh ------ */

  useEffect(() => {
    FetchApi();
  }, []);

  /* ------ functions ------ */

  //créer une nouvelle liste d'accessoires customisées d'après l'API avec le
  //contenu des catégories et le nom des points d'ancrages
  const CustomListAccessories = (accessories: any[]) => {
    const arrTemp: any = [];

    let handPassed = false;

    accessories.forEach((element) => {
      let objTemp = {};
      let anchor: string = "";

      // en fonction du nom de la catégorie, on choisit l'anchrage spécifique
      switch (element.cat_name) {
        case "hats":
          anchor = "hat";
          break;
        case "heads":
          anchor = "head";
          break;
        case "bodies":
          anchor = "body";
          break;
        case "hands":
          anchor = "hand";
          break;
        case "feet":
          anchor = "feet";
          break;
        case "backgrounds":
          anchor = "backgrounds";
          break;
      }

      //faire un if pour tester les mains
      if (element.cat_name === "hands") {
        let leftHand = { id: element.id, cat_name: element.cat_name, anchor: anchor + "_l", accessories: element.Accessory };
        arrTemp.push(leftHand);
        let rightHand = { id: element.id + 1, cat_name: element.cat_name, anchor: anchor + "_r", accessories: element.Accessory };
        arrTemp.push(rightHand);
        handPassed = true;
      } else {
        if (!handPassed) objTemp = { id: element.id, cat_name: element.cat_name, anchor: anchor, accessories: element.Accessory };
        else objTemp = { id: element.id + 1, cat_name: element.cat_name, anchor: anchor, accessories: element.Accessory };
        arrTemp.push(objTemp);
      }
    });
    setListAccessories(arrTemp);
  };

  //permet d'envoyer au useState une version testée pour envoyer null si
  // la valeur est null ou string d'item si la valeur est item
  const RefreshActiveAccessories = (name: string | null, category: string) => {
    const x = { ...getAccessories };
    switch (category) {
      case "hat":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/hats/${name}/${name}.glb`);
        break;
      case "head":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/heads/${name}/${name}.glb`);
        break;
      case "body":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/bodies/${name}/${name}.glb`);
        break;
      case "hand_l":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/hands/${name}/${name}.glb`);
        break;
      case "hand_r":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/hands/${name}/${name}.glb`);
        break;
      case "feet":
        name === null ? (x[category] = null) : (x[category] = `/assets/accessories/feet/${name}/${name}.glb`);
        break;
    }

    setAccessories(x);
  };

  //ouvre un submenu et set la categorie active du submenu sur celle de son menu parent
  const OpenSubMenu = (id: number, cat: string) => {
    setActiveCat(cat);
    setSubMenu(getListAccessories[id - 1].accessories);
  };

  //gere le bouton retour pour sortir du submenu
  const GoBack = () => {
    setSubMenu([]);
  };

  /* ------ composant printmenu pour gerer le conditional rendering (submenu/categoriemenu) ------ */
  const PrintMenu = () => {
    console.log(getSubMenu);
    if (getSubMenu.length === 0)
      return getListAccessories.map(({ id, anchor }: { id: number; anchor: string }) => (
        <li key={id} onClick={() => OpenSubMenu(id, anchor)} className="menu-item" draggable>
          {anchor}
        </li>
      ));
    else
      return (
        <>
          {getSubMenu.map(({ id, uid_name }: { id: number; uid_name: string }) => (
            <li key={id} onClick={() => RefreshActiveAccessories(uid_name, getActiveCat)} className="menu-item" draggable>
              {uid_name}
            </li>
          ))}
          <li className="menu-item" onClick={() => RefreshActiveAccessories(null, getActiveCat)}>
            Remove
          </li>
        </>
      );
  };
  return (
    <>
      <div className="menu">
        <ul className="menu-list">
          <PrintMenu />
        </ul>
      </div>
      {getSubMenu.length > 0 ? (
        <button className="btn btn-menu" onClick={GoBack}>
          back
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export { Menu };
