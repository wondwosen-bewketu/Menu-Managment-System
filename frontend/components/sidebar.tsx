"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { FaBars, FaThList, FaUsers, FaTrophy } from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  // Define navigation items
  const navItems = useMemo(
    () => [
      
    ],
    []
  );

  return (
    <aside
      className={`h-screen ${isCollapsed ? "w-16" : "w-60"} 
      bg-[#000033] text-white flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="text-lg font-bold tracking-wide">
          {!isCollapsed && "CLOIT"}
        </span>
        <button onClick={onToggle} className="text-white">
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const hasSubItems = !!item.subItems;

            return (
              <li key={index}>
                {/* Parent Item */}
                <div
                  onClick={() => hasSubItems && setExpanded(!expanded)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all 
                    ${
                      isActive ? "bg-[#76FA7B] text-black" : "hover:bg-gray-700"
                    }
                  `}
                >
                  {item.icon}
                  {!isCollapsed && item.label}
                </div>

                {/* Sub Items (if any) */}
                {hasSubItems && expanded && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-1 text-sm text-gray-300 hover:text-white"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
