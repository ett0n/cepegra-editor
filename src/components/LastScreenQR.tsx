import FooterComponent from "./FooterComponent"

const LastScreenQR = () => {
    return (
        <>
        <div className="grid m-20">
            <div className="bg-slate-50 p-5 rounded-l-xl rounded-tr-lg bg-white w-max absolute top-60 left-30 "><p>I'm alive !</p></div>
            <div className="m-10 flex justify-center items-center">
                <figure className="p-10 flex justify-end">
                    <img src="http://placekitten.com/g/400/600" alt="" />
                </figure>
                <p className="p-20 text-2xl italic text-center">N'oublie pas d'aller récupérer ton QR code !</p>
            </div>
        </div>
        <FooterComponent/>
        
        </>
    )
}

export default LastScreenQR