/* ------------- I M P O R T ------------- */
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import ScanOverlay from "./ScanOverlay";

const QrScan = () => {
  const [getData, setData] = useState<string>("No result");
  const [getDelayScan, setDelayScan] = useState<number>(500);

  const HandleScan = (result:any, error:any) => {
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
    const Stream = mediaStream;
    const Tracks = Stream.getTracks();

    Tracks[0].stop;
  })

  console.log(navigator)

  return (
  /* ------------- R E N D U ------------- */
    <div>
      <QrReader
        constraints={{ facingMode: "environnement" }}
        onResult={HandleScan}
        scanDelay={getDelayScan}
        ViewFinder={ScanOverlay}
        className="qrScan"
        containerStyle={{ width: 200 }}
        videoStyle={{ height: 200 }}
      />
    </div>
  );
};

export default QrScan;
