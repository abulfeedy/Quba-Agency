import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the JSON file
import projectsData from "@/data/projects.json";
import { ExternalLink } from "lucide-react";

// Memoized Project Card Component
const ProjectCard = React.memo(({ project, index, onClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" }, // Reduced delay for smoother transitions
    },
  };

  return (
    <DialogTrigger asChild>
      <motion.div
        className='relative rounded-lg overflow-hidden shadow-md cursor-pointer'
        custom={index}
        initial='hidden'
        whileInView='visible'
        whileHover='hover'
        viewport={{ once: true }}
        variants={cardVariants}
        onClick={() => onClick(project)}>
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className='w-full h-48 sm:h-56 lg:h-64 object-cover object-top' // Added object-top
          loading='lazy'
        />
        {/* Badge */}
        <Badge className='bg-purple-300 absolute top-4 right-4 text-gray-800 text-xs uppercase tracking-wider'>
          {project.tag}
        </Badge>
        {/* Title */}
        <div className='absolute bottom-4 right-4 left-4 flex items-center justify-between py-3 px-4 bg-white shadow-lg backdrop-blur-3xl rounded-xl'>
          <h3 className='text-sm sm:text-base font-semibold text-black hover:text-purple-400'>
            {project.title}
          </h3>{" "}
          <ExternalLink
            size={30}
            className='text-black hover:cursor-pointer hover:text-purple-400'
          />
        </div>
      </motion.div>
    </DialogTrigger>
  );
});

const OurWorkSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Framer Motion Variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className='relative bg-gradient-to-br from-slate-900 to-slate-800 px-4 sm:px-6 lg:px-8 text-white py-16 sm:py-20 overflow-hidden'>
      {/* Headline and Description */}
      <motion.div
        className='mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={textVariants}>
        <div className='bg-slate-800 text-sm mb-4 inline-block p-2 rounded-xl'>
          <span>Our Projects</span>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl leading-10 font-bold'>
            Projects That Speak for Themselves
          </h2>
          <p className='text-gray-400 text-sm sm:text-base leading-6'>
            We are a proven top Web3 agency, with an impressive track record of
            building solutions in the space. Here are a few of our recent
            projects that showcase our expertise in building Web3 solutions,
            from memecoin websites to viral memes.
          </p>
        </div>
      </motion.div>

      {/* Tabs and Project Cards */}
      <div className='container mx-auto mb-8 px-4 sm:px-6 lg:px-8'>
        <Tabs defaultValue='recent' className='w-full'>
          <TabsList className='flex flex-wrap justify-center sm:justify-start gap-2 bg-transparent mb-8'>
            {Object.keys(projectsData).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className='px-4 py-2 rounded-full text-sm font-medium text-gray-300 bg-slate-800/50 data-[state=active]:bg-purple-300 data-[state=active]:text-gray-800 transition-all duration-300 capitalize'>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(projectsData).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                {projectsData[tab].map((project, index) => (
                  <Dialog key={`${tab}-${index}`}>
                    <ProjectCard
                      project={project}
                      index={index}
                      onClick={setSelectedProject}
                    />
                    {selectedProject && (
                      <DialogContent className='bg-slate-800 text-white border-0 rounded-lg shadow-lg max-w-md sm:max-w-lg p-6 sm:p-8'>
                        <motion.div
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          variants={modalVariants}>
                          <DialogHeader>
                            <DialogTitle className='text-xl sm:text-2xl font-bold'>
                              {selectedProject.title}
                            </DialogTitle>
                            <DialogDescription className='text-gray-400 text-sm sm:text-base'>
                              <Badge className='bg-purple-300 text-gray-800 text-xs uppercase tracking-wider mb-2'>
                                {selectedProject.tag}
                              </Badge>
                              <span className='mt-2 block'>
                                {selectedProject.description}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className='mt-4'>
                            <h4 className='font-semibold mb-2'>Tech Stack</h4>
                            <ul className='flex flex-wrap gap-2'>
                              {selectedProject.techStack.map(
                                (tech, techIndex) => (
                                  <li
                                    key={techIndex}
                                    className='bg-slate-700 text-gray-300 text-xs sm:text-sm px-3 py-1 rounded-full'>
                                    {tech}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          {selectedProject.link && (
                            <motion.div
                              className='mt-6 flex'
                              whileHover='hover'
                              variants={buttonHoverVariants}>
                              <Button
                                variant='default'
                                className='bg-purple-300 ml-auto hover:bg-purple-400 text-gray-900 font-semibold inline-block py-2 px-4 rounded-md transition-all duration-300'
                                asChild>
                                <a
                                  href={selectedProject.link}
                                  target='_blank'
                                  rel='noopener noreferrer'>
                                  View Project
                                </a>
                              </Button>
                            </motion.div>
                          )}
                        </motion.div>
                      </DialogContent>
                    )}
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default OurWorkSection;
