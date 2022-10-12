// ------------- I M P O R T ------------- 
import {useState, useEffect, Dispatch, SetStateAction} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import type { UserSignIn } from "../types/UserSignin";
import ConnexionScreen from "./SecondConnexionScreen";
import FooterComponent from "./FooterComponent";
import QrGenerator from "./QrGenerator";

/* ------------- I N T E R F A C E ------------- */
interface Msg {
  pseudo?: string;
  mail?: string;
  password?: string;
  confirm?: string;
}


const StartScreen = ({ setUser }:  {setUser: Dispatch<SetStateAction<UserSignIn>>}) => {
  /* ------------- S T A T E ------------- */
  const [getUserInput, setUserInput] = useState<UserSignIn>(
    {
      pseudo: "",
      pseudoBlur: false,
      mail: "",
      password: ""
    }
  );
  const [getApiUser, setApiUser] = useState<boolean>();
  const [getConfirmPass, setConfirmPass] = useState<string>("");
  const [getMsg, setMsg] = useState<Msg>({
    pseudo: "Pseudo obligatoire",
    mail: "Mail incorrect",
    password: "6 caractères dont une majuscule et un chiffre",
    confirm: "Confirmation incorrecte",
  })
  // useEffect(() => {
  //     GetDatas();
  // }, []);
 
  /* ------------- R E A C T I O N ------------- */
  // - - - fetch - - -
  // const GetDatas = async () => {
  //     const apiDatas = await Axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*');
  //     const TableUsers = apiDatas.data.data.map( (u: { id: any; attributes: { pseudo: any; }; })  => {return {id: u.id, pseudo : u.attributes.pseudo}})
  //     setApiUser(TableUsers);
  // };
  const GetUserValue = async () => {
    const checkUser = await Axios.get(`https://api.xrlab.cepegra.be/api/appusers?filters[pseudo][$eqi]=${getUserInput.pseudo}`);
    //console.log(checkUser)
    
      if(checkUser.data.meta.pagination.total === 0) {
        //alert("pseudo unique")
        setMsg({...getMsg, pseudo: "Pseudo obligatoire"})
        setApiUser(true)           
      } else {
        setMsg({...getMsg, pseudo: "Pseudo déjà utilisé"})
        setApiUser(false)
        setUserInput({ pseudo: "", mail: "", password: "" });
      }
  };
  /* - - -  au submit - - - */
  const HandleSubmit = (ev:React.FormEvent) => {
    ev.preventDefault();
    if(getConfirmPass === getUserInput.password && getUserInput.password!=="") {
      alert("password identique")
      //Actualiser le state user de APP
      setUser(
        {
          pseudo: getUserInput.pseudo,
          mail: getUserInput.mail,
          password: getUserInput.password
        }
      );
      document.querySelector('.inputConfirm')!.classList.add('input-success')
      setUserInput({ pseudo: "", mail: "", password: "" });
      setConfirmPass("")
      // -> Quand POST dispo, poster user dans API
      //Fetch id du user qu'on vient de post
      //Générer le qr code + imprimer
      
      //switch vers scene en ayant récupéré l'id du nouvel utilisateur
      
    } else {
      alert("password wrong")
      document.querySelector(".errConfirm")!.classList.remove('opacity-0')
      document.querySelector('.inputConfirm')!.classList.add('input-error')
      setConfirmPass("")
    }
  };
  /* - - -  input change - - - */
  const HandlePseudoChange = (ev:React.FormEvent) => {
    //console.log(ev);
    const target = ev.target as HTMLInputElement; //typescript fix: value does not
    setUserInput({ ...getUserInput, pseudo: target.value });
  };
  const HandleMailChange = (ev:React.FormEvent) => {
    //setRoleInput(ev.target.value);
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, mail: target.value });
  };
  const HandlePasswordChange = (ev:React.FormEvent) => {
    //setSideSelect(ev.target.value);
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, password: target.value });
  };
  const HandleConfirmPassChange = (ev:React.FormEvent) => {
    //setSideSelect(ev.target.value);
    const target = ev.target as HTMLInputElement;
    setConfirmPass(target.value);
  };
  /* - - - on blur - - - */
  const HandlePseudoBlur = () => {
    setUserInput({...getUserInput, pseudoBlur:true})
    //Faire un test pour savoir si unique
    GetUserValue()
  }
  const HandleMailBlur = () => {
    //test regex
    const pattern = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/
    let result = pattern.test(getUserInput.mail!)
    if (result){
      document.querySelector(".errMail")!.classList.add('opacity-0')
      document.querySelector('.inputMail')!.classList.remove('input-error')
      document.querySelector('.inputMail')!.classList.add('input-success')
    } else {
      document.querySelector(".errMail")!.classList.remove('opacity-0')
      document.querySelector('.inputMail')!.classList.remove('input-success')
      document.querySelector('.inputMail')!.classList.add('input-error')
    }
  }
  const HandlePassBlur = () => {
    const pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
    //const result: boolean = pattern.test(userInput.password!)
    if (pattern.test(getUserInput.password!)) {
      document.querySelector('.inputPass')!.classList.remove('input-error')
      document.querySelector('.inputPass')!.classList.add('input-success')
      document.querySelector(".errPass")!.classList.remove('text-red-400')
    } else {
      alert("pass incorrect")
      document.querySelector(".errPass")!.classList.add('text-red-400')
      document.querySelector('.inputPass')!.classList.add('input-error')
    }
  }
  /* - - - au click - - - */
  const HandleClick = (ev:React.FormEvent) => {
    ev.preventDefault();
    //window.history.pushState(location, '', 'SecondConnexionScreen')
    //window.location.href = 'SecondConnexionScreen'
  }
  /* ------------- R E N D U ------------- */
  //console.log(user)
  return (
    <>
      <div className="m-6 flex flex-col justify-center items-center">
        <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
        {/* ------- Formulaire ------- */}
        <form className=" grid grid-cols-2 justify-center m-6 gap-12 shadow-lg p-20 rounded-lg" onSubmit={HandleSubmit}>
          <div className="grid">
            <label htmlFor="">Pseudo*</label>
            <input value={getUserInput.pseudo}  type="text" placeholder="Pseudo" className={
              `${(getUserInput.pseudoBlur && getUserInput.pseudo==="" || getApiUser === false)?"input-error":""}
              ${(getUserInput.pseudoBlur && getUserInput.pseudo!=="" && getApiUser)?"input-success":""}
              inputPseudo input input-bordered w-full max-w-xs`
              } required onBlur={HandlePseudoBlur} onChange={HandlePseudoChange} />
            <p className={
              `${(getUserInput.pseudoBlur && getUserInput.pseudo==="" || getApiUser === false)?"":"opacity-0"}
              errPseudo text-xs mt-1 text-red-400`
              }>{getMsg.pseudo}</p>
          </div>
            <div className="grid">
              <label htmlFor="">Mail</label>
              <input value={getUserInput.mail}  type="email" placeholder="Mail" className="inputMail input input-bordered w-full max-w-xs " onBlur={HandleMailBlur} onChange={HandleMailChange} />
              <p className="errMail opacity-0 text-xs mt-1 text-red-400">{getMsg.mail}</p>
            </div>
            <div className="grid">
              <label htmlFor="">Mot de passe*</label>
              <input value={getUserInput.password}  type="password" placeholder="Mot de passe" className="inputPass input input-bordered w-full max-w-xs " required onBlur={HandlePassBlur} onChange={HandlePasswordChange} />
              <p className="errPass text-xs mt-1 ">{getMsg.password}</p>
            </div>
            <div className="grid">
              <label htmlFor="">Confirmer mot de passe*</label>
              <input value={getConfirmPass}  type="password" placeholder="Confirmer mot de passe " className="inputConfirm input input-bordered w-full max-w-xs " required onChange={HandleConfirmPassChange} />
              <p className="errConfirm opacity-0 text-xs mt-1 text-red-400">{getMsg.confirm}</p>
            </div>
            {/* ------- Button ------- */}
            <button className="btn col-span-2  mx-40">Créer nouveau perso</button>
            {/* ------- Déjà inscrit ? ------- */}
            <p>Déjà inscrit ? <Link className="underline" to="/ConnexionScreen" >C'est par ici ! </Link></p>
        </form>
      </div>
      {/* --------- Footer --------- */}
      <FooterComponent/>
    </>
  )
}

export default StartScreen