/* ------------- I M P O R T ------------- */

import FooterComponent from "./FooterComponent"

/* ------------- I N I T I A L I S A T I O N ------------- */

/* ------------- R E A C T I O N ------------- */



/* ------------- R E N D U ------------- */
const LastScreenViewer = () => {
  return (
    <>
      <div className="grid m-20 ">
        <div className="bg-slate-50 p-5 rounded-l-xl rounded-tr-lg bg-white w-max absolute top-60 left-30 "><p>I'm alive !</p></div>
        <div className="m-10 flex justify-center items-center">
          <figure className="p-10 flex justify-end">
            <img src="http://placekitten.com/g/400/600" alt="" />
          </figure>
          <div className="flex flex-col justify-center items-center">
            <p>Pseudo</p>
            <p className="p-10 text-2xl italic text-center">Rendez-vous dans le viewer !</p>
          </div>
        </div>
      </div>
      <FooterComponent/>
    </>
  )
}

export default LastScreenViewer