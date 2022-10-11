// ------------- I M P O R T ------------- 
import {useState, useEffect} from "react";
import Axios from "axios";
import type { UserSignIn } from "../types/UserSignin";
import FooterComponent from "./FooterComponent";
import QrGenerator from "./QrGenerator";

interface Msg {
    pseudo?: string;
    mail?: string;
    password?: string;
    confirm?: string;
}

interface ApiUser {
    id: number;
    pseudo: string
}

interface props {
    handleAddUser: (newUser: UserSignIn) => void;
}

const StartScreen: React.FC<props> = ({handleAddUser}) => {
    // ------------- S T A T E ------------- 
    const [newUser, setNewUser] = useState<UserSignIn>({
        pseudo: "",
        mail: "",
        password: ""
    })
    const [userInput, setUserInput] = useState<UserSignIn>(
        {
        pseudo: "",
        pseudoBlur: false,
        mail: "",
        password: ""
        }
    );
    const [apiUser, setApiUser] = useState<ApiUser[]>([]);
    const [confirmPass, setConfirmPass] = useState<string>();
    const [msg, setMsg] = useState<Msg>({
            pseudo: "Pseudo obligatoire",
            mail: "Mail incorrect",
            password: "6 caractères dont une majuscule et un chiffre",
            confirm: "Confirmation incorrecte",
        })

    // useEffect(() => {
    //     getDatas();
    // }, []);

   
    // ------------- R E A C T I O N ------------- 
        // - - - fetch - - -
        // const getDatas = async () => {
        //     const apiDatas = await Axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*');
        //     const tableUsers = apiDatas.data.data.map( (u: { id: any; attributes: { pseudo: any; }; })  => {return {id: u.id, pseudo : u.attributes.pseudo}})
        //     setApiUser(tableUsers);
        // };

        const getUserValue = async () => {
            const checkUser = await Axios.get(`http://xrlab.cepegra.be:1337/api/appusers?filters[pseudo][$eqi]=${userInput.pseudo}`);
            console.log(checkUser)

            // ------------- T E M P O R A R Y   A P I -------------
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

            if(checkUser.data.meta.pagination.total === 0) {
                alert("pseudo unique")
                setMsg({...msg, pseudo: "Pseudo obligatoire"})
                document.querySelector(".errPseudo").classList.add('opacity-0')
                document.querySelector('.inputPseudo').classList.remove('input-error')
                document.querySelector('.inputPseudo').classList.add('input-success')
                
            } else {
                alert("pseudo utilisé")
                document.querySelector('.inputPseudo').classList.remove('input-success')
                document.querySelector(".errPseudo").classList.remove('opacity-0')
                document.querySelector('.inputPseudo').classList.add('input-error')
                setMsg({...msg, pseudo: "Pseudo déjà utilisé"})
                setUserInput({ pseudo: "", mail: "", password: "" });
            }
        };

        // - - -  au submit - - -
        const handleSubmit = (ev:React.FormEvent) => {
            ev.preventDefault();
            if(confirmPass === userInput.password && userInput.password!=="") {
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
            setUserInput({...userInput, pseudoBlur:true})
    
            //Faire un test pour savoir si unique
            getUserValue()

        }

         const handleMailBlur = () => {
            //test regex
            const pattern = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/
            let result = pattern.test(userInput.mail!)
            if (result){
                document.querySelector(".errMail").classList.add('opacity-0')
                document.querySelector('.inputMail').classList.remove('input-error')
                document.querySelector('.inputMail').classList.add('input-success')
            } else {
                document.querySelector(".errMail").classList.remove('opacity-0')
                document.querySelector('.inputMail').classList.remove('input-success')
                document.querySelector('.inputMail').classList.add('input-error')
            }
         }

        const handlePassBlur = () => {
            const pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
            //const result: boolean = pattern.test(userInput.password!)
            if (pattern.test(userInput.password!)) {
                document.querySelector('.inputPass').classList.remove('input-error')
                document.querySelector('.inputPass').classList.add('input-success')
                document.querySelector(".errPass").classList.remove('text-red-400')
            } else {
                alert("pass incorrect")
                document.querySelector(".errPass").classList.add('text-red-400')
                document.querySelector('.inputPass').classList.add('input-error')
            }
        }

        // - - - au click - - -
        const handleClick = (ev:React.FormEvent) => {
            ev.preventDefault();
            //window.history.pushState(location, '', 'SecondConnexionScreen')
            //window.location.href = 'SecondConnexionScreen'
        }


    // ------------- R E N D U ------------- 
    //console.log(user)
    return (
        <>
        <div className="m-6 flex flex-col justify-center items-center">
            <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
            {/* ------- Formulaire ------- */}
            <form className=" grid grid-cols-2 justify-center m-6 gap-12 shadow-lg p-20 rounded-lg" onSubmit={handleSubmit}>
                <div className="grid">
                    <label htmlFor="">Pseudo*</label>
                    <input value={userInput.pseudo}  type="text" placeholder="Pseudo" className={
                        `${(userInput.pseudoBlur && userInput.pseudo==="")?"input-error":""}
                        ${(userInput.pseudoBlur && userInput.pseudo!=="")?"input-success":""}
                        inputPseudo input input-bordered w-full max-w-xs`
                        } required onBlur={handlePseudoBlur} onChange={handlePseudoChange} />
                    <p className="errPseudo opacity-0 text-xs mt-1 text-red-400">{msg.pseudo}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mail</label>
                    <input value={userInput.mail}  type="email" placeholder="Mail" className="inputMail input input-bordered w-full max-w-xs " onBlur={handleMailBlur} onChange={handleMailChange} />
                    <p className="errMail opacity-0 text-xs mt-1 text-red-400">{msg.mail}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe*</label>
                    <input value={userInput.password}  type="password" placeholder="Mot de passe" className="inputPass input input-bordered w-full max-w-xs " required onBlur={handlePassBlur} onChange={handlePasswordChange} />
                    <p className="errPass text-xs mt-1 ">{msg.password}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Confirmer mot de passe*</label>
                    <input value={confirmPass}  type="password" placeholder="Confirmer mot de passe " className="inputConfirm input input-bordered w-full max-w-xs " required onChange={handleConfirmPassChange} />
                    <p className="errConfirm opacity-0 text-xs mt-1 text-red-400">{msg.confirm}</p>
                </div>
                {/* ------- Button ------- */}
                <button className="btn col-span-2  mx-40">Créer nouveau perso</button>

                {/* ------- Déjà inscrit ? ------- */}
                <p>Déjà inscrit ? <a className="underline" href="#" onClick={handleClick}>C'est par ici ! </a></p>
            </form>
        </div>
        {/* --------- Footer --------- */}
        <FooterComponent/>
        </>
    )
}

export default StartScreen