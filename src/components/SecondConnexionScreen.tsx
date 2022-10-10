import FooterComponent from "./FooterComponent";
import LogoComponent from "./FooterComponent";
import QrReader from "./QrReader";

const SecondConnexionScreen = () => {
    return (
        <>
        <div className="m-10 flex flex-col justify-center items-center">
            <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
            <div className=" grid grid-cols-1 m-6 gap-6 justify-center shadow-lg p-12 rounded-lg">
              {/* --------- QR Scan --------- */}
              <div className="col-span-2 grid justify-center">
                <h2>Scannes ton code QR</h2>
                <QrReader />
              </div>

              {/* --------- Formulaire --------- */}
              <form className="grid grid-cols-2 justify-center col-span-2 m-6 gap-6">
                <div className="grid">
                    <label htmlFor="">Pseudo</label>
                    <input  type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe</label>
                    <input  type="text" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs " />
                </div>
                {/* --------- Button --------- */}
                <button className="btn col-span-2 mx-40">Créer nouveau perso</button>
              </form>
              <p className="col-span-2">Pas encore inscrit ? <a className="underline underline-offset-auto" href="#">C'est par ici !</a></p>

            </div>

        </div>
        {/* --------- Footer --------- */}
        <FooterComponent/>
        </>
    )
}

export default SecondConnexionScreen