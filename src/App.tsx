import { Routes,BrowserRouter,Route } from 'react-router-dom'
import Home from './Pages/Home.tsx';
import './App.css'
import { RecoilRoot } from 'recoil';
import Folder from './Pages/Folder.tsx'
import { useSelector } from 'react-redux';
import { Sidebar } from './Pages/Sidebar.tsx';
function App() {
  const darkMode = useSelector((state: any) => state.darkMode.value);
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
  <RecoilRoot>
   <div className="flex h-screen overflow-hidden" style={{ backgroundColor: obsidianColors.background, color: obsidianColors.text }}>
    <Sidebar/>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/folder' element={<Folder/>}/>
  </Routes>
  </BrowserRouter>
  </div></RecoilRoot>)
}

export default App
