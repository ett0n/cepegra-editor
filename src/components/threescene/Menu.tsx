const Menu = ({ setSelectedObj }: { setSelectedObj: any }) => {

  // useEffect(() => {
  //   const connasse = document.getElementById("connard");
  //   connasse?.addEventListener("dragenter", () => {
  //     console.log("pupute");
  //   }),
  //     [];
  // });

  // Lors du clique sur un item du menu
  const HandleClick = (event: any) => {
    setSelectedObj(event.target.dataset.name);
    console.log(event.target.dataset.name)
  };

  return (
    <>
      <div className="menu">
        <ul className="menu-list">
          <li
            onClick={HandleClick}
            data-name="lumberjack"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={HandleClick}
            data-name="bonnet"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={HandleClick}
            data-name="manteau"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={HandleClick}
            data-name="gants"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={HandleClick}
            data-name="pantalon"
            className="menu-item"
            draggable
          ></li>
          <li
            onClick={HandleClick}
            data-name="chaussettes"
            className="menu-item"
            draggable
          ></li>
        </ul>
      </div>
      <button>back</button>
    </>
  );
}

export default Menu
