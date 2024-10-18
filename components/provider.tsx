"use client";

import { Toaster } from "sonner";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default Providers;
