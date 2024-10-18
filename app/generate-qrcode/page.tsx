"use server";
import QrCodeGenerator from "@/components/qrcode-generator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import * as React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      {!!session.user.placeId && <QrCodeGenerator placeId={session.user.placeId} />}
    </div>
  );
}
