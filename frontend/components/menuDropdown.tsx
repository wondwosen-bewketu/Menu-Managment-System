"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store";
import { fetchParents } from "../app/redux/slices/menuSlice";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuDropdownProps {
  selectedMenuId: string | null;
  onSelect: (id: string) => void;
}

export default function MenuDropdown({
  selectedMenuId,
  onSelect,
}: MenuDropdownProps) {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menu.menus);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  // Automatically select the first parent if none is selected
  const parentMenus = menus.filter((menu) => !menu.parentId);
  React.useEffect(() => {
    if (!selectedMenuId && parentMenus.length > 0) {
      onSelect(parentMenus[0].id);
    }
  }, [selectedMenuId, parentMenus, onSelect]);

  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId);

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white rounded-md shadow-sm focus:outline-none flex justify-between items-center"
      >
        <span className="text-sm text-gray-700">
          {selectedMenu?.name || "Select Menu"}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
          >
            {parentMenus.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  item.id === selectedMenuId ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => {
                  onSelect(item.id);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
