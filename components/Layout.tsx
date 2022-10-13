import React, { ReactNode } from "react";

import { Header } from "./";

interface ComponetnProps {
  children: ReactNode;
}

export default function Layout({ children }: ComponetnProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
