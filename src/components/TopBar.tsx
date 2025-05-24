import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { GithubIcon, TwitterIcon } from "lucide-react"

const GradientCard = () => (
  <svg 
  className="absolute top-0 left-0 w-full blur-xl opacity-70"
  style={{ height: '150%' }}
  preserveAspectRatio="xMidYMin slice"
  viewBox="0 0 283 290"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <filter id="abstract-noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
    <feDisplacementMap in="SourceGraphic" scale="15" />
  </filter>
  
  <g filter="url(#abstract-noise)">
    <rect width="283" height="290" fill="url(#grad1)" />
    
    <path 
      d="M120 45Q200 80 160 190Q120 300 50 240"
      stroke="url(#grad2)" 
      stroke-width="40" 
      stroke-linecap="round"
      opacity="0.4"
    />
    
    <circle cx="200" cy="130" r="75" fill="url(#grad3)" opacity="0.6" />
    
    <g transform="rotate(45 142 145)">
      <rect x="90" y="80" width="100" height="140" 
        fill="none" 
        stroke="url(#grad4)" 
        stroke-width="25"
      />
    </g>
  </g>

  <defs>
    <radialGradient id="grad1" cx="30%" cy="40%">
      <stop offset="0%" stop-color="#0F0B3D" />
      <stop offset="100%" stop-color="#2A0049" />
    </radialGradient>

    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF1D5E" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#7D26CD" stop-opacity="0.4" />
    </linearGradient>

    <radialGradient id="grad3" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#4F00FF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#00D1FF" stop-opacity="0.1" />
    </radialGradient>

    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF00C7" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#FFEE00" stop-opacity="0.15" />
    </linearGradient>
  </defs>
</svg>);

export const Appbar = () => {
const navigate = useNavigate();
const [expanded, setExpanded] = useState(true); // Start expanded
const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

// Collapse after delay
useEffect(() => {
  const id = setTimeout(() => {
    setExpanded(false);
  }, 4000); // Collapse after 4 seconds
  setTimeoutId(id);

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}, []); // Runs once on initial render

const handleMouseEnter = useCallback(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    setTimeoutId(null);
  }
  setExpanded(true);
}, [timeoutId]);

const handleMouseLeave = useCallback(() => {
  const id = setTimeout(() => {
    setExpanded(false);
  }, 4000);
  setTimeoutId(id);
}, []);

return (
  <div
    className="fixed left-0 right-0 z-40 flex justify-center bg-transparent"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <style>{`
      .nav-bar {
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.25);
        transition:
          width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
          max-width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
          box-shadow 0.4s ease,
          opacity 0.4s ease,
          transform 0.4s ease;
      }

      .nav-bar-expanded {
        width: 85%;
        max-width: 700px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        opacity: 1;
        transform: scale(1);
      }

      .nav-bar-collapsed {
        width: 35%;
        max-width: 250px;
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
        opacity: 0.9;
        transform: scale(0.98);
      }

      .menu-hidden {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        pointer-events: none;
      }

      .menu-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        transition: opacity 0.4s ease, transform 0.4s ease;
        pointer-events: auto;
      }

      .logo-container {
        transition: all 0.6s ease;
        z-index: 1;
      }

      .nav-button {
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .nav-button::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        margin-left: 2px;
        margin-right: 2px;
        background: linear-gradient(90deg, #FCD34D, #F59E0B);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .nav-button:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .login-button {
        transition: transform 0.3s ease, filter 0.3s ease;
        z-index: 1;
      }

      .login-button:hover {
        transform: translateY(-2px) scale(1.05);
        filter: brightness(1.1);
      }

      .gradient-card-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
    `}</style>

    <nav
      className={`flex items-center font-dm-sans my-4 h-16 mx-auto p-4 rounded-2xl nav-bar ${
        expanded ? "nav-bar-expanded" : "nav-bar-collapsed"
      }`}
    >
      <div className="gradient-card-container">
        <GradientCard />
      </div>

      <div className="container relative flex items-center justify-center gap-4">
        {/* Logo */}
        <div
          role="button"
          onClick={() => navigate("/")}
          className={`logo-container ${expanded ? "relative" : "absolute"}`}
        >
          <img
            src="https://i.pinimg.com/736x/3b/7e/0b/3b7e0b367479131cb6e5a255ad21d557.jpg"
            alt="My-Tasks Logo"
            className="w-32 object-cover h-auto"
            loading="lazy"
          />
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center space-x-4 ${
            expanded ? "menu-visible" : "menu-hidden"
          }`}
        >
          {["Profile", "Skills", "Projects", "Docs", "Contact"].map((text) => {
  const sectionId = text.toLowerCase(); // 'skills', 'projects', etc.
  return (
    <a
      key={text}
      href={`#${sectionId}`}
      className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
    >
      {text}
    </a>
  );
})}        </div>

        {/* Login Buttons */}
        <div className={`flex items-center space-x-2 ${expanded ? "menu-visible" : "menu-hidden"}`}>
          <Button
            onClick={() => navigate("/signin")}
            className="login-button text-white p-2 rounded-xl font-medium hover:bg-white/10"
          >
            <TwitterIcon/>
          </Button>
          <Button
            onClick={() => window.open("https://github.com/Kongkon06", "_blank")}
            className="login-button text-white p-2 rounded-xl font-medium hover:bg-white/10"
          >
            <GithubIcon />
          </Button>
        </div>
      </div>
    </nav>
  </div>
);
 };
