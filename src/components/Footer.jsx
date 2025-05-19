// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail } from 'lucide-react';
import {
  TbBrandTelegram,
  TbBrandFacebook,
  TbBrandDiscord,
} from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";

const FooterSection = () => {
  // Framer Motion Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const linkHoverVariants = {
    hover: { scale: 1.1, color: "#9333ea", transition: { duration: 0.3 } },
  };

  const socialHoverVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  const socialLinks = [
    { name: "Telegram", Icon: TbBrandTelegram, link: "#" },
    { name: "Twitter", Icon: BsTwitterX, link: "#" },
    { name: "Facebook", Icon: TbBrandFacebook, link: "#" },
    { name: "Discord", Icon: TbBrandDiscord, link: "#" },
  ];

  const navLinks = [
    { name: "Home" },
    { name: "What We Do" },
    { name: "Our Work" },
    { name: "Who we are" },
    { name: "Clients" }, 
  ];

  return (
    <footer className='relative text-white pt-26 overflow-hidden text-sm'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8'>
          {/* Brand Section */}
          <motion.div
            className='text-center sm:text-left'
            custom={0}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}>
            <h3 className='text-xl font-bold mb-4'>Quba Agency</h3>
            <p className='text-gray-400 text-sm'>
              Pioneering Web3 innovation with stunning websites, Telegram bots,
              and viral memes for your project’s success.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className='text-center sm:text-left'
            custom={1}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#" 
                    className='text-gray-300 hover:text-purple-400 text-sm'
                    variants={linkHoverVariants}>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className='text-center sm:text-left'
            custom={2}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}>
            <h4 className='font-semibold mb-4'>For Partnership</h4>
            <ul className='space-y-2 text-gray-400 text-sm sm:text-base'>
              <li>Email: contact@qubaagency.com</li>
            </ul>
          </motion.div>

          {/* Social Links and CTA */}
          <motion.div
            className='text-center sm:text-left'
            custom={3}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}>
            <h4 className='font-semibold mb-4'>Follow Us</h4>
            <div className='flex justify-center sm:justify-start gap-4 mb-6'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-purple-500'
                  whileHover='hover'
                  variants={socialHoverVariants}
                  aria-label={`Follow us on ${social.name}`}>
                  <social.Icon size={24} />
                </motion.a>
              ))}
            </div>
            <Button
              variant='default'
              onClick={() => window.location.href = "mailto:contact@qubaagency.com?subject=Let’s Work Together"}
              className='bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-all duration-300'
              asChild>
              <a href='/contact'><Mail /> Get in Touch</a>
            </Button>
          </motion.div>
        </div>

        {/* Separator and Copyright */}
        <motion.div
          className='mt-14 pb-5'
          custom={4}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={sectionVariants}>
          <Separator className='bg-gray-700' />
          <p className='text-center text-gray-400 text-sm mt-6'>
            © 2025 Quba Agency. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
