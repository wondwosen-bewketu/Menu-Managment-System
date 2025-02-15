"use client";

import MenuTree from "@/components/menuTree";
import MenuForm from "@/components/menuForm";

export default function MenusPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#f8f9fa] p-4">
      {/* Left Side (Tree + Buttons) */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-white">
        <div className="px-6 py-5">
          {/* Title + Subheading */}
          <div className="mb-5">
            <h1 className="text-[18px] font-semibold text-[#212529]">Menu</h1>
            <p className="text-[12px] font-medium text-[#868e96] uppercase tracking-wide">
              SYSTEM MANAGEMENT
            </p>
          </div>

          {/* Tree Container */}
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
            <MenuTree />
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-full flex items-center justify-center mt-6 md:mt-0 md:ml-6">
        <div className="w-full max-w-[500px] bg-white p-6">
          <MenuForm />
        </div>
      </div>
    </div>
  );
}
