// ------------- I M P O R T ------------- 
import FooterComponent from "./FooterComponent"

// ------------- R E N D U ------------- 

const LastScreenQR = () => {
  return (
    <>
      <div className="grid  ">
        <div className="bg-slate-50 p-5 rounded-l-xl rounded-tr-lg bg-white w-max absolute top-40 left-80 border-solid border border-orange-500 "><p>I'm alive !</p></div>
        <div className="m-10 flex justify-center items-center">
          <figure className="p-10 flex justify-end">
            <img src="http://placekitten.com/g/400/600" alt="" />
          </figure>
          <div className="flex flex-col justify-center items-center m-40">
            <p>Pseudo</p>
            <p className="p-10 text-2xl italic text-center">N'oublie pas d'aller récupérer <br/> ton QR code au stand !</p>
          </div>
        </div>
      </div>
      <FooterComponent/>
    
    </>
  )
}

export default LastScreenQR