"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/redux/store";
import { addMenu, fetchMenus } from "../app/redux/slices/menuSlice";

export default function MenuForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [depth, setDepth] = useState("");
  const [parentId, setParentId] = useState("");
  const [systemCode, setSystemCode] = useState("");
  const [menuId] = useState("56320ee9~6af6~11ed-a7ba-f220afe5e4a9");

  const handleSave = async () => {
    if (!name.trim()) return alert("Menu name is required!");

    await dispatch(
      addMenu({
        name,
        depth,
        parentId: parentId || undefined,
        systemCode,
      })
    );

    await dispatch(fetchMenus());
    setName("");
    setDepth("");
    setParentId("");
    setSystemCode("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#f8f9fa]  p-6">
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Menu ID
        </label>
        <input
          type="text"
          readOnly
          value={menuId}
          className="w-full px-4 py-2 bg-gray-100 rounded-md  text-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Depth
        </label>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="w-3/4 px-4 py-4 bg-gray-400 rounded-xl text-gray-700 cursor-not-allowed"
        />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent Data
        </label>
        <input
          type="text"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="w-3/4 px-4 py-4 bg-gray-100 rounded-xl text-gray-700 cursor-not-allowed"
        />

        {/* Name and System Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-3/4 px-4 py-4 bg-gray-100 rounded-xl text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-3/4 px-4 py-4 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  );
}
