import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import ScanOverlay from "./ScanOverlay";

const QrScan = () => {
  const [data, setData] = useState<string>("No result");
  const [delayScan, setDelayScan] = useState<number>(500);

  const handleScan = (result:any, error:any) => {
    if (!!result) {
      console.log(result);
      setData(result?.text);
      //setDelayScan(false);
    }

    if (error) {
      console.error("QrReader: ", error);
      return;
    }
  };

  // - - - Stop camera - - - 
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(mediaStream => {
    const stream = mediaStream;
    const tracks = stream.getTracks();

    tracks[0].stop;
  })

  console.log(navigator)

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
    </div>
  );
};

export default QrScan;
