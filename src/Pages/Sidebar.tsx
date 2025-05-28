import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ChevronDown, ChevronRight, Folder, Hash, Moon, PlusCircle, Search, Settings, Star, Sun, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toogleDarkMode } from '../Atoms/darkModeSlice';
import { useNavigate } from "react-router-dom";

// redux/store.ts or types.ts

export interface State {
    darkMode: boolean; // or whatever type your darkMode state is
  }
  
type SectionKey = "favorites" | "folders" | "tags";
export function Sidebar() {
  const navigate= useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.darkMode.value);
  const ChangeDarkMode = () => dispatch(toogleDarkMode());
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const folders = ["Daily Notes", "Projects", "Work", "Personal", "Archive"];
  const tags = ["#important", "#todo", "#ideas", "#reference", "#journal"];
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
      favorites: true,
      folders: true,
      tags: false,
    });
  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const obsidianColors = {
    background: darkMode ? "#212121" : "#f8f8f8",
    sidebar: darkMode ? "#252525" : "#f0f0f0",
    card: darkMode ? "#2d2d2d" : "#ffffff",
    accent: darkMode ? "#8c78c9" : "#6A9C89",
    text: darkMode ? "#dddddd" : "#333333",
    textSecondary: darkMode ? "#888888" : "#666666",
    border: darkMode ? "#333333" : "#e0e0e0",
    hoverBg: darkMode ? "#363636" : "#f5f5f5",
    activeBg: darkMode ? "#454545" : "#e6e6e6",
    inputBg: darkMode ? "#3a3a3a" : "#ffffff",
    sidebarText: darkMode ? "#bbbbbb" : "#444444",
    sidebarIcon: darkMode ? "#888888" : "#666666",
    purple: "#8c78c9",
    green: "#6A9C89",
    favoriteIcon: "#e6b450",
  };

  return (
    <div
      className={`fixed lg:relative h-full z-10 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 border-r`}
      style={{
        backgroundColor: obsidianColors.sidebar,
        width: sidebarOpen ? "250px" : "0",
        minWidth: sidebarOpen ? "250px" : "0",
        borderColor: obsidianColors.border,
      }}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <div
          className="flex justify-between items-center p-4 border-b"
          style={{ borderColor: obsidianColors.border }}
        >
          <h1
            className="text-lg font-medium"
            style={{ color: obsidianColors.text }}
          >
            Neu Notes
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            style={{ color: obsidianColors.text }}
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Search in sidebar */}
          <div className="p-2">
            <div className="relative">
              <Search
                className="absolute left-2 top-2.5 h-4 w-4"
                style={{ color: obsidianColors.sidebarIcon }}
              />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 text-sm"
                style={{
                  backgroundColor: obsidianColors.inputBg,
                  borderColor: obsidianColors.border,
                  color: obsidianColors.text,
                }}
              />
            </div>
          </div>

          {/* Favorites Section */}
          <div className="px-2 py-1">
            <div
              className="flex items-center p-1 rounded cursor-pointer"
              onClick={() => navigate('/editor')}
              style={{ color: obsidianColors.sidebarText }}
            >
            <span className="text-md font-medium">Editor</span>
            </div>
          </div>

          {/* Folders Section */}
          <div className="px-2 py-1">
            <div
              className="flex items-center gap-1 p-1 rounded cursor-pointer"
              onClick={() => navigate('/folder')}
              style={{ color: obsidianColors.sidebarText }}
            >
              <span className="text-md font-medium">Folders</span>
            </div>
          </div>

          {/* Tags Section */}
          <div className="px-2 py-1">
            <div
              className="flex items-center gap-1 p-1 rounded cursor-pointer"
              onClick={() => toggleSection("tags")}
              style={{ color: obsidianColors.sidebarText }}
            >
              {expandedSections.tags ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <span className="text-sm font-medium">Tags</span>
            </div>

            {expandedSections.tags && (
              <div className="ml-4">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-1 rounded text-sm cursor-pointer"
                    style={{ color: obsidianColors.sidebarText }}
                  >
                    <Hash
                      size={14}
                      style={{ color: obsidianColors.sidebarIcon }}
                    />
                    {tag.substring(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-auto p-2 border-t flex items-center justify-between"
          style={{ borderColor: obsidianColors.border }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={ChangeDarkMode}
            style={{ color: obsidianColors.sidebarText }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            style={{ color: obsidianColors.sidebarText }}
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
