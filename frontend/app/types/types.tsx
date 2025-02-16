export interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  subItems?: { href: string; label: string }[];
}
