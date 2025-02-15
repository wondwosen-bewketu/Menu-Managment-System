"use client"; // Ensure this is a client component

import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../app/redux";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden">
        <Provider store={store}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
