import { useState, useEffect } from "react";
import { Box, Menu, X, Mail} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = ({ sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isReady, setIsReady] = useState(false); // Track when sections are ready

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "What We Do", id: "services" },
    { name: "Our Work", id: "projects" },
    { name: "Who we are", id: "about" },
    { name: "Clients", id: "testimonials" },
  ];

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// Scroll Function
  const scrollToSection = (id) => {
    const ref = sectionRefs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
          : "bg-slate-800"
      } text-white px-6 py-4 sm:px-10 sm:py-5 flex justify-between items-center`}>
      {/* Logo Section */}
      <div
        onClick={(e) => {
              e.preventDefault();
              scrollToSection(sectionRefs.home);
            }}
        className='flex items-center gap-3'>
        <Box
          size={36}
          className='text-purple-300 transition-transform hover:cursor-pointer hover:rotate-14 duration-300'
        />
        <span className='text-xl sm:text-2xl hover:rotate-2 hover:cursor-pointer duration-300 text-gray-300 font-extrabold tracking-tight'>
          Quba <span className='text-purple-300'>Agency</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden lg:flex items-center gap-8'>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href='#'
            onClick={() => {      
              scrollToSection(link.id);
            }}
            className={`text-sm font-medium tracking-widest transition-all duration-300 group relative ${
              activeSection === link.id ? "text-purple-300" : "text-gray-300"
            }`}>
            {link.name}
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-purple-300 transition-all duration-300 ${
                activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Desktop Button */}
      <div className='hidden lg:block'>
        <Button
          onClick={() => window.location.href = "mailto:qubaweb3@agency.com?subject=Let’s Work Together"}
          className='bg-purple-300 text-gray-800 hover:bg-purple-400 hover:text-white transition-all duration-300 font-semibold tracking-wide'
          >
          <Mail /> Get in Touch
        </Button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='lg:hidden flex items-center gap-4'>
        <Button
          onClick={() => window.location.href = "mailto:qubaweb3@agency.com?subject=Let’s Work Together"}
          className='bg-purple-300 text-gray-800 hover:bg-purple-400 hover:text-white sm:hidden text-sm'
          size='sm'
          >
          <Mail /> Get in Touch
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='text-purple-300 hover:bg-purple-400/50'
              aria-label='Toggle menu'>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </SheetTrigger>
          <SheetContent
            side='right'
            className='bg-slate-900/80 backdrop-blur-md pl-6 border-0 text-white w-72'>
            <div className='flex flex-col gap-8 mt-12'>
              <SheetTitle className='text-lg font-semibold text-gray-200 mb-4'>
                Menu
              </SheetTitle>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.ref);
                  }}
                  className={`text-lg font-semibold uppercase transition-transform duration-300 hover:translate-x-2 ${
                    activeSection === link.id
                      ? "text-purple-300"
                      : "text-gray-200 hover:text-purple-400"
                  }`}>
                  {link.name}
                </a>
              ))}
              <Button
                variant='outline'
                className='border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white mt-6 hidden sm:block'
                onClick={() => {
                  scrollToSection(sectionRefs.contact);
                  setIsOpen(false);
                }}>
                Get in Touch
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
