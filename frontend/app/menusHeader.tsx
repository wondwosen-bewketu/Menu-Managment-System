"use client";

import React, { useContext } from "react";
import { MdMenu } from "react-icons/md";
import { SidebarContext } from "@/app/context/SidebarContext";

export default function MenusHeader() {
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <MdMenu className="h-6 w-6 text-blue-500 transition-transform duration-300" />
        </button>
        Menu
      </h1>
    </header>
  );
}
