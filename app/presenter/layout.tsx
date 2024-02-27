import { LibraryProvider } from "@/providers/LibraryProvider";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <LibraryProvider>{children}</LibraryProvider>;
};

export default Layout;
