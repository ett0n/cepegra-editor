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
      setListAccessories(result.data.data[0].attributes.Category);
      console.log(getListAccessories);
    } catch (error) {
      console.log(error);
    }
  };

  // const HandleClick = (event: any) => {
  //   setSelectedObj(event.target.dataset.name);
  //   console.log(event.target.dataset.name, event.target.dataset.category);
  //   leSetterComplexe(event.target.dataset.name, event.target.dataset.category);
  // };

  const leSetterComplexe = (name: string | null, category: string) => {
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

  const OpenSubMenu = (id: number) => {
    setSubMenu(getListAccessories[id - 1].Accessory);
  };

  const GoBack = () => {
    setSubMenu([]);
  };

  const [getSubMenu, setSubMenu] = useState<{ id: number; uid_name: string }[]>([]);

  const PrintMenu = () => {
    console.log(getSubMenu);
    if (getSubMenu.length === 0)
      return getListAccessories.map(({ id, cat_name, accessories }: { id: number; cat_name: string; accessories: {} }) => (
        <li key={id} onClick={() => OpenSubMenu(id)} data-key={id} data-name="sphere-1" data-category="hat" className="menu-item" draggable>
          {cat_name}
        </li>
      ));
    else
      return (
        <>
          {getSubMenu.map(({ id, uid_name }: { id: number; uid_name: string }) => (
            <li key={id} onClick={() => leSetterComplexe(uid_name, "hat")} data-key={id} data-name={uid_name} data-category="hat" className="menu-item" draggable>
              {uid_name}
            </li>
          ))}
          <li className="menu-item" onClick={() => leSetterComplexe(null, "hat")}>
            Remove
          </li>
        </>
      );
  };

  return (
    <>
      <div className="menu">
        {/* <ul className="menu-list">
          <li onClick={HandleClick} data-name="sphere-1" data-category="hat" className="menu-item" draggable>
            Chapo
          </li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="head" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="body" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="hand_l" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="hand_r" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="feet" className="menu-item" draggable></li>
        </ul> */}
        <ul className="menu-list">
          <PrintMenu />
        </ul>
      </div>
      <button onClick={GoBack}>back</button>
    </>
  );
};

export default Menu;
