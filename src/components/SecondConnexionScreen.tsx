// ------------- I M P O R T ------------- 
/* --- import dependencies --- */
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import QrReader from "./QrReader";
import Axios from "axios";

/* --- import component --- */
import StartScreen from "./StartScreen";
import FooterComponent from "./FooterComponent";
import LogoComponent from "./FooterComponent";

/* --- import type --- */
import type { UserSignIn } from "../types/UserSignin";

interface ApiUser {
  id?: number,
  exist?: boolean
}

/* -------------------- C O M P O S A N T -------------------- */
const SecondConnexionScreen = () => {
  /* ---------- S T A T E ---------- */
  const [getUserInput, setUserInput] = useState<UserSignIn>(
    {
    pseudo: "",
    password: ""
    }
  )
  const [getApiUser, setApiUser] = useState<ApiUser>();

  /* ---------- R E A C T I O N ---------- */
  /* ---------- fetch ---------- */
  const GetUserValue = async () => {
    const checkUser = await Axios.get(`https://api.xrlab.cepegra.be/api/appusers?filters[pseudo][$eqi]=${getUserInput.pseudo}`);
    //console.log(checkUser)
    if (checkUser.data.meta.pagination.total !== 0) {
      alert("pseudo correct")
      setApiUser({...getApiUser, id: checkUser.data.data[0].id, exist: true})
      
    } else {
      alert("ce pseudo n'existe pas")
      setApiUser({...getApiUser, exist: false})
    }
};
  /* - - -  au submit - - - */
  const HandleSubmit = (ev:React.FormEvent) => {
    
    ev.preventDefault();
    //console.log(getUserInput.pseudo)
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

  //A ajouter dans class name de input pseudo si résolu: ${(getUserInput.pseudo === "" || getApiUser?.exist === false) ? "input-error" : "input-success"}

  /* ---------- R E N D E R ---------- */
  return (
    <>
      <div className="m-6 flex flex-col justify-center items-center">
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
              <input  type="text" placeholder="Pseudo" className={` input input-bordered w-full max-w-xs `} required onChange={HandlePseudoChange}/>
              <p className={`${(getApiUser?.exist === false) ? "" : "opacity-0"} errPseudo text-xs mt-1 text-red-400`}>Ce pseudo n'existe pas</p>
            </div>
            <div className="grid">
              <label htmlFor="">Mot de passe</label>
              <input  type="password" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs "  onChange={HandlePasswordChange}/>
              <p className="opacity-0 errPass text-xs mt-1 text-red-400">Mot de passe incorrect</p>
            </div>
            {/* --------- Button --------- */}
            <button className="btn col-span-2 mx-40">Créer nouveau perso</button>
          </form>
          {/* --------- Pas encore inscrit ? --------- */}
          <p className="col-span-2">Pas encore inscrit ? <Link className="underline underline-offset-auto" to="/StartScreen">C'est par ici !</Link></p>
        </div>
      </div>
      {/* --------- Footer --------- */}
      <FooterComponent/>
    </>
  )
}

export default SecondConnexionScreen