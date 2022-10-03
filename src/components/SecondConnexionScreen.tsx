import FooterComponent from "./FooterComponent";
import LogoComponent from "./FooterComponent";

const SecondConnexionScreen = () => {
    return (
        <>
        <div className="m-10 flex flex-col justify-center items-center">
            <h1 className="m-4 text-center justify-center">Nom du creator</h1>
            <div className=" grid m-20 gap-12 justify-center shadow-lg p-20 rounded-lg">
              {/* --------- QR Scan --------- */}
              <div className="col-span-2 grid">
                <h2>Scannes to code QR</h2>
              </div>

              {/* --------- Formulaire --------- */}
              <div className="grid grid-cols-2 m-20 gap-12">
                <div className="grid">
                    <label htmlFor="">Pseudo</label>
                    <input  type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="grid">
                    <label htmlFor="">Mot de passe</label>
                    <input  type="text" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs " />
                </div>
              </div>
            </div>

            {/* --------- Button --------- */}
            <button className="btn">Créer nouveau perso</button>
            <br />
            <p>Pas encore inscrit ? <a className="underline underline-offset-auto" href="">C'est par ici !</a></p>
        </div>
        {/* --------- Footer --------- */}
        <FooterComponent/>
        </>
    )
}

export default SecondConnexionScreen