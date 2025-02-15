"use client";

import MenuTree from "@/components/menuTree";
import MenuForm from "@/components/menuForm";

export default function MenusPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#f8f9fa]">
      {/* Left Side (Tree + Buttons) */}
      <div className="w-full md:w-[320px] bg-white border-b md:border-b-0 md:border-r border-[#e9ecef]">
        <div className="px-5 py-4">
          {/* Title + Subheading */}
          <div className="mb-4">
            <h1 className="text-[17px] font-semibold text-[#212529]">Menu</h1>
            <p className="text-[11px] font-medium text-[#868e96] uppercase tracking-wide mt-1">
              SYSTEM MANAGEMENT
            </p>
          </div>

          {/* Tree View with Buttons */}
          <div className="flex flex-col h-auto md:h-[calc(100vh-160px)]">
            {/* Tree Container */}
            <div className="flex-1 overflow-y-auto pr-2">
              <MenuTree />
            </div>
          </div>
        </div>
      </div>

      {/* Center (Form) */}
      <div className="w-full flex items-center justify-center p-4 md:p-8 bg-[#f8f9fa]">
        <div className="w-full max-w-[480px] bg-[#f8f9fa]  rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#dee2e6]">
          <div className="px-6 py-5">
            <MenuForm />
          </div>
        </div>
      </div>
    </div>
  );
}
