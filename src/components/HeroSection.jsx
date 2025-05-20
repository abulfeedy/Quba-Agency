import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import { Link } from "react-router-dom";
import {
  TbBrandTelegram,
  TbBrandFacebook,
  TbBrandDiscord,
} from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import Hero from "@/assets/images/hero.webp";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HeroSection = () => {
  const stats = [
    { value: "6+", label: "Years of Experience" },
    { value: "25+", label: "Team members" },
    { value: "20+", label: "Completed Projects" },
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const statVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 1, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const circleVariants = {
    animate: {
      opacity: [0.2, 0.4, 0.2],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  };

  return (
    <section className='relative text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden'>
      {/* Background Circle Shape */}
      <motion.div
        className='absolute top-0 right-0 w-1/2 h-1/2 bg-purple-400/20 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4'
        variants={circleVariants}
        animate='animate'
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10'>
        {/* Left Side: Text Content */}
        <motion.div
          className='max-w-lg text-center lg:text-left order-2 lg:order-1'
          initial='hidden'
          animate='visible'
          variants={textVariants}>
          <motion.p
            className='text-gray-400 text-sm sm:text-base mb-2 tracking-wide'
            variants={textVariants}>
            Hello, Welcome
          </motion.p>
          <motion.h1
            className='text-4xl sm:text-4xl lg:text-4xl font-extrabold leading-tight mb-4'
            variants={textVariants}>
            We're Quba <br />
            <span className='text-purple-300'>Web3 Agency</span>
          </motion.h1>
          <motion.div variants={textVariants}>
            <Button
              variant='default'
              className='bg-purple-300 cursor-pointer hover:bg-purple-400 hover:text-white text-gray-800 font-semibold py-2 px-6 rounded-md transition-all duration-300'>
              Hire Us
            </Button>
          </motion.div>
          <motion.div
            className='flex gap-3 items-start text-gray-400 mb-6 mt-8 sm:mt-14 mx-auto lg:mx-0'
            variants={textVariants}>
            <Gem size={20} className='flex-shrink-0 text-purple-200' />
            <p className='text-sm sm:text-base max-w-xs sm:max-w-sm'>
              We craft sleek & modern Web3 solutions, from dynamic websites to
              custom Telegram bots and viral memes that drive projects forward
            </p>
          </motion.div>

          <motion.div
            className='flex items-center justify-center lg:justify-start gap-3 text-gray-300 mt-8 sm:mt-14'
            variants={textVariants}>
            <span className='text-white text-sm sm:text-base'>Follow us</span>
            {[
              { Icon: TbBrandTelegram, link: "#" },
              { Icon: BsTwitterX, link: "#" },
              { Icon: TbBrandFacebook, link: "#" },
              { Icon: TbBrandDiscord, link: "#" },
            ].map((social, index) => (
              <motion.div
                key={index}
                className='bg-slate-700/50 rounded-full p-2'
                custom={index}
                initial='hidden'
                animate='visible'
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3, ease: "easeOut" },
                  color: "#d9a3dc",
                }}
                variants={iconVariants}>
                <Link
                  to={social.link}
                  aria-label={`Follow on ${social.Icon.name}`}>
                  <social.Icon className='w-4 h-4' />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Image and Stats */}
        <motion.div
          className='order-1 lg:order-2 flex justify-center'
          initial='hidden'
          animate='visible'
          variants={imageVariants}>
          <img
            src={Hero}
            alt='Hero logo'
            className='w-64 sm:w-80 lg:w-auto max-w-full h-auto'
          />
        </motion.div>
        <div className='flex flex-col gap-6 sm:gap-8 order-3'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className='text-center group relative'
              custom={index}
              initial='hidden'
              animate='visible'
              variants={statVariants}>
              <h3 className='text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300'>
                {stat.value}
              </h3>
              <p className='text-gray-400 text-sm sm:text-base tracking-wider'>
                {stat.label}
              </p>
              <div className='absolute left-1/2 -translate-x-1/2 top-1/2 w-1 h-1 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:-left-4 lg:translate-x-0' />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
