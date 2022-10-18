// ------------- I M P O R T -------------
/* --- import dependencies --- */
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Axios from "axios";
import { Link, Navigate, redirect } from "react-router-dom";
//import { Redirect } from "react-router";

/* --- import type --- */
import type { UserSignIn } from "../types/UserSignin";

/* --- import component --- */
import ConnexionScreen from "./SecondConnexionScreen";
import FooterComponent from "../components/FooterComponent";
import LoadingScreen from "./LoadingScreen";

/* ------------- I N T E R F A C E ------------- */
interface Msg {
  pseudo?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const StartScreen = ({ setUserId }: { setUserId: Dispatch<SetStateAction<any>> }) => {
  /* ------------- S T A T E ------------- */
  const [getUserInput, setUserInput] = useState<UserSignIn>({
    pseudo: "",
    pseudoBlur: false,
    email: "",
    password: "",
  });
  const [getApiUser, setApiUser] = useState<boolean>();
  const [getConfirmPass, setConfirmPass] = useState<string>("");
  const [getMsg, setMsg] = useState<Msg>({
    pseudo: "Pseudo obligatoire",
    email: "Mail incorrect",
    password: "6 caractères dont une majuscule et un chiffre",
    confirm: "Confirmation incorrecte",
  });

  const [getToEditor, setToEditor] = useState<boolean>(false);

  /* ------------- R E A C T I O N ------------- */
  /* - - - - - - AXIOS - - - - - - */
  /* - - - Get - - - */
  const GetUserValue = async () => {
    const checkUser = await Axios.get(`https://api.xrlab.cepegra.be/api/appusers?filters[pseudo][$eqi]=${getUserInput.pseudo}`);
    //console.log(checkUser)

    if (checkUser.data.meta.pagination.total === 0) {
      setMsg({ ...getMsg, pseudo: "Pseudo obligatoire" });
      setApiUser(true);
    } else {
      setMsg({ ...getMsg, pseudo: "Pseudo déjà utilisé" });
      setApiUser(false);
      setUserInput({ pseudo: "", email: "", password: "" });
    }
  };

  /* - - - Post - - - */
  const PostNewUser = async () => {
    try {
      const postResult = await Axios.post("https://api.xrlab.cepegra.be/api/appusers", { data: { pseudo: getUserInput.pseudo, email: getUserInput.email, password: getUserInput.password } });
      console.log("Post réussi: ", postResult);
      //Actualiser le state getUserId de APP
      setUserId(postResult.data.data.id);
    } catch (error) {
      console.error("Erreur de Post: ", error);
    }
  };

  /* - - - - - -  SUBMIT - - - - - - */
  const HandleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (getUserInput.password !== "" && getUserInput.pseudo !== "" && getConfirmPass === getUserInput.password) {
      /* SI OK: post new user */
      PostNewUser();
      //changer les css
      document.querySelector(".inputConfirm")!.classList.add("input-success");
      setUserInput({ pseudo: "", email: "", password: "" });
      setConfirmPass("");

      //switch vers scene en ayant récupéré l'id du nouvel utilisateur
      setToEditor(true);
    } else {
      //changer les css
      document.querySelector(".errConfirm")!.classList.remove("opacity-0");
      document.querySelector(".inputConfirm")!.classList.add("input-error");
      setConfirmPass("");
    }
  };
  //Validation de navigate
  if (getToEditor === true) {
    return <Navigate to="/editor" />;
  }
  /* - - - - - - INPUT CHANGE - - - - - - */
  /* - - -  input change Pseudo - - - */
  const HandlePseudoChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement; //typescript fix: value does not
    setUserInput({ ...getUserInput, pseudo: target.value });
  };
  /* - - -  input change Mail - - - */
  const HandleMailChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, email: target.value });
  };
  /* - - -  input change Password - - - */
  const HandlePasswordChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, password: target.value });
  };
  /* - - -  input change Confirm password - - - */
  const HandleConfirmPassChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement;
    setConfirmPass(target.value);
  };

  /* - - - - - - ON BLUR - - - - - - */
  /* - - - on blur Pseudo - - - */
  const HandlePseudoBlur = () => {
    setUserInput({ ...getUserInput, pseudoBlur: true });
    //Faire un test vers api pour savoir si pseudo est unique:
    GetUserValue();
  };
  /* - - - on blur Mail - - - */
  const HandleMailBlur = () => {
    //test regex
    const pattern = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/;
    let result = pattern.test(getUserInput.email!);
    //changer les css en fonction du résultat du test regex
    if (result) {
      document.querySelector(".errMail")!.classList.add("opacity-0");
      document.querySelector(".inputMail")!.classList.remove("input-error");
      document.querySelector(".inputMail")!.classList.add("input-success");
    } else {
      document.querySelector(".errMail")!.classList.remove("opacity-0");
      document.querySelector(".inputMail")!.classList.remove("input-success");
      document.querySelector(".inputMail")!.classList.add("input-error");
    }
  };
  /* - - - on blur Password - - - */
  const HandlePassBlur = () => {
    //test regex
    const pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    //changer les css en fonction du résultat du test regex
    if (pattern.test(getUserInput.password!)) {
      document.querySelector(".inputPass")!.classList.remove("input-error");
      document.querySelector(".inputPass")!.classList.add("input-success");
      document.querySelector(".errPass")!.classList.remove("text-red-400");
    } else {
      document.querySelector(".errPass")!.classList.add("text-red-400");
      document.querySelector(".inputPass")!.classList.add("input-error");
    }
  };

  /* ------------- R E N D U ------------- */
  return (
    <>
      <div className="m-6 flex flex-col justify-center items-center">
        <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
        {/* ------- Formulaire ------- */}
        <form className=" grid grid-cols-2 justify-center m-6 gap-12 shadow-lg p-20 rounded-lg" onSubmit={HandleSubmit}>
          <div className="grid">
            <label htmlFor="">Pseudo*</label>
            {/* changer les css sans utiliser de querySelector */}
            <input
              value={getUserInput.pseudo}
              type="text"
              placeholder="Pseudo"
              className={`${(getUserInput.pseudoBlur && getUserInput.pseudo === "") || getApiUser === false ? "input-error" : ""}
              ${getUserInput.pseudoBlur && getUserInput.pseudo !== "" && getApiUser ? "input-success" : ""}
              inputPseudo input input-bordered w-full max-w-xs`}
              required
              onBlur={HandlePseudoBlur}
              onChange={HandlePseudoChange}
            />
            <p
              className={`${(getUserInput.pseudoBlur && getUserInput.pseudo === "") || getApiUser === false ? "" : "opacity-0"}
              errPseudo text-xs mt-1 text-red-400`}
            >
              {getMsg.pseudo}
            </p>
          </div>
          <div className="grid">
            <label htmlFor="">Mail</label>
            <input value={getUserInput.email} type="email" placeholder="Mail" className="inputMail input input-bordered w-full max-w-xs " onBlur={HandleMailBlur} onChange={HandleMailChange} />
            <p className="errMail opacity-0 text-xs mt-1 text-red-400">{getMsg.email}</p>
          </div>
          <div className="grid">
            <label htmlFor="">Mot de passe*</label>
            <input value={getUserInput.password} type="password" placeholder="Mot de passe" className="inputPass input input-bordered w-full max-w-xs " required onBlur={HandlePassBlur} onChange={HandlePasswordChange} />
            <p className="errPass text-xs mt-1 ">{getMsg.password}</p>
          </div>
          <div className="grid">
            <label htmlFor="">Confirmer mot de passe*</label>
            <input value={getConfirmPass} type="password" placeholder="Confirmer mot de passe " className="inputConfirm input input-bordered w-full max-w-xs " required onChange={HandleConfirmPassChange} />
            <p className="errConfirm opacity-0 text-xs mt-1 text-red-400">{getMsg.confirm}</p>
          </div>
          {/* ------- Button ------- */}
          <button className="btn col-span-2  mx-40">Créer nouveau perso</button>
          {/* ------- Déjà inscrit ? ------- */}
          <p>
            Déjà inscrit ?{" "}
            <Link className="underline" to="/connexionscreen">
              C'est par ici !{" "}
            </Link>
          </p>
        </form>
      </div>
      {/* --------- Footer --------- */}
      <FooterComponent />
    </>
  );
};

export default StartScreen;
