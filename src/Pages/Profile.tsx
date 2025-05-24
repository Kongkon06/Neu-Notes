// Main page (page.tsx)
import { motion } from 'framer-motion';
import { Appbar } from "../components/TopBar.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { SkillsGrid } from "../components/SkillsGrid.tsx";
import { ContactForm } from "../components/ContactForm.tsx";
import { HeroIcon } from '../components/HeroIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
const projects = [
  {
    title: 'My Tasks',
    description: 'A productive app to manage daily tasks efficiently.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: 'My_task Dashboard.png',
    link: 'https://my-taskv2.vercel.app/',
  },
  {
    title: 'Grocery Store Manager',
    description: 'An ERP solution for managing grocery store inventory and sales.',
    tech: ['React', 'Express', 'SQlite', 'Electron'],
    image: '/Groccery Manager.png',
    link: 'https://mytasks.example.com',
  },
  {
    title: "Centre's Official Website",
    description:
      'Participated in the development and maintenance cycle of the Centre’s official website with a focus on frontend design and implementation.',
    tech: ['HTML', 'CSS', 'TailwindCSS', 'JavaScript'],
    image: '/Center CCSA.png',
    link: 'https://ccsdu.in',
  },
  {
    title: 'Media Musse',
    description: 'Developed a niche e-commerce site featuring musical instruments.',
    tech: ['Next.js', 'TailwindCSS', 'PostgreSQL'],
    image: '/Media Muse.png',
    link: 'https://media-musse.vercel.app/',
  },
  {
    title: 'Suffle Play',
    description: 'Created a real-time system allowing users to collaboratively manage a music queue.',
    tech: ['React', 'WebSockets', 'Node.js', 'PostgreSQL'],
    image: '/Suffle Play.png', // add image path if available
    link: 'https://suffle-play.vercel.app/',
  },
];
 const handleClick = () => {
    const now = Date.now();

    // If last click was more than 3 seconds ago, reset
    if (!lastClickTimeRef.current || now - lastClickTimeRef.current > 3000) {
      setClickCount(1); // Start fresh
    } else {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          navigate('/admin');
        }
        return newCount;
      });
    }

    lastClickTimeRef.current = now;

    // Optional: reset click count after 3s of inactivity
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setClickCount(0);
      lastClickTimeRef.current = null;
    }, 3000);
  };
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100">
      <Appbar  />
      
      {/* Home Section */}
     
<section id="profile" className="pt-20 md:pt-24 px-4 md:px-8 lg:px-16 min-h-screen flex items-center">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
  >
    <div className="md:w-2/3 space-y-6 w-full">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
        Kongkon Bora
      </h1>
      <h2 className="text-2xl md:text-3xl text-gray-400">
        MERN Stack Developer & Student at Dibrugarh University
      </h2>
      <p className="text-lg text-gray-300">
        I’m a 19-year-old full stack developer building productive and scalable web applications. I've worked on todo apps, payroll systems, HR modules, ERP solutions, and grocery store management systems. Currently exploring AI, Android, and machine learning in personal projects.
      </p>
    </div>
    <div className="md:w-1/3 flex justify-center">
     <div
      onClick={handleClick}
      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/20 cursor-pointer"
    >
      <img
        src="https://i.pinimg.com/736x/3b/7e/0b/3b7e0b367479131cb6e5a255ad21d557.jpg"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
    </div>
  </motion.div>
</section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-800/50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Projects</h2>
    
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
        el: '.swiper-pagination',
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      className="relative"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <ProjectCard
            title={project.title}
            description={project.description}
            tech={project.tech}
            image={project.image}
            link={project.link}
          />
        </SwiperSlide>
      ))}

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-next !text-purple-400 after:hidden !w-12 !h-12 !rounded-full !bg-gray-800/50 hover:!bg-purple-500/20 !backdrop-blur-lg"></div>
      <div className="swiper-button-prev !text-purple-400 after:hidden !w-12 !h-12 !rounded-full !bg-gray-800/50 hover:!bg-purple-500/20 !backdrop-blur-lg"></div>
      
      {/* Custom Pagination */}
      <div className="swiper-pagination !relative !mt-8 !bottom-0 [&>.swiper-pagination-bullet]:!bg-gray-600 [&>.swiper-pagination-bullet-active]:!bg-purple-400"></div>
    </Swiper>
  </div>
</section>
      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Technical Skills</h2>
          <SkillsGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <HeroIcon icon="MailIcon" className="w-8 h-8 text-purple-400" />
                <span className="text-lg">contact@johndoe.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
