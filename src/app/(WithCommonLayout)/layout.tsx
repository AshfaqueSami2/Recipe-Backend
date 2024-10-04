
import Navbar from "@/src/components/Ui/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main>{children}</main>
    </div>
  );
};

export default layout;
