// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Placeholder image (replace with your actual image)
import AboutImage from "@/assets/images/about.jpg";
import LineChart from "@/components/LineChart";

const AboutUsSection = () => {
  // Framer Motion Variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className='relative px-4 sm:px-6 lg:px-8 text-white py-16 sm:py-20 overflow-hidden'>
      {/* Main Content */}
      <div className='container px-4 sm:px-6 lg:px-8 grid rid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12'>
        {/* Left Column: Text Content */}
        <motion.div
          className='sm:max-w-[470px] text-left lg:text-left lg:order-1'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={textVariants}>
          <div className='bg-slate-600/50 text-sm mb-4 inline-block p-2 rounded-xl'>
            <span>About Us</span>
          </div>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4'>
            We’re Quba, <br />
            <span className='text-purple-300'>Pioneering Web3 Innovation</span>
          </h2>
          <p className='text-gray-400 text-sm sm:text-base mb-4'>
            We’re the builders behind the bold, a team of forward-thinkers
            turning ideas into impactful digital experiences. From Web
            Development and UI/UX Design to viral memes, Web3 tools, and AI
            platforms, we craft with quality, innovate with intent, and add just
            the right dose of Web3 edge.
          </p>
          <p className='text-gray-400 text-sm sm:text-base mb-6'>
            Every line of code, every pixel, and every clever meme is designed
            to help your project stand out and succeed.
          </p>
          <motion.div
            variants={textVariants}
            whileHover='hover'
            hover={buttonHoverVariants}>
            <Button
              variant='default'
              className='bg-purple-300 hover:bg-purple-400 text-black font-semibold sm:mt-16 py-3 px-6 rounded-md hover:cursor-pointer transition-all duration-300'>
              Hire Us
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className='order-1 lg:order-2 flex flex-col justify-center relative'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={imageVariants}>
          <img
            src={AboutImage}
            alt='About Quba Agency'
            className='w-full sm:w-80 lg:w-[450px] object-cover h-[500px] rounded-lg shadow-md'
            loading='lazy'
          />
          <div className='absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 md:top-4 md:-left-12 lg:top-6 lg:-left-16 xl:top-8 xl:-left-20 md:shadow-lg shadow-accent-foreground bg-purple-100 pt-5 md:pt-3 rounded-lg h-[100px] max-w-[200px]'>
            <LineChart />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
