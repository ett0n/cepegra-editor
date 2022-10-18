/* ------------- I M P O R T S ------------- */
/* --- import dependencies --- */
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, redirect, Navigate } from "react-router-dom";
import QrReader from "../components/QrReader";
import Axios from "axios";

/* --- import component --- */
import StartScreen from "./StartScreen";
import FooterComponent from "../components/FooterComponent";
import LogoComponent from "../components/FooterComponent";

/* --- import type --- */
import type { UserSignIn } from "../types/UserSignin";

/* -------------------- C O M P O S A N T -------------------- */
const SecondConnexionScreen = ({ setUserId }: { setUserId: Dispatch<SetStateAction<any>> }) => {
  /* ---------- S T A T E ---------- */
  const [getUserInput, setUserInput] = useState<UserSignIn>({
    pseudo: "",
    password: "",
  });
  const [getUserExist, setUserExist] = useState<boolean>();
  const [getQrResult, setQrResult] = useState<string>("");
  const [getQrId, setQrId] = useState<number>();
  const [getQrExist, setQrExist] = useState<boolean>(true);
  const [getToEditor, setToEditor] = useState<boolean>(false);

  useEffect(() => {
    if (getQrResult !== "") {
      setQrExist(false);
    }
  }, []);

  /* ------------- R E A C T I O N ------------- */
  /* - - - - - - AXIOS - - - - - - */
  /* - - - Get pseudo & password - - - */
  const GetUserValue = async () => {
    const checkUser = await Axios.get(`https://api.xrlab.cepegra.be/api/appusers?filters[pseudo][$eqi]=${getUserInput.pseudo}&filters[password][$eq]=${getUserInput.password}`);
    //console.log(checkUser)
    if (checkUser.data.meta.pagination.total !== 0) {
      console.log("login correct");
      setUserId(checkUser.data.data[0].id);
      setUserExist(true);
      //rediriger vers l'editor (ne fonctionne pas encore)
      setToEditor(true);
    } else {
      console.log("ce login n'existe pas");
      setUserExist(false);
      console.log(getUserInput);
      setToEditor(false);
    }
  };
  /* - - - Get password - - - */
  


  /* - - - - - -  SUBMIT - - - - - - */
  const HandleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (getUserInput.pseudo !== "" && getUserInput.password !== "") {
      console.log("champs remplis");
      //Faire un switch: si QrResult !== "" => on récupère le result et on y trouve l'id (les 2 derniers caractères de l'url?)
      if(getQrResult !== ""){
        let qrUserId: any = getQrResult.match(/(id=\d+(\.\d)*)/i)
        console.log("Qr id result: ", qrUserId)
        console.log("Qr id result parsed: ", parseInt(qrUserId))
        //setQrId(parseInt(qrUserId))
        // => puis comparer le password avec api

      } else {
        //Si pas de Qr Reslut => comparer les inputs avec les résultats (pseudo et password) de l'api:
        GetUserValue();
      }
    } else {
      console.log("champs non remplis");
    }
    //mettre les champs à vide (ne fonctionne pas encore)
    setUserInput({ pseudo: "", password: "" });
  };

  /* - - - - - - RETRIEVE ID FROM QrRESULT - - - - - - */


  /* - - - - - - INPUT CHANGE - - - - - - */
  /* - - -  input change Pseudo - - - */
  const HandlePseudoChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement; //typescrifix: value does not
    setUserInput({ ...getUserInput, pseudo: target.value });
  };
  /* - - -  input change Mail - - - */
  const HandlePasswordChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement;
    setUserInput({ ...getUserInput, password: target.value });
  };

  //Validation de navigate
  if (getToEditor === true) {
    return <Navigate to="/Editor" />;
  }

  //non résolu:
  //A ajouter dans class name de input pseudo si résolu: ${(getUserInput.pseudo === "" || getApiUser?.exist === false) ? "input-error" : "input-success"}
  console.log(getQrResult);
  /* ---------- R E N D E R ---------- */
  return (
    <>
      <div className="m-6 flex flex-col justify-center items-center">
        <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
        <div className=" grid grid-cols-1 m-6 gap-6 justify-center shadow-lg p-12 rounded-lg">
          {/* --------- QR Scan --------- */}
          <div className="col-span-2 grid justify-center">
            <h2>Scannes ton code QR</h2>
            {/* Quand le scan donne un résultat, on arrête le composant (NE FONCTIONNE PAS !) */}
            {getQrResult === "" && <QrReader setQrResult={setQrResult} />}
          </div>
          {/* --------- Formulaire --------- */}
          <form className="grid grid-cols-2 justify-center col-span-2 m-6 gap-6" onSubmit={HandleSubmit}>
            <div className="grid">
              <label htmlFor="">Pseudo</label>
              <input type="text" placeholder="Pseudo" className={` input input-bordered w-full max-w-xs `} required onChange={HandlePseudoChange} />
              {/* changer les css sans utiliser de querySelector */}
              <p className={`${getUserExist === false ? "" : "opacity-0"} errPseudo text-xs mt-1 text-red-400`}>Ce pseudo n'existe pas</p>
            </div>
            <div className="grid">
              <label htmlFor="">Mot de passe</label>
              <input type="password" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs " onChange={HandlePasswordChange} />
              <p className={`${getUserExist === false ? "" : "opacity-0"} errPass text-xs mt-1 text-red-400`}>Mot de passe incorrect</p>
            </div>
            {/* --------- Button --------- */}
            <button className="btn col-span-2 mx-40">Créer nouveau perso</button>
          </form>
          {/* --------- Pas encore inscrit ? --------- */}
          <p className="col-span-2">
            Pas encore inscrit ?{" "}
            <Link className="underline underline-offset-auto" to="/StartScreen">
              C'est par ici !
            </Link>
          </p>
        </div>
      </div>
      {/* --------- Footer --------- */}
      <FooterComponent />
    </>
  );
};

export default SecondConnexionScreen;
