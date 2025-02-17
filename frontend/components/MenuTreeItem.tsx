// src/components/MenuTreeItem.tsx
"use client";

import React from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { MenuItem } from "../app/types";

interface MenuTreeItemProps {
  node: MenuItem;
  expandedMap: Record<string, boolean>;
  toggleNode: (id: string) => void;
  handleSelect: (id: string) => void;
  selectedMenuId: string | null;
  handleDelete: (id: string) => void;
  editingId: string | null;
  editedName: string;
  setEditedName: (name: string) => void;
  handleUpdate: (id: string) => void;
  startEditing: (id: string, name: string) => void;
  addingChildId: string | null;
  newChildName: string;
  setNewChildName: (name: string) => void;
  startAddChild: (id: string) => void;
  cancelAddChild: () => void;
  handleAddChild: (parentId: string) => void;
}

const MenuTreeItem: React.FC<MenuTreeItemProps> = ({
  node,
  expandedMap,
  toggleNode,
  handleSelect,
  selectedMenuId,
  handleDelete,
  editingId,
  editedName,
  setEditedName,
  handleUpdate,
  startEditing,
  addingChildId,
  newChildName,
  setNewChildName,
  startAddChild,
  cancelAddChild,
  handleAddChild,
}) => {
  const isOpen = expandedMap[node.id] || false;
  const isSelected = node.id === selectedMenuId;
  const isEditing = node.id === editingId;

  return (
    <li className="mb-1">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => toggleNode(node.id)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          )}
        </button>
        <div className="flex-1 flex items-center space-x-1">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="p-1 border rounded-md text-sm w-32"
              autoFocus
            />
          ) : (
            <div
              className={`cursor-pointer p-1 rounded-md ${
                isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(node.id)}
            >
              <span className="text-sm">{node.name}</span>
            </div>
          )}
          {/* Blue circular plus button */}
          <button
            onClick={() => startAddChild(node.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 flex items-center justify-center"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex space-x-1">
          {!isEditing && (
            <button
              onClick={() => startEditing(node.id, node.name)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <PencilIcon className="h-4 w-4 text-gray-600" />
            </button>
          )}
          {isEditing ? (
            <button
              onClick={() => handleUpdate(node.id)}
              className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleDelete(node.id)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <TrashIcon className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <ul className="ml-4 mt-1 pl-2">
          {node.children &&
            node.children.map((child) => (
              <MenuTreeItem
                key={child.id}
                node={child}
                expandedMap={expandedMap}
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
          {/* Inline add child input */}
          {node.id === addingChildId && (
            <li className="mb-1">
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="p-1 border rounded-2xl text-sm w-32"
                  placeholder="New child name"
                  autoFocus
                />
                <button
                  onClick={() => handleAddChild(node.id)}
                  className="px-2 py-1 bg-blue-500 text-black rounded-md text-sm hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={cancelAddChild}
                  className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </li>
          )}
        </ul>
      )}
    </li>
  );
};

export default MenuTreeItem;
