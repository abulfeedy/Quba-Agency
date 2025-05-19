// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Bot,
  ChevronsLeftRightEllipsis,
  Frame,
  Palette,
  Server,
} from "lucide-react";
import { LuImagePlus } from "react-icons/lu";

const WhatWeDoSection = () => {
  const services = [
    {
      icon: <ChevronsLeftRightEllipsis size={40} className='text-purple-300' />,
      title: "Web3 Websites & Dapps",
      description:
        "We build sleek, user-friendly websites that bring your ideas to life. From clean landing pages to interactive dapps, we’ll build it just how you imagined..",
    },
    {
      icon: <Bot size={40} className='text-purple-300' />,
      title: "Telegram Bots",
      description:
        "Our Telegram bots engage communities and automate tasks, from trading bots to gamified experiences.",
    },
    {
      icon: <LuImagePlus size={40} className='text-purple-300' />,
      title: "High-Quality Meme Creation",
      description:
        "We design viral, high-quality memes that capture your brand’s vibe and spark conversations.",
    },
    {
      icon: <Frame size={40} className='text-purple-300' />,
      title: "Web3 Tools & Smart Contract",
      description:
        "Take your platform further with tools that make it easy for users to connect, trade, and engage without the tech headaches.",
    },
    {
      icon: <Palette size={40} className='text-purple-300' />,
      title: "UI/UX Design",
      description:
        "Designs that don’t just look good, they make sense. We keep it simple, smooth, and easy for users to navigate.",
    },
    {
      icon: <Server size={40} className='text-purple-300' />,
      title: "Backend Development",
      description:
        "Solid code, solid foundation. We build systems that work quietly behind the scenes... Reliable, secure, and ready to scale",
    },
  ];

  // Framer Motion Variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const pulseVariants = {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(168, 85, 247, 0.5)", // purple-500
        "0 0 0 10px rgba(168, 85, 247, 0.2)",
        "0 0 0 0 rgba(168, 85, 247, 0)",
      ],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className='relative text-white py-20 overflow-hidden px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Headline and Description */}
        <motion.div
          className='text-center max-w-2xl mx-auto mb-14'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={textVariants}>
          <h2 className='text-2xl text-purple-300 lg:text-3xl font-extrabold mb-5'>
            What We Do
          </h2>
          <p className='text-gray-300 text-center text-base'>
            We power up Web3 projects with smart, creative solutions, from seamless user experiences to community-driven platforms. It’s all about merging tech and creativity to make an impact. That’s what we do
          </p>
        </motion.div>

        {/* Service Cards (Single Column) */}
        <div className='flex flex-col gap-6 sm:gap-8 max-w-3xl mx-auto'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className='relative flex flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-700/30 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-lg transition-all duration-300 hover:border-gradient-to-r hover:from-purple-500 hover:to-cyan-500'
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={cardVariants}
              animate='animate'
              whileHover={{ scale: 1.02 }}
              variant={pulseVariants}>
              {/* Icon */}
              <motion.div
                className='flex-shrink-0 bg-slate-600/50 rounded-full p-2 hover:scale-110 transition-transform duration-300'
                whileHover='hover'
                variants={iconVariants}>
                {service.icon}
              </motion.div>

              {/* Text Content */}
              <div className='flex-1'>
                <h3 className='sm:text-lg font-semibold text-white mb-2'>
                  {service.title}
                </h3>
                <p className='text-gray-400 text-sm'>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
