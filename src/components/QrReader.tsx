import React, { useState } from "react";
//import { QrReader } from "react-qr-reader";
import ScanOverlay from "./ScanOverlay";

const QrScan = () => {
  const [data, setData] = useState("No result");
  const [delayScan, setDelayScan] = useState(500);

  const handleScan = (result, error) => {
    if (!!result) {
      console.log(result);
      setData(result?.text);
      setDelayScan(false);
    }

    if (error) {
      console.error("QrReader: ", error);
      return;
    }
  };

  return (
    <div>
      <QrReader
        constraints={{ facingMode: "environnement" }}
        onResult={handleScan}
        scanDelay={delayScan}
        ViewFinder={ScanOverlay}
        className="qrScan"
        containerStyle={{ width: 200 }}
        videoStyle={{ height: 200 }}
      />
      <br />
      <a href={data}>
        {" "}
        <span className="toResult">Vers le site:</span> {data}{" "}
      </a>
    </div>
  );
};

export default QrScan;
