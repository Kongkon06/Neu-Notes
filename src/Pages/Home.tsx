import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Sun, Moon, Pencil, Menu, X, Save, Trash2, Book, FileText, Search, Plus, Hash, Clock, Settings, Folder, PlusCircle, Star, Archive, ChevronRight, ChevronDown } from "lucide-react";
import { Textarea } from "../components/ui/textarea";


interface Notes{
        id: number,
        title: string,
        text: string,
        type: string,
        createdAt: string,
        folder: string,
        tags: []
}
type SectionKey = "favorites" | "folders" | "tags";
export default function ObsidianNotesApp() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode like Obsidian
  const [notes, setNotes] = useState<Notes[]>([]);
  const [search, setSearch] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("notes");
  const [editingNote, setEditingNote] = useState<Notes>();
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    favorites: true,
    folders: true,
    tags: false,
  });

  // Generate some sample folders for the sidebar
  const folders = ["Daily Notes", "Projects", "Work", "Personal", "Archive"];
  const tags = ["#important", "#todo", "#ideas", "#reference", "#journal"];

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("obsidian_notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("obsidian_notes", JSON.stringify(notes));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addNote = () => {
    if (newNote.trim()) {
      const noteType = currentView === "notes" ? "note" : "blog";
      setNotes([
        {
          id: Date.now(),
          title: newTitle.trim() || `Untitled ${noteType}`,
          text: newNote,
          type: noteType,
          createdAt: new Date().toISOString(),
          folder: "Daily Notes",
          tags: []
        },
        ...notes
      ]);
      setNewNote("");
      setNewTitle("");
    }
  };

  const deleteNote = (id:number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingNote && editingNote.id === id) {
      setEditingNote({
        id: 0,
        title: '',
        text: '',
        type: '',
        createdAt:'',
        folder: '',
        tags: []
      });
      setNewNote("");
      setNewTitle("");
    }
  };

  const editNote = (note:any) => {
    setEditingNote(note);
    setNewNote(note.text);
    setNewTitle(note.title);
  };

  const updateNote = () => {
    if (editingNote && newNote.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, text: newNote, title: newTitle.trim() || note.title }
          : note
      ));
      setEditingNote({
        id: 0,
        title: '',
        text: '',
        type: '',
        createdAt:'',
        folder: '',
        tags: []
      });
      setNewNote("");
      setNewTitle("");
    }
  };

  const filterNotesByType = (noteType:any) => {
    return notes.filter(note => 
      note.type === noteType && 
      (note.text.toLowerCase().includes(search.toLowerCase()) || 
       note.title.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const filteredNotes = currentView === "notes" 
    ? filterNotesByType("note") 
    : filterNotesByType("blog");

  // Obsidian-inspired colors
  const obsidianColors = {
    background: darkMode ? "#1e1e1e" : "#f8f8f8",
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
    favoriteIcon: "#e6b450"
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: obsidianColors.background, color: obsidianColors.text }}>
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative h-full z-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r`}
        style={{ 
          backgroundColor: obsidianColors.sidebar,
          width: sidebarOpen ? '250px' : '0',
          minWidth: sidebarOpen ? '250px' : '0',
          borderColor: obsidianColors.border
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: obsidianColors.border }}>
            <h1 className="text-lg font-medium" style={{ color: obsidianColors.text }}>Obsidian Notes</h1>
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden" style={{ color: obsidianColors.text }}>
              <X size={18} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Search in sidebar */}
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4" style={{ color: obsidianColors.sidebarIcon }} />
                <Input 
                  placeholder="Search..." 
                  className="pl-8 h-8 text-sm"
                  style={{ 
                    backgroundColor: obsidianColors.inputBg,
                    borderColor: obsidianColors.border,
                    color: obsidianColors.text
                  }}
                />
              </div>
            </div>
            
            {/* Favorites Section */}
            <div className="px-2 py-1">
              <div 
                className="flex items-center gap-1 p-1 rounded cursor-pointer" 
                onClick={() => toggleSection("favorites")}
                style={{ color: obsidianColors.sidebarText }}
              >
                {expandedSections.favorites ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="text-sm font-medium">Favorites</span>
              </div>
              
              {expandedSections.favorites && (
                <div className="ml-4">
                  {["Daily journal", "Project ideas", "Reading list"].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 p-1 rounded text-sm cursor-pointer hover:bg-opacity-30"
                      style={{ 
                        color: obsidianColors.sidebarText,
                        backgroundColor: i === 0 ? obsidianColors.activeBg : "transparent"
                      }}
                    >
                      <Star size={14} style={{ color: obsidianColors.favoriteIcon }} />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Folders Section */}
            <div className="px-2 py-1">
              <div 
                className="flex items-center gap-1 p-1 rounded cursor-pointer" 
                onClick={() => toggleSection("folders")}
                style={{ color: obsidianColors.sidebarText }}
              >
                {expandedSections.folders ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="text-sm font-medium">Folders</span>
              </div>
              
              {expandedSections.folders && (
                <div className="ml-4">
                  {folders.map((folder, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-2 p-1 rounded text-sm cursor-pointer hover:bg-opacity-30 ${i === 0 ? "bg-[obsidianColors.activeBg]" : "bg-transparent"}
    hover:bg-[obsidianColors.hoverBg] text-[obsidianColors.sidebarText]`}
                      style={{ 
                        color: obsidianColors.sidebarText,
                        backgroundColor: i === 0 ? obsidianColors.activeBg : "transparent",
                      }}
                    >
                      <Folder size={14} style={{ color: obsidianColors.sidebarIcon }} />
                      {folder}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 p-1 rounded text-sm cursor-pointer" style={{ color: obsidianColors.sidebarText }}>
                    <PlusCircle size={14} style={{ color: obsidianColors.sidebarIcon }} />
                    New folder
                  </div>
                </div>
              )}
            </div>
            
            {/* Tags Section */}
            <div className="px-2 py-1">
              <div 
                className="flex items-center gap-1 p-1 rounded cursor-pointer" 
                onClick={() => toggleSection("tags")}
                style={{ color: obsidianColors.sidebarText }}
              >
                {expandedSections.tags ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
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
                      <Hash size={14} style={{ color: obsidianColors.sidebarIcon }} />
                      {tag.substring(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-auto p-2 border-t flex items-center justify-between" style={{ borderColor: obsidianColors.border }}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleDarkMode}
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
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-2 border-b" style={{ borderColor: obsidianColors.border }}>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="mr-2 lg:hidden" style={{ color: obsidianColors.text }}>
              <Menu size={18} />
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant={currentView === "notes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("notes")}
                style={{ 
                  backgroundColor: currentView === "notes" ? obsidianColors.accent : "transparent",
                  color: currentView === "notes" ? "white" : obsidianColors.text
                }}
              >
                <FileText className="mr-1" size={14} />
                Notes
              </Button>
              <Button 
                variant={currentView === "blogs" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("blogs")}
                style={{ 
                  backgroundColor: currentView === "blogs" ? obsidianColors.accent : "transparent",
                  color: currentView === "blogs" ? "white" : obsidianColors.text
                }}
              >
                <Book className="mr-1" size={14} />
                Blogs
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4" style={{ color: obsidianColors.sidebarIcon }} />
              <Input 
                placeholder="Search..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm w-40"
                style={{ 
                  backgroundColor: obsidianColors.inputBg,
                  borderColor: obsidianColors.border,
                  color: obsidianColors.text
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Editor */}
            <Card className="mb-6 border rounded-md" style={{ 
              backgroundColor: obsidianColors.card,
              borderColor: obsidianColors.border
            }}>
              <CardContent className="p-4">
                <Input 
                  placeholder="Note title..." 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mb-3 text-lg font-medium border-0 p-0 pb-2 focus-visible:ring-0 rounded-none border-b"
                  style={{ 
                    backgroundColor: "transparent",
                    borderColor: obsidianColors.border,
                    color: obsidianColors.text
                  }}
                />
                <Textarea 
                  placeholder={`# Type your ${currentView === "notes" ? "note" : "blog post"} here\n\nUse **markdown** for formatting.\n\n- List items\n- Support links [[Internal Links]]\n- And more...`}
                  value={newNote} 
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-32 border-0 p-0 focus-visible:ring-0"
                  style={{ 
                    backgroundColor: "transparent",
                    color: obsidianColors.text,
                    fontFamily: "monospace"
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-3 border-t" style={{ borderColor: obsidianColors.border }}>
                {editingNote ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingNote({
                            id: 0,
                            title: '',
                            text: '',
                            type: '',
                            createdAt:'',
                            folder: '',
                            tags: []
                        });
                        setNewNote("");
                        setNewTitle("");
                      }}
                      style={{ 
                        borderColor: obsidianColors.border,
                        color: obsidianColors.text
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={updateNote} 
                      className="flex items-center" 
                      style={{ backgroundColor: obsidianColors.accent }}
                    >
                      <Save className="mr-1" size={14} />
                      Update
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm"
                    onClick={addNote} 
                    className="flex items-center" 
                    style={{ backgroundColor: obsidianColors.accent }}
                  >
                    <Plus className="mr-1" size={14} />
                    Create {currentView === "notes" ? "Note" : "Blog"}
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Notes Grid - Changed to a more Obsidian-like list view */}
            <div className="space-y-2">
              {filteredNotes.map((note) => (
                <Card 
                  key={note.id} 
                  className="overflow-hidden border hover:border-opacity-100 transition-all cursor-pointer" 
                  style={{ 
                    backgroundColor: obsidianColors.card,
                    borderColor: obsidianColors.border,
                    borderWidth: "1px"
                  }}
                  onClick={() => editNote(note)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-md font-medium" style={{ color: obsidianColors.text }}>{note.title}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }} style={{ color: obsidianColors.textSecondary }}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={12} style={{ color: obsidianColors.textSecondary }} />
                      <span className="text-xs" style={{ color: obsidianColors.textSecondary }}>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <Folder size={12} style={{ color: obsidianColors.textSecondary }} />
                      <span className="text-xs" style={{ color: obsidianColors.textSecondary }}>
                        {note.folder}
                      </span>
                    </div>
                    <div 
                      className="whitespace-pre-wrap text-sm line-clamp-3" 
                      style={{ color: obsidianColors.textSecondary }}
                    >
                      {note.text}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredNotes.length === 0 && (
              <div className="text-center p-8" style={{ color: obsidianColors.textSecondary }}>
                <p>No {currentView} found. Create your first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}