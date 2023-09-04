/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import akasaImg from "../assets/akasa.png";

const Qr = () => {
  const { code } = useParams();

  return (
    <>
      <div className="bg-image"></div>
      <div className="p-12 flex flex-col items-center gap-6 m-auto max-w-sm min-h-[100dvh] text-white">
        <img src={akasaImg} className="w-2/3" />

        <div className="p-12 bg-white rounded-3xl">
          <QRCodeSVG value={code} />
        </div>
        <div className="text-2xl border-y-[3px] border-white py-2 px-16">
          {code}
        </div>

        <div className="text-sm py-2 px-6">
          This QR code provides visitor access. Please present it to the guard
          upon your arrival at the guardhouse.
        </div>
      </div>
    </>
  );
};

export default Qr;
