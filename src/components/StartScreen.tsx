// ------------- I M P O R T ------------- 
import {useState} from "react";
import FooterComponent from "./FooterComponent"

interface UserSignIn {
    pseudo: string;
    mail?: string;
    password: string
}

interface Msg {
    pseudo: string;
    mail: string;
    password: string;
    confirm: string;
}

const StartScreen: React.FC = () => {
    // ------------- S T A T E ------------- 
    const [user, setUser] = useState<UserSignIn[]>([
        {pseudo: "kevin", mail: "", password: "pass"}
    ])
    const [userInput, setUserInput] = useState<UserSignIn>({
        pseudo: "",
        mail: "",
        password: ""
    });
    const [confirmPass, setConfirmPass] = useState<string>();
    const msg:Msg = {
            pseudo: "pseudo déjà utilisé",
            mail: "mail incorrect",
            password: "mdp trop court",
            confirm: "confirmation incorrecte",
        }


    // ------------- R E A C T I O N ------------- 
        
        // - - -  au click - - -
        const handleSubmit = (ev:React.FormEvent) => {
            ev.preventDefault();
            if(confirmPass === userInput.password) {
                alert("password identique")
                setUser([
                    ...user,
                    {
                      pseudo: userInput.pseudo,
                      mail: userInput.mail,
                      password: userInput.password
                    }
                  ]);

                // -> Quand POST dispo, poster user dans API

                setUserInput({ pseudo: "", mail: "", password: "" });
                setConfirmPass("")
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
            //Faire un test pour savoir si unique
            setUserInput({ ...userInput, pseudo: target.value });
            //si pas unique: msg error pseudo
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
                    <input value={userInput.pseudo}  type="text" placeholder="Pseudo" className="inputPseudo input input-bordered w-full max-w-xs " onChange={handlePseudoChange} />
                    <p className="errPseudo opacity-0">{msg.pseudo}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mail</label>
                    <input value={userInput.mail}  type="email" placeholder="Mail" className="inputMail input input-bordered w-full max-w-xs " onChange={handleMailChange} />
                    <p className="errMail opacity-0">{msg.mail}</p>
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe</label>
                    <input value={userInput.password}  type="password" placeholder="Mot de passe" className="inputPass input input-bordered w-full max-w-xs " onChange={handlePasswordChange} />
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
            <p>Déjà inscrit ? <a className="underline" href="">C'est par ici ! </a></p>
        </div>
        <FooterComponent/>
        </>
    )
}

export default StartScreen