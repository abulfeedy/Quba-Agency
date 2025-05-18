import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("All");

  const filters = [
    "All",
    "Websites",
    "Bots",
    "Memes",
    "Marketing",
    "Moderation",
    "Content",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.services.includes(filter));

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section className='py-16 h-screen bg-gray-900 text-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-4'>Our Work</h2>
        <p className='text-lg text-center text-gray-300 mb-8'>
          Explore the websites, bots, and memes we’ve built to power Web3’s most
          exciting projects.
        </p>

        {/* Filter Bar */}
        <div className='flex flex-wrap justify-center gap-2 mb-8 sticky top-0 z-10 py-4'>
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              className={`${
                filter === f
                  ? "bg-black text-white"
                  : "border-neon-purple text-black"
              } hover:bg-gray-700 hover:text-white`}
              onClick={() => setFilter(f)}>
              {f}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='flex w-auto -ml-2.5'
          columnClassName='pl-2.5'>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`mb-2.5 break-inside-avoid ${
                project.height === "large"
                  ? "h-[400px]"
                  : project.height === "medium"
                  ? "h-[300px]"
                  : "h-[200px]"
              }`}>
              <div className='relative group rounded-md overflow-hidden border border-neon-purple hover:ring-2 hover:ring-neon-purple shadow-sm transition-transform hover:scale-105'>
                {/* Thumbnail */}
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />

                {/* Hover Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4'>
                  <h3 className='text-lg font-bold'>{project.name}</h3>
                  <div className='flex flex-wrap gap-1 my-2'>
                    {project.services.map((service) => (
                      <Badge
                        key={service}
                        className='bg-purple-500 text-black font-orbitron'>
                        {service}
                      </Badge>
                    ))}
                  </div>
                  {project.stat && (
                    <p className='text-sm text-white'>{project.stat}</p>
                  )}
                  <Button
                    variant='outline'
                    className='mt-2 border-purple-500 text-black hover:bg-purple-600 hover:text-white'
                    asChild>
                    <a href={project.caseStudyUrl}>View Case Study</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default PortfolioGrid;
