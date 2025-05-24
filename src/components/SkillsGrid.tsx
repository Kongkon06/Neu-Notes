
import { motion } from 'framer-motion';
import { HeroIcon } from './HeroIcon.tsx';

const skills = [
  // Frontend
  { name: 'React', icon: 'CodeBracketIcon', proficiency: 'Advanced' },
  { name: 'TypeScript', icon: 'CommandLineIcon', proficiency: 'Expert' },
  { name: 'JavaScript (ES6+)', icon: 'CodeBracketIcon', proficiency: 'Advanced' },
  { name: 'HTML5', icon: 'DocumentIcon', proficiency: 'Advanced' },
  { name: 'CSS3', icon: 'PaintBrushIcon', proficiency: 'Advanced' },
  { name: 'TailwindCSS', icon: 'PaintBrushIcon', proficiency: 'Expert' },
  { name: 'Next.js', icon: 'RocketLaunchIcon', proficiency: 'Intermediate' },

  // Backend
  { name: 'Node.js', icon: 'CpuChipIcon', proficiency: 'Advanced' },
  { name: 'Express.js', icon: 'ServerIcon', proficiency: 'Advanced' },
  { name: 'C', icon: 'TerminalIcon', proficiency: 'Intermediate' },
  { name: 'C++', icon: 'TerminalIcon', proficiency: 'Intermediate' },

  // Databases
  { name: 'PostgreSQL', icon: 'DatabaseIcon', proficiency: 'Intermediate' },
  { name: 'MongoDB', icon: 'DatabaseIcon', proficiency: 'Intermediate' },
  { name: 'Redis', icon: 'DatabaseIcon', proficiency: 'Intermediate' },

  // DevOps & Tools
  { name: 'Docker', icon: 'CubeIcon', proficiency: 'Intermediate' },
  { name: 'Git', icon: 'GitHubIcon', proficiency: 'Advanced' },
  { name: 'Postman', icon: 'PaperAirplaneIcon', proficiency: 'Intermediate' },
  { name: 'Neovim', icon: 'TerminalIcon', proficiency: 'Intermediate' },
  { name: 'Visual Studio', icon: 'DesktopComputerIcon', proficiency: 'Intermediate' },

  // Other
  { name: 'WebSockets', icon: 'WifiIcon', proficiency: 'Intermediate' },
  { name: 'Electron.js', icon: 'DesktopComputerIcon', proficiency: 'Intermediate' },
];

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-lg"
        >
          <HeroIcon icon={skill.icon} className="h-8 w-8 text-purple-400" />
          <div>
            <h3 className="font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-400">{skill.proficiency}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

