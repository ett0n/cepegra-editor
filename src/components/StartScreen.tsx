// ------------- I M P O R T ------------- 
import {useState, useEffect} from "react";
import Axios from "axios";
import type { UserSignIn } from "../types/UserSignin";
import FooterComponent from "./FooterComponent";
import QrGenerator from "./QrGenerator";

interface Msg {
    pseudo: string;
    mail: string;
    password: string;
    confirm: string;
}

interface ApiUser {
    id: number;
    pseudo: string
}

const StartScreen: React.FC<props> = ({handleAddUser}) => {
    // ------------- S T A T E ------------- 
    const [newUser, setNewUser] = useState<UserSignIn>({
        pseudo: "",
        mail: "",
        password: ""
    })
    const [userInput, setUserInput] = useState<UserSignIn>({
        pseudo: "",
        mail: "",
        password: ""
    });
    const [apiUser, setApiUser] = useState<ApiUser[]>([]);
    const [confirmPass, setConfirmPass] = useState<string>();
    const msg:Msg = {
            pseudo: "pseudo déjà utilisé",
            mail: "mail incorrect",
            password: "mdp trop court",
            confirm: "confirmation incorrecte",
        }

    useEffect(() => {
        getDatas();
    }, []);
        
 
    // ------------- R E A C T I O N ------------- 
        // - - - fetch - - -
        const getDatas = async () => {
            const apiDatas = await Axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*');
            const tableUsers = apiDatas.data.data.map( (u: { id: any; attributes: { pseudo: any; }; })  => {return {id: u.id, pseudo : u.attributes.pseudo}})
            setApiUser(tableUsers);
        };    

        // - - -  au submit - - -
        const handleSubmit = (ev:React.FormEvent) => {
            ev.preventDefault();
            if(confirmPass === userInput.password) {
                alert("password identique")
                setNewUser(
                    {
                      pseudo: userInput.pseudo,
                      mail: userInput.mail,
                      password: userInput.password
                    }
                );
                document.querySelector('.inputConfirm').classList.add('input-success')
                setUserInput({ pseudo: "", mail: "", password: "" });
                setConfirmPass("")

                //vérifier si user est pas vide

                //Passer les données du user dans APP
                handleAddUser(newUser)

                // -> Quand POST dispo, poster user dans API

                //Fetch id du user qu'on vient de post

                //Générer le qr code + imprimer
                
                //switch vers scene en ayant récupéré l'id du nouvel utilisateur
                
            } else {
                alert("password wrong")
                document.querySelector(".errConfirm").classList.remove('opacity-0')
                document.querySelector('.inputConfirm').classList.add('input-error')
                setConfirmPass("")
            }
        };

        // - - -  input change - - -
        const handlePseudoChange = (ev:React.FormEvent) => {
            //console.log(ev);
            const target = ev.target as HTMLInputElement; //typescript fix: value does not
            setUserInput({ ...userInput, pseudo: target.value });
        };

        const handleMailChange = (ev:React.FormEvent) => {
            //setRoleInput(ev.target.value);
            const target = ev.target as HTMLInputElement;
            setUserInput({ ...userInput, mail: target.value });
        };

        const handlePasswordChange = (ev:React.FormEvent) => {
            //setSideSelect(ev.target.value);
            const target = ev.target as HTMLInputElement;
            setUserInput({ ...userInput, password: target.value });
        };

        const handleConfirmPassChange = (ev:React.FormEvent) => {
            //setSideSelect(ev.target.value);
            const target = ev.target as HTMLInputElement;
            setConfirmPass(target.value);
        };

        // - - - on blur - - -
        const handlePseudoBlur = () => {
            //Faire un test pour savoir si unique
            const apiUserCopy = [...apiUser]
            if (apiUserCopy.find(el => el.pseudo === userInput.pseudo)) {
                //si pas unique: msg error pseudo
                //tester si vide ou non
                document.querySelector(".errPseudo").classList.remove('opacity-0')
                document.querySelector('.inputPseudo').classList.add('input-error')
                setUserInput({ pseudo: "", mail: "", password: "" });
            } else {
                document.querySelector(".errPseudo").classList.add('opacity-0')
                document.querySelector('.inputPseudo').classList.remove('input-error')
                document.querySelector('.inputPseudo').classList.add('input-success')
                }
        }

         const handleMailBlur = () => {
        //     //test regex
        //     const pattern = "@globex\.com"
        //     let result = pattern.test(userInput.mail)
        //     if (result){
                 document.querySelector('.inputMail').classList.add('input-success')
        //     } else {
        //         document.querySelector('.inputMail').classList.add('input-error')
        //     }
         }

        const handlePassBlur = () => {
            const pattern = /(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,10}/
            //const result: boolean = pattern.test(userInput.mail!)
            if (pattern.test(userInput.mail!)) {
                alert("pass correct")
                document.querySelector('.inputPass').classList.add('input-success')
            } else {
                alert("pass incorrect")
                document.querySelector(".errPass").classList.remove('opacity-0')
                document.querySelector('.inputPass').classList.add('input-error')
            }
        }

        // - - - au click - - -
        const handleClick = (ev:React.FormEvent) => {
            ev.preventDefault();
            window.location.href = 'SecondConnexionScreen'
        }


    // ------------- R E N D U ------------- 
    //console.log(user)
    return (
        <>
        <div className="m-10 flex flex-col justify-center items-center">
            <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
            {/* ------- Formulaire ------- */}
            <form className=" grid grid-cols-2 justify-center m-20 gap-12 shadow-lg p-20 rounded-lg" onSubmit={handleSubmit}>
                <div className="grid">
                    <label htmlFor="">Pseudo</label>
                    <input value={userInput.pseudo}  type="text" placeholder="Pseudo" className="inputPseudo input input-bordered w-full max-w-xs " required onBlur={handlePseudoBlur} onChange={handlePseudoChange} />
                    <p className="errPseudo opacity-0">{msg.pseudo}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mail</label>
                    <input value={userInput.mail}  type="email" placeholder="Mail" className="inputMail input input-bordered w-full max-w-xs " onBlur={handleMailBlur} onChange={handleMailChange} />
                    <p className="errMail opacity-0">{msg.mail}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe</label>
                    <input value={userInput.password}  type="password" placeholder="Mot de passe" className="inputPass input input-bordered w-full max-w-xs " pattern="(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,10}" onBlur={handlePassBlur} onChange={handlePasswordChange} />
                    <p className="errPass opacity-0">{msg.password}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Confirmer mot de passe </label>
                    <input value={confirmPass}  type="password" placeholder="Confirmer mot de passe " className="inputConfirm input input-bordered w-full max-w-xs " onChange={handleConfirmPassChange} />
                    <p className="errConfirm opacity-0">{msg.confirm}</p>
                </div>
                {/* ------- Button ------- */}
                <button className="btn col-span-2  mx-40">Créer nouveau perso</button>
            </form>

            {/* ------- Déjà inscrit ? ------- */}
            <p>Déjà inscrit ? <a className="underline" href="#" onClick={handleClick}>C'est par ici ! </a></p>
        </div>
        <FooterComponent/>
        </>
    )
}

export default StartScreen