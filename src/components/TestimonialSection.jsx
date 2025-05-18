import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "Quba Agency transformed our memecoin project with a stunning website and viral memes. Their expertise in Web3 is unmatched!",
      author: "Taif Oumar",
      role: "Founder, NOST.",
    },
    {
      quote:
        "Their meme marketing? Absolute gold. Our project went from crickets to crazy engagement in days. Highly recommend Quba for any Web3 project!",
      author: "Laura Ibezim",
      role: "COO, TradeScape",
    },
    {
      quote:
        "We needed a Web3 tool that was simple for users but powerful under the hood – they nailed it.",
      author: "Alex Brown",
      role: "Product Lead, DeFiClick",
    },
    {
      quote:
        "The UI/UX they delivered was smooth, sharp, and exactly what we envisioned. Couldn’t be happier.",
      author: "Samir Shah",
      role: "Project Manager, Zen Labs",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel: Change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
    active: {
      opacity: 1,
      scale: 1,
      x: 0,
      zIndex: 10,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    left: {
      opacity: 0.1,
      scale: 0.9,
      x: "-60%",
      zIndex: 5,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    right: {
      opacity: 0.1,
      scale: 0.9,
      x: "60%",
      zIndex: 5,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Helper to determine card position (left, active, right, hidden)
  const getCardPosition = (index) => {
    if (index === currentIndex) return "active";
    if (
      index ===
      (currentIndex - 1 + testimonials.length) % testimonials.length
    )
      return "left";
    if (index === (currentIndex + 1) % testimonials.length) return "right";
    return "hidden";
  };

  return (
    <section className='relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 sm:py-20 overflow-hidden'>
      {/* Headline and Description */}
      <motion.div
        className='text-center max-w-3xl mx-auto px-8 sm:px-12 lg:px-16 mb-12 sm:mb-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={textVariants}>
        <h2 className='text-purple-300 text-xl sm:text-2xl lg:text-3xl font-bold mb-4'>
          What Our Clients Say
        </h2>
        <p className='text-gray-400 text-sm sm:text-base'>
          Don’t just take our word for it, hear from our clients about how Quba
          Agency has helped their Web3 projects succeed.
        </p>
      </motion.div>

      {/* Testimonial Carousel */}
      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center'>
        <div className='relative w-full max-w-4xl h-64 sm:h-72 lg:h-80 flex justify-center items-center'>
          <AnimatePresence initial={false}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className='absolute flex justify-center items-center'
                initial='hidden'
                animate={getCardPosition(index)}
                variants={cardVariants}
                whileHover={index === currentIndex ? "hover" : ""}>
                <Card className='bg-slate-800/80 border border-slate-700/50 rounded-lg shadow-md w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] p-4 sm:p-6 text-center'>
                  <CardContent>
                    <p className='text-base sm:text-lg lg:text-xl text-white mb-4 italic'>
                      “{testimonial.quote}”
                    </p>
                    <p className='text-sm text-gray-400 font-semibold'>
                      {testimonial.author}
                    </p>
                    <p className='text-xs text-gray-400'>{testimonial.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Circular Indicators */}
      <div className='flex justify-center gap-2 mt-6'>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-300 scale-125" : "bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
