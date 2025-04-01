import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; 
import tailwindcss from '@tailwindcss/vite';// If using React

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    outDir: "dist",
  },
});
