"use client";

import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  return (
    <div className="py-2 px-10 border ">
      <nav className="flex justify-between items-center">
        <div className="flex gap-10">
          <Link href={"/"} className="text-2xl uppercase font-bold">
            <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
          </Link>
          <div className="flex gap-5 items-center text-xl ">
            <Link href={"/"}>Home</Link>
            <Link href={"/image-detection"}>Image Detection</Link>
            {session && <Link href={"/generate-qrcode"}>Generate Qr</Link>}
          </div>
        </div>
        <div>
          {session && session.user?.name ? (
            <div className="flex gap-2 items-center">
              <h2 className="h-10 w-10 bg-black rounded-full text-white flex justify-center items-center text-2xl">
                {session.user.name[0]}
              </h2>
              <Button onClick={() => signOut()}>LogOut</Button>
            </div>
          ) : (
            <Link
              href={"/sign-in"}
              className="h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            >
              LogIn
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
