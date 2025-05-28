import { Search, Folder, FileText, Image, Music, Video } from "lucide-react";

const FolderGrid: React.FC = () => {
  // Sample data for folders
  const folders = [
    { name: "Documents", icon: <FileText size={24} />, items: 24 },
    { name: "Images", icon: <Image size={24} />, items: 156 },
    { name: "Music", icon: <Music size={24} />, items: 89 },
    { name: "Videos", icon: <Video size={24} />, items: 42 },
    { name: "Projects", icon: <Folder size={24} />, items: 17 },
    { name: "Archives", icon: <Folder size={24} />, items: 8 },
    { name: "Downloads", icon: <Folder size={24} />, items: 31 },
    { name: "Templates", icon: <Folder size={24} />, items: 5 },
    { name: "Work", icon: <Folder size={24} />, items: 12 },
  ];

  // Calculate golden ratio proportions
  const headerHeight = 64; // Reduced header height
  const mainHeight = `calc(100vh - ${headerHeight}px)`;
  const sidebarWidth = 240; // Slightly narrower sidebar
  const contentWidth = `calc(100vw - ${sidebarWidth}px)`;

  return (
    <div
      className="h-screen w-full bg-black text-white flex flex-col"
      style={{ backgroundColor: "#212121" }}
    >
      {/* Compact top header */}
      <div
        className="p-3 w-full font-aeonik flex justify-center"
        style={{ 
          height: `${headerHeight}px`,
          borderBottom: "1px solid #9A9A9A"
        }}
      >
        <div
          className="px-4 py-2 flex items-center text-lg gap-4 w-full max-w-6xl"
          style={{ backgroundColor: "#3E3E3E" }}
        >
          <Search size={18} className="opacity-70" />
          <div className="h-5 w-px bg-gray-500"></div>
          <input
            type="text"
            className="outline-none bg-transparent text-white flex-1 placeholder-gray-400 text-sm"
            placeholder="Search folders..."
          />
        </div>
      </div>
  
      {/* Main content area */}
      <div 
        className="flex-1 flex"
        style={{ height: mainHeight }}
      >
        {/* Compact folder grid */}
        <div 
          className="flex-1 p-4 overflow-auto"
          style={{ width: contentWidth }}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-100">All Folders</h1>
            
            {/* More compact grid with smaller cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {folders.map((folder, index) => (
                <div 
                  key={index}
                  className="group relative p-4 rounded-lg border transition-all duration-300 hover:border-yellow-400 hover:shadow-lg"
                  style={{
                    borderColor: "#9A9A9A",
                    backgroundColor: "#2A2A2A",
                    aspectRatio: "1/1.618", // Maintain golden ratio
                    minWidth: "160px", // Set minimum width for cards
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                      {folder.icon}
                    </div>
                    <h3 className="text-base font-medium mb-1 text-gray-100 truncate">{folder.name}</h3>
                    <p className="text-gray-400 text-xs">{folder.items} items</p>
                    <div className="mt-auto pt-2 border-t border-gray-700">
                      <button className="text-xs text-gray-300 hover:text-white">
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default FolderGrid;
