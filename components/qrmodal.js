import { useEffect, useState } from "react";
// import QRCode from "qrcode";
import Image from "next/image";
import qr from "../public/Assests/qrcodepic.png";

function QrModal(props) {
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanUp() {
      document.body.removeEventListener(
        "keydown",
        closeOnEscapeKeyDown
      );
    };
  }, []);

  if (!props.showQr) {
    return null;
  }

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  return (
    <div className={""} onClick={props.onClose}>
      <div className={""} onClick={e => e.stopPropagation()}>
        {qr && (
          <div className="">
            <Image
              src={qr}
              loader={() => qr}
              unoptimized={true}
              alt={"Thumbnail"}
              placeholder="blur"
              height={200}
              width={200}
              className="transition-all pointer-events-none "
            />
          </div>
        )}

        <div className={""}>
          <button className={""} onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrModal;
