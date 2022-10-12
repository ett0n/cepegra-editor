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
      await axios.get(import.meta.env.VITE_API + "accessories?populate=deep"));
      setListAccessories(getListAccessories.data.data[0].attributes.Category);
      console.log(getListAccessories);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleClick = (event: any) => {
    setSelectedObj(event.target.dataset.name);
    console.log(event.target.dataset.name, event.target.dataset.category);
    leSetterComplexe(event.target.dataset.name, event.target.dataset.category);
  };
  const SubMenu = () => {
    return null;
  };
  const leSetterComplexe = (name: string, category: string) => {
    const x = { ...getAccessories };
    // console.log(x);

    switch (category) {
      case "hat":
        x[category] = `/assets/accessories/hats/${name}/${name}.glb`;
        break;
      case "head":
        x[category] = `/assets/accessories/heads/${name}/${name}.glb`;
        break;
      case "body":
        x[category] = `/assets/accessories/bodies/${name}/${name}.glb`;
        break;
      case "hand_l":
        x[category] = `/assets/accessories/hands/${name}/${name}.glb`;
        break;
      case "hand_r":
        x[category] = `/assets/accessories/hands/${name}/${name}.glb`;
        break;
      case "feet":
        x[category] = `/assets/accessories/feet/${name}/${name}.glb`;
        break;
    }

    setAccessories(x);
  };

  return (
    <>
      <div className="menu">
        {/* <ul className="menu-list">
          <li onClick={OpenMenu} data-name="sphere-1" data-category="hat" className="menu-item" draggable>
            Chapo
          </li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="head" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="body" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="hand_l" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="hand_r" className="menu-item" draggable></li>
          <li onClick={HandleClick} data-name="sphere-1" data-category="feet" className="menu-item" draggable></li>
        </ul> */}
        <ul className="menu-list">
          {getListAccessories.map(({ id, cat_name, Accessory }) => (
            <li key={id} className="menu-item">
              Coffee type {cat_name}
            </li>
          ))}
        </ul>
      </div>
      <button>back</button>
    </>
  );
};

export default Menu;
