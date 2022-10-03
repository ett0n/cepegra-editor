import FooterComponent from "./FooterComponent"
import LogoComponent from "./FooterComponent"
const StartScreen = () => {
    return (
        <>
        <div className="m-10 flex flex-col justify-center items-center">
            <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
            {/* ------- Formulaire ------- */}
            <form className=" grid grid-cols-2 justify-center m-20 gap-12 shadow-lg p-20 rounded-lg">
                <div className="grid">
                    <label htmlFor="">Pseudo</label>
                    <input  type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="grid">
                    <label htmlFor="">Mail</label>
                    <input  type="mail" placeholder="Mail" className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe</label>
                    <input  type="text" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="grid">
                    <label htmlFor="">Confirmer mot de passe </label>
                    <input  type="text" placeholder="Confirmer mot de passe " className="input input-bordered w-full max-w-xs " />
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