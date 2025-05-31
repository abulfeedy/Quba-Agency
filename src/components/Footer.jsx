// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import {
  TbBrandTelegram,
  TbBrandFacebook,
  TbBrandDiscord,
} from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";

const FooterSection = ({ footerSectionRefs, setTargetSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to section after navigation
  const scrollToSection = (ref, sectionId) => {
    if (location.pathname !== "/") {
      setTargetSection(sectionId);
      navigate("/");
    } else if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    { name: "Telegram", Icon: TbBrandTelegram, link: "https://t.me/qubagency" },
    { name: "Twitter", Icon: BsTwitterX, link: "#" },
    { name: "Facebook", Icon: TbBrandFacebook, link: "#" },
    { name: "Discord", Icon: TbBrandDiscord, link: "#" },
  ];

  const navLinks = [
    { name: "Home", ref: footerSectionRefs.home, id: "home" },
    { name: "What We Do", ref: footerSectionRefs.services, id: "services" },
    { name: "Our Work", ref: footerSectionRefs.projects, id: "projects" },
    { name: "Who we are", ref: footerSectionRefs.about, id: "about" },
    {
      name: "Clients",
      ref: footerSectionRefs.testimonials,
      id: "testimonials",
    },
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
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.ref, link.id);
                    }}
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
              <li>Email: partners@qubaagency.com</li>
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
                  href={social.link}
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
              onClick={() =>
                (window.location.href =
                  "mailto:contact@qubaagency.com?subject=General%20Inquiry&body=Hi%20there%2C%0A%0AI%20wanted%20to%20reach%20out%20regarding%20...%0A%0ARegards%2C%0A[Your%20Name]")
              }
              className='bg-purple-300 hover:bg-purple-400 hover:text-white cursor-pointer text-gray-800 font-semibold py-2 px-4 rounded-md transition-all duration-300'>
              <Mail /> Get in Touch
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
