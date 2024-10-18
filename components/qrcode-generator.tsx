"use client";
import { QRCodeCanvas } from "qrcode.react";
import * as React from "react";

const QrCodeGenerator = ({ placeId }: { placeId: string }) => {
  React.useEffect(() => {
    console.log("Dynamic Url", placeId);
  }, [placeId]);

  return (
    <div className="flex justify-center">
      <QRCodeCanvas value={`http://localhost:3000/car-parking/${placeId}`} size={400} />
    </div>
  );
};

export default QrCodeGenerator;
