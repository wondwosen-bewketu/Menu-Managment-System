import { createContext } from "react";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});
