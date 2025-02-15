"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux";
import { fetchMenus } from "../app/redux";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// Define MenuItem Type
interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  children?: MenuItem[];
}

// Convert flat menu list into a nested tree structure
const buildTree = (menuItems: MenuItem[]) => {
  const menuMap: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  menuItems.forEach((item) => {
    menuMap[item.id] = { ...item, children: [] };
  });

  menuItems.forEach((item) => {
    if (item.parentId && menuMap[item.parentId]) {
      menuMap[item.parentId].children?.push(menuMap[item.id]);
    } else {
      tree.push(menuMap[item.id]); // Root items
    }
  });

  return tree;
};

// Render the tree structure recursively
function renderTree(
  nodes: MenuItem[],
  expandedMap: Record<string, boolean>,
  toggleNode: (id: string) => void
) {
  return (
    <ul className="ml-4">
      {nodes.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isOpen = expandedMap[node.id] || false;

        return (
          <li key={node.id} className="mb-1">
            <div
              className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
              onClick={() => hasChildren && toggleNode(node.id)}
            >
              {hasChildren ? (
                isOpen ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                )
              ) : (
                <div className="h-4 w-4" />
              )}
              <span className="text-sm">{node.name}</span>
            </div>
            {hasChildren && isOpen && (
              <div className="ml-4 mt-1 border-l border-gray-300 pl-2">
                {renderTree(node.children || [], expandedMap, toggleNode)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function MenuTree() {
  const dispatch = useDispatch<AppDispatch>();
  const { menus, loading } = useSelector((state: RootState) => state.menu);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const newExpanded: Record<string, boolean> = {};
    menus.forEach((menu) => {
      newExpanded[menu.id] = true;
    });
    setExpanded(newExpanded);
  };

  const handleCollapseAll = () => {
    setExpanded({});
  };

  // Convert flat menu data into tree format
  const menuTree = buildTree(menus);

  return (
    <div className="p-4 text-gray-800">
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleExpandAll}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Collapse All
        </button>
      </div>
      {loading ? <p>Loading...</p> : renderTree(menuTree, expanded, toggleNode)}
    </div>
  );
}
