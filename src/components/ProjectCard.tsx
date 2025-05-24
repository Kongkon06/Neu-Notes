import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export function ProjectCard({ title, description, tech, image, link }: ProjectCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-lg"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div role='button' 
            onClick={() => window.open(link, "_blank")}
             className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-400">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-400"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
