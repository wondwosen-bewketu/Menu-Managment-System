"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux";
import { MenuItem } from "@/app/types";
import {
  FaChevronRight,
  FaChevronDown,
  FaCog,
  FaCube,
  FaList,
  FaUsers,
  FaTrophy,
  FaCircle,
} from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { menus } = useSelector((state: RootState) => state.menu);
  const parentMenus = menus.filter((menu: MenuItem) => !menu.parentId);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (id: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIconForMenu = (name: string) => {
    switch (name.toLowerCase()) {
      case "systems":
        return <FaCube className="text-teal-400" />;
      case "properties":
        return <FaCog className="text-sky-400" />;
      case "menus":
        return <FaList className="text-cyan-400" />;
      case "users & group":
        return <FaUsers className="text-indigo-400" />;
      case "competition":
        return <FaTrophy className="text-purple-400" />;
      default:
        return <FaCube className="text-teal-400" />;
    }
  };

  return (
    <div
      className={`bg-gradient-to-b from-slate-800 to-slate-900 h-full
        ${isCollapsed ? "w-16" : "w-64"} p-4 transition-all duration-300
        border-r border-slate-700 shadow-xl`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"} 
          bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent`}
        >
          CLOIT
        </h1>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <span className="text-slate-300 text-sm">◀</span>
          ) : (
            <span className="text-slate-300 text-sm">▶</span>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {parentMenus.map((parent) => (
          <div key={parent.id}>
            {/* Parent Menu */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg
                cursor-pointer transition-all hover:bg-slate-700/50
                ${expandedMenus[parent.id] ? "bg-slate-700/30" : ""}`}
              onClick={() => toggleExpand(parent.id)}
            >
              <div className="flex items-center gap-3">
                {getIconForMenu(parent.name)}
                <span
                  className={`text-slate-200 font-medium 
                  ${isCollapsed ? "hidden" : "block"}`}
                >
                  {parent.name}
                </span>
              </div>
              {!isCollapsed &&
                (expandedMenus[parent.id] ? (
                  <FaChevronDown className="text-slate-400 text-sm" />
                ) : (
                  <FaChevronRight className="text-slate-400 text-sm" />
                ))}
            </div>

            {/* Child Menus */}
            <div
              className={`ml-2 pl-6 border-l-2 border-slate-700/50
                ${expandedMenus[parent.id] ? "block" : "hidden"}
                ${isCollapsed ? "hidden" : ""}`}
            >
              {menus
                .filter((menu: MenuItem) => menu.parentId === parent.id)
                .map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-3 p-2 rounded-md
                      text-slate-300 hover:bg-slate-700/30 cursor-pointer
                      transition-colors text-sm"
                  >
                    <FaCircle className="text-teal-400/60 text-[6px]" />
                    <span>{child.name}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;