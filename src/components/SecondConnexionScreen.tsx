import FooterComponent from "./FooterComponent";
import LogoComponent from "./FooterComponent";
import QrReader from "./QrReader";
import {useState, useEffect} from "react";
import Axios from "axios";
import type { UserSignIn } from "../types/UserSignin";

const SecondConnexionScreen = () => {
  /* ---------- S T A T E ---------- */
  const [getUserInput, setUserInput] = useState<UserSignIn>(
    {
    pseudo: "",
    password: ""
    }
  )
  const [getApiUserId, setApiUserId] = useState<number>();

  /* ---------- R E A C T I O N ---------- */
  const GetUserValue = async () => {
    const checkUser = await Axios.get(`http://xrlab.cepegra.be:1337/api/appusers?filters[pseudo][$eqi]=${getUserInput.pseudo}`);
    //console.log(checkUser)

    /* ------------- T E M P O R A R Y   A P I ------------- */
    // const tableUserFull = {
    //     "data": [
    //         {
    //           "id": 1,
    //           "attributes": {
    //             "pseudo": "User1",
    //             "disabled": false,
    //             "createdAt": "2022-10-05T07:52:22.461Z",
    //             "updatedAt": "2022-10-05T07:57:01.507Z",
    //             "publishedAt": "2022-10-05T07:56:05.243Z"
    //           }
    //         }
    //       ],
    //       "meta": {
    //         "pagination": {
    //           "page": 1,
    //           "pageSize": 25,
    //           "pageCount": 1,
    //           "total": 1
    //         }
    //       }
    // }

    // const tableUserEmpty = {
    //     "data": [],
  //     "meta": {
//         "pagination": {
//             "page": 1,
//             "pageSize": 25,
//             "pageCount": 0,
//             "total": 0
//         }
  //     }
    // }

    console.log(checkUser)
    if (checkUser.data.meta.pagination.total !== 0) {
      alert("pseudo correct")
      setApiUserId(checkUser.data.data[0].id)
      
    } else {
      alert("ce pseudo n'existe pas")
    }
};
  /* - - -  au submit - - - */
  const HandleSubmit = (ev:React.FormEvent) => {
    
    ev.preventDefault();
    console.log(getUserInput.pseudo)
    if(getUserInput.pseudo !== "" && getUserInput.password !== "") {
      console.log("champs remplis")
      GetUserValue()

    } else {
      console.log("champs non remplis")
    }
  }
  
  /* - - -  input change - - - */
  const HandlePseudoChange = (ev:React.FormEvent) => {
    //console.log(ev);
    const target = ev.target as HTMLInputElement; //typescrifix: value does not
    setUserInput({ ...getUserInput, pseudo: target.value });
  };

  const HandlePasswordChange = (ev:React.FormEvent) => {
    //setSideSelect(ev.target.value);
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, password: target.value });
  };
  /* ---------- R E N D E R ---------- */
  return (
    <>
      <div className="m-10 flex flex-col justify-center items-center">
        <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
        <div className=" grid grid-cols-1 m-6 gap-6 justify-center shadow-lg p-12 rounded-lg">
          {/* --------- QR Scan --------- */}
          <div className="col-span-2 grid justify-center">
            <h2>Scannes ton code QR</h2>
            {/* <QrReader /> */}
          </div>
          {/* --------- Formulaire --------- */}
          <form className="grid grid-cols-2 justify-center col-span-2 m-6 gap-6" onSubmit={HandleSubmit}>
            <div className="grid">
              <label htmlFor="">Pseudo</label>
              <input  type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs " required onChange={HandlePseudoChange}/>
            </div>
            <div className="grid">
              <label htmlFor="">Mot de passe</label>
              <input  type="text" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs "  onChange={HandlePasswordChange}/>
            </div>
            {/* --------- Button --------- */}
            <button className="btn col-span-2 mx-40">Créer nouveau perso</button>
          </form>
          {/* --------- Pas encore inscrit ? --------- */}
          <p className="col-span-2">Pas encore inscrit ? <a className="underline underline-offset-auto" href="#">C'est par ici !</a></p>
        </div>
      </div>
      {/* --------- Footer --------- */}
      <FooterComponent/>
    </>
  )
}

export default SecondConnexionScreen