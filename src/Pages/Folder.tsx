import React from "react";
import { Search } from "lucide-react";

const FolderGrid: React.FC = () => {
  return (
    <div
      className="h-screen w-full bg-black text-white flex flex-col"
      style={{ backgroundColor: "#212121" }}
    >
      {/* Top fixed header */}
      <div
        className="p-4 w-auto border-x mx-20 font-aeonik"
        style={{ borderColor: "#9A9A9A" }}
      >
        <div
          className="px-4 py-3 flex text-xl gap-5"
          style={{ backgroundColor: "#3E3E3E" }}
        >
          <Search scale={6} />|
          <input
            type="text"
            className="outline-none bg-transparent text-white"
            placeholder="Search..."
          />
        </div>
      </div>
  
      {/* Remaining space */}
      <div className="flex-1 flex flex-col">
        <div
          className="flex-1 border-t px-20"
          style={{ borderColor: "#9A9A9A" }}
        >
          <div
            className="border-x grid grid-cols-3 h-full"
            style={{ borderColor: "#9A9A9A" }}
          >
            <div
              className="border-r"
              style={{ borderColor: "#9A9A9A" }}
            >
              hi
            </div>
            <div
              className="border-r"
              style={{ borderColor: "#9A9A9A" }}
            >
              hi
            </div>
            <div>hi</div>
          </div>
        </div>
      </div>
    </div>
  );  
  
};

export default FolderGrid;