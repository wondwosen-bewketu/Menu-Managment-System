// src/components/MenuTree.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchMenus,
  deleteMenu,
  updateMenu,
  addMenu,
} from "../app/redux";
import { buildTree } from "../app/utils";
import MenuTreeItem from "./MenuTreeItem";
import { MenuItem } from "../app/types";

interface MenuTreeProps {
  selectedMenuId: string | null;
  onSelect: (id: string) => void;
}

const MenuTree: React.FC<MenuTreeProps> = ({ selectedMenuId, onSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { menus, loading } = useSelector((state: RootState) => state.menu);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  // State for inline "add child" mode
  const [addingChildId, setAddingChildId] = useState<string | null>(null);
  const [newChildName, setNewChildName] = useState("");

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMenuId) {
      const expandedMap: Record<string, boolean> = {};
      const findParents = (menuId: string) => {
        const menu = menus.find((m) => m.id === menuId);
        if (menu && menu.parentId) {
          expandedMap[menu.parentId] = true;
          findParents(menu.parentId);
        }
      };
      findParents(selectedMenuId);
      expandedMap[selectedMenuId] = true;
      setExpanded(expandedMap);
    }
  }, [selectedMenuId, menus]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setExpanded((prev) => ({ ...prev, [id]: true }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      dispatch(deleteMenu(id));
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleUpdate = (id: string) => {
    if (editedName.trim()) {
      dispatch(updateMenu({ id, name: editedName }));
      setEditingId(null);
      setEditedName("");
    }
  };

  const startAddChild = (id: string) => {
    setAddingChildId(id);
    setNewChildName("");
    setExpanded((prev) => ({ ...prev, [id]: true }));
  };

  const cancelAddChild = () => {
    setAddingChildId(null);
    setNewChildName("");
  };

  const handleAddChild = (parentId: string) => {
    if (newChildName.trim()) {
      dispatch(addMenu({ name: newChildName, parentId }));
      setAddingChildId(null);
      setNewChildName("");
    }
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    menus.forEach((menu: MenuItem) => {
      allExpanded[menu.id] = true;
    });
    setExpanded(allExpanded);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  const menuTree = buildTree(menus, null);

  return (
    <div className="p-4 text-gray-800 bg-white rounded-lg shadow-sm">
      <div className="flex space-x-3 mb-3">
        <button
          onClick={expandAll}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition text-sm"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition text-sm"
        >
          Collapse All
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading menus...</p>
      ) : (
        <ul className="ml-4">
          {menuTree.map((node) => (
            <MenuTreeItem
              key={node.id}
              node={node}
              expandedMap={expanded}
              toggleNode={toggleNode}
              handleSelect={handleSelect}
              selectedMenuId={selectedMenuId}
              handleDelete={handleDelete}
              editingId={editingId}
              editedName={editedName}
              setEditedName={setEditedName}
              handleUpdate={handleUpdate}
              startEditing={startEditing}
              addingChildId={addingChildId}
              newChildName={newChildName}
              setNewChildName={setNewChildName}
              startAddChild={startAddChild}
              cancelAddChild={cancelAddChild}
              handleAddChild={handleAddChild}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuTree;
