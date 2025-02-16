"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux";
import { fetchMenus } from "../app/redux";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  children?: MenuItem[];
}

const buildTree = (menuItems: MenuItem[], selectedParentId: string | null) => {
  const menuMap: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  menuItems.forEach((item) => {
    menuMap[item.id] = { ...item, children: [] };
  });

  menuItems.forEach((item) => {
    if (item.parentId && menuMap[item.parentId]) {
      menuMap[item.parentId].children?.push(menuMap[item.id]);
    } else {
      tree.push(menuMap[item.id]);
    }
  });

  if (selectedParentId) {
    return tree.filter(
      (item) =>
        item.id === selectedParentId || item.parentId === selectedParentId
    );
  }

  return tree;
};

interface MenuTreeProps {
  selectedMenuId: string | null;
  onSelect: (id: string) => void;
}

function renderTree(
  nodes: MenuItem[],
  expandedMap: Record<string, boolean>,
  toggleNode: (id: string) => void,
  handleSelect: (id: string) => void,
  selectedMenuId: string | null
) {
  return (
    <ul className="ml-4">
      {nodes.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isOpen = expandedMap[node.id] || false;
        const isSelected = node.id === selectedMenuId;

        return (
          <li key={node.id} className="mb-1">
            <div className="flex items-center space-x-1">
              {hasChildren && (
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
              )}
              <div
                className={`flex-1 cursor-pointer p-1 rounded-md ${
                  isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(node.id)}
              >
                <span className="text-sm">{node.name}</span>
              </div>
            </div>
            {hasChildren && isOpen && (
              <div className="ml-4 mt-1 pl-2">
                {renderTree(
                  node.children || [],
                  expandedMap,
                  toggleNode,
                  handleSelect,
                  selectedMenuId
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function MenuTree({ selectedMenuId, onSelect }: MenuTreeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { menus, loading } = useSelector((state: RootState) => state.menu);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    menus.forEach((menu) => {
      allExpanded[menu.id] = true;
    });
    setExpanded(allExpanded);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  const menuTree = buildTree(menus, null);

  return (
    <div className="p-4 text-gray-800 bg-white">
      <div className="flex space-x-3 mb-3">
        <button
          onClick={expandAll}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
        >
          Collapse All
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        renderTree(menuTree, expanded, toggleNode, handleSelect, selectedMenuId)
      )}
    </div>
  );
}
