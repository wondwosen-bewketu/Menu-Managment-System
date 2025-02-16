"use client";

import React, { useEffect, useState, useContext } from "react";
import MenusHeader from "@/app/menusHeader";
import MenuForm from "@/components/menuForm";
import MenuDropdown from "@/components/menuDropdown";
import MenuTree from "@/components/menuTree";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/redux/store";
import { fetchMenus } from "../app/redux/slices/menuSlice";
import { SidebarContext } from "@/app/layout";

export default function MenusPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const { isSidebarOpen } = useContext(SidebarContext)!;

  // Fetch menus on component mount
  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
      {/* Header with Sidebar Toggle */}
      <MenusHeader />

      {/* Dropdown Section */}
      <div className="mb-8 max-w-xs">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Menu</h2>
        <MenuDropdown
          selectedMenuId={selectedMenuId}
          onSelect={setSelectedMenuId}
        />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Menu Structure Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Menu Structure</h3>
          <MenuTree
            selectedMenuId={selectedMenuId}
            onSelect={setSelectedMenuId}
          />
        </div>

        {/* Menu Form Section */}
        <div className="bg-white rounded-lg p-6">
          <MenuForm
            selectedMenuId={selectedMenuId}
            onSuccess={() => setSelectedMenuId(null)} // Reset selectedMenuId after creating a parent
          />
        </div>
      </div>
    </div>
  );
}
