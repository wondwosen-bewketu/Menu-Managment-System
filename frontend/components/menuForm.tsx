"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store";
import { addMenu, fetchMenus } from "../app/redux/slices/menuSlice";

interface MenuFormProps {
  selectedMenuId: string | null;
  onSuccess: () => void;
}

export default function MenuForm({ selectedMenuId, onSuccess }: MenuFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { menus } = useSelector((state: RootState) => state.menu);

  const selectedParent = menus.find((menu) => menu.id === selectedMenuId);

  const [formData, setFormData] = useState({
    parentMenuId: "",
    depth: "0",
    parentName: "",
    name: "",
  });

  useEffect(() => {
    if (selectedParent) {
      setFormData({
        parentMenuId: selectedParent.id,
        depth: String(selectedParent.depth + 1),
        parentName: selectedParent.name,
        name: "",
      });
    } else {
      setFormData({
        parentMenuId: "",
        depth: "0",
        parentName: "",
        name: "",
      });
    }
  }, [selectedParent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a name for the menu item.");
      return;
    }

    try {
      await dispatch(
        addMenu({
          name: formData.name,
          depth: parseInt(formData.depth, 10),
          parentId: formData.parentMenuId || undefined,
        })
      ).unwrap();

      await dispatch(fetchMenus());

      // Reset the form
      setFormData((prev) => ({ ...prev, name: "" }));

      // Reset the selectedMenuId if creating a parent menu
      if (!formData.parentMenuId) {
        onSuccess(); // Call the onSuccess callback to reset selectedMenuId
      }
    } catch (error) {
      console.error("Failed to add menu:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Parent Menu ID (read-only) */}
        {formData.parentMenuId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu ID
            </label>
            <input
              type="text"
              value={formData.parentMenuId}
              readOnly
              className="w-3/4 px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            />
          </div>
        )}

        {/* Depth (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Depth
          </label>
          <input
            type="number"
            value={formData.depth}
            readOnly
            className="w-2/4 px-4 py-4 bg-gray-100 rounded-xl text-gray-700"
          />
        </div>

        {/* Parent Name (read-only) */}
        {formData.parentName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Name
            </label>
            <input
              type="text"
              value={formData.parentName}
              readOnly
              className="w-2/4 px-4 py-4 bg-gray-100 rounded-xl text-gray-700"
            />
          </div>
        )}

        {/* Menu Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.parentMenuId ? "Child Name" : "Menu Name"}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-2/4 px-4 py-4 bg-gray-100 rounded-xl text-gray-700"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}
