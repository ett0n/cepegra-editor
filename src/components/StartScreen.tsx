const StartScreen = () => {
    return (
        <>
        <div className="m-10 flex flex-col justify-center items-center">
            <h1 className="m-4 text-center justify-center">Nom du creator</h1>
            <div className=" grid grid-cols-2 m-4">
                <input  type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs m-4" />
                <input  type="mail" placeholder="Email" className="input input-bordered w-full max-w-xs m-4" />
                <input  type="text" placeholder="Mot de passe" className="input input-bordered w-full max-w-xs m-4" />
                <input  type="text" placeholder="Confirmer mot de passe" className="input input-bordered w-full max-w-xs m-4" />
            </div>
            <button className="btn">Créer nouveau perso</button>
        </div>
        </>
    )
}

export default StartScreen