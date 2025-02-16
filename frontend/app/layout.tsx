"use client";

import "./globals.css";
import { ReactNode, createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../app/redux";
import Sidebar from "@/components/sidebar";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
} | null>(null);

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        <Provider store={store}>
          <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            <div className="flex h-full w-full">
              {/* Sidebar */}
              {isSidebarOpen && (
                <Sidebar isCollapsed={false} onToggle={toggleSidebar} />
              )}

              {/* Main Content */}
              <main
                className={`flex-1 overflow-auto transition-all duration-300 p-4`}
              >
                {children}
              </main>
            </div>
          </SidebarContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
