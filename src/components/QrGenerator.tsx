/* ------------- I M P O R T ------------- */
import { QRCodeCanvas } from "qrcode.react";

const QrGen = () => {
/* ------------- R E N D U ------------- */
  return (
    <QRCodeCanvas
      value={"https://7push.csb.app/"}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
      imageSettings={{
        src: "",
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        excavate: true
      }}
    />
  );
};

export default QrGen;
