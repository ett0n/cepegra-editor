import { QRCodeCanvas } from "qrcode.react";

const QrGen = () => {
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
