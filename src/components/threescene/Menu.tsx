import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AccessoriesStr } from "../../types/Character";
import axios from "axios";

const Menu = ({ setSelectedObj, getAccessories, setAccessories }: { setSelectedObj: any; getAccessories: AccessoriesStr; setAccessories: Dispatch<SetStateAction<AccessoriesStr>> }) => {
  // Lors du clique sur un item du menu

  useEffect(() => {
    fetchApi();
  }, []);

  const [getListAccessories, setListAccessories] = useState<any>([{ id: 4, cat_name: "prout", Accessory: [] }]);

  const fetchApi = async () => {
    try {
      const result = await axios.get(import.meta.env.VITE_API + "accessories?populate=deep");
      console.log("lesobjetsdanslpai");
      const accessoriesResult = result.data.data[0].attributes.Category;
      CustomListAccessories(accessoriesResult);
      console.log(getListAccessories);
    } catch (error) {
      console.log(error);
    }
  };

  const CustomListAccessories = (accessories: any[]) => {
    const arrTemp: any = [];
    console.log(accessories);

    let handPassed = false;

    accessories.forEach((element) => {
      let objTemp = {};
      let anchor: string = "";

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
    console.log(arrTemp);
    setListAccessories(arrTemp);
  };

  // const HandleClick = (event: any) => {
  //   setSelectedObj(event.target.dataset.name);
  //   console.log(event.target.dataset.name, event.target.dataset.category);
  //   leSetterComplexe(event.target.dataset.name, event.target.dataset.category);
  // };

  const leSetterComplexe = (name: string | null, category: string) => {
    console.log("letest", category);
    const x = { ...getAccessories };
    // console.log(x);

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

  const [getActiveCat, setActiveCat] = useState<string>("");

  const OpenSubMenu = (id: number, cat: string) => {
    setActiveCat(cat);
    setSubMenu(getListAccessories[id - 1].accessories);
  };

  const GoBack = () => {
    setSubMenu([]);
  };

  const [getSubMenu, setSubMenu] = useState<{ id: number; uid_name: string }[]>([]);

  const PrintMenu = () => {
    console.log(getSubMenu);
    if (getSubMenu.length === 0)
      return getListAccessories.map(({ id, anchor, accessories }: { id: number; anchor: string; accessories: {} }) => (
        <li key={id} onClick={() => OpenSubMenu(id, anchor)} data-key={id} data-name="sphere-1" data-category={anchor} className="menu-item" draggable>
          {anchor}
        </li>
      ));
    else
      return (
        <>
          {getSubMenu.map(({ id, uid_name }: { id: number; uid_name: string }) => (
            <li key={id} onClick={() => leSetterComplexe(uid_name, getActiveCat)} data-key={id} data-name={uid_name} data-category="hat" className="menu-item" draggable>
              {uid_name}
            </li>
          ))}
          <li className="menu-item" onClick={() => leSetterComplexe(null, getActiveCat)}>
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
      <button onClick={GoBack}>back</button>
    </>
  );
};

export default Menu;
