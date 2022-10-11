// ------------- I M P O R T ------------- 
import FooterComponent from "./FooterComponent"

// ------------- R E N D U ------------- 

const LoadingScreen = () => {
    return (
        <>
        <div className="grid m-20 justify-center ">
            <h1 className="m-3 text-center justify-center text-4xl font-bold">Nom du creator</h1>
            <div>


                {/* ------- Loader ------- */}
                <div className="dl">
                    <div className="dl__container">
                        <div className="dl__corner--top"></div>
                        <div className="dl__corner--bottom"></div>
                    </div>
                {/* ------- Logo ------- */}
                <img src="./assets/logo_cepegra_couleur (1).svg" alt="Logo du Cepegra" className="w-full py-20 "/>
                </div>
            </div>
        </div>

        
        </>
    )
}

export default LoadingScreen