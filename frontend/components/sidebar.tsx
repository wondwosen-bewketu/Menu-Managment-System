"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  // Example navigation items
  const navItems = useMemo(
    () => [
      { label: "Systems", href: "#" },
      { label: "System Code", href: "#" },
      { label: "Properties", href: "#" },
      { label: "Menus", href: "/menus" }, // We'll navigate to /menus
      { label: "API Link", href: "#" },
      { label: "Users & Group", href: "#" },
      { label: "Competition", href: "#" },
    ],
    []
  );

  return (
    <aside className="w-64 bg-[#1B1E23] text-white flex flex-col">
      {/* Logo / Title */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-bold">LOIT</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
