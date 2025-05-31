import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = ({ sectionRefs, setTargetSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", ref: sectionRefs.home, id: "home" },
    { name: "What We Do", ref: sectionRefs.services, id: "services" },
    { name: "Our Work", ref: sectionRefs.projects, id: "projects" },
    { name: "Who we are", ref: sectionRefs.about, id: "about" },
    { name: "Clients", ref: sectionRefs.testimonials, id: "testimonials" },
  ];

  // Handle glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px",
      threshold: 0.1, // Trigger when 10% of the section is in view
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref?.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  // Scroll to section after navigation
  const scrollToSection = (ref, sectionId) => {
    if (location.pathname !== "/") {
      setTargetSection(sectionId);
      navigate("/");
    } else if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
            : "bg-slate-800"
        } text-white px-6 py-4 sm:px-10 sm:py-5 flex justify-between items-center`}
        aria-label='Main navigation'>
        {/* Logo Section */}
        <div
          onClick={() => scrollToSection(sectionRefs.home, "home")}
          className='flex items-center gap-3 cursor-pointer'
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToSection(sectionRefs.home, "home");
            }
          }}
          aria-label='Go to homepage'>
          <Box
            size={36}
            className='text-purple-300 transition-transform hover:rotate-14 duration-300'
          />
          <span className='text-xl sm:text-2xl hover:rotate-2 duration-300 text-gray-300 font-extrabold tracking-tight'>
            Quba <span className='text-purple-300'>Agency</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex items-center gap-8' role='menubar'>
          {navLinks.map((link) => (
            <li key={link.id} role='none'>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.ref, link.id);
                }}
                className={`text-sm font-medium tracking-widest transition-all duration-300 group relative ${
                  activeSection === link.id
                    ? "text-purple-300"
                    : "text-gray-300"
                }`}
                role='menuitem'
                aria-current={activeSection === link.id ? "page" : undefined}>
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-purple-300 transition-all duration-300 ${
                    activeSection === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className='hidden lg:block'>
          <Button
            onClick={() =>
              (window.location.href =
                "mailto:contact@qubaagency.com?subject=General%20Inquiry&body=Hi%20there%2C%0A%0AI%20wanted%20to%20reach%20out%20regarding%20...%0A%0ARegards%2C%0A[Your%20Name]")
            }
            className='bg-purple-300 text-gray-800 hover:bg-purple-400 cursor-pointer hover:text-white transition-all duration-300 font-semibold tracking-wide'
            aria-label='Send us an email to get in touch'>
            <Mail className='mr-2' /> Get in Touch
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className='lg:hidden flex items-center gap-4'>
          <Button
            onClick={() =>
              (window.location.href =
                "mailto:contact@qubaagency.com?subject=General%20Inquiry&body=Hi%20there%2C%0A%0AI%20wanted%20to%20reach%20out%20regarding%20...%0A%0ARegards%2C%0A[Your%20Name]")
            }
            className='bg-purple-300 text-gray-800 cursor-pointer hover:bg-purple-400 hover:text-white sm:hidden text-sm'
            size='sm'
            aria-label='Send us an email to get in touch'>
            <Mail className='mr-2' /> Get in Touch
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-purple-300 hover:bg-purple-400/50'
                aria-label={isOpen ? "Close menu" : "Open menu"}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='bg-slate-900/80 backdrop-blur-md pl-6 border-0 text-white w-72'>
              <SheetTitle className='text-lg font-semibold text-gray-200 mb-4'>
                Menu
              </SheetTitle>
              <nav aria-label='Mobile navigation'>
                <ul className='flex flex-col gap-8 mt-4'>
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.ref, link.id);
                        }}
                        className={`text-lg font-semibold uppercase transition-transform duration-300 hover:translate-x-2 ${
                          activeSection === link.id
                            ? "text-purple-300"
                            : "text-gray-200 hover:text-purple-400"
                        }`}
                        aria-current={
                          activeSection === link.id ? "page" : undefined
                        }>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button
                variant='outline'
                className='border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white mt-6 hidden sm:flex mr-5'
                onClick={() =>
                  (window.location.href =
                    "mailto:contact@qubaagency.com?subject=General%20Inquiry&body=Hi%20there%2C%0A%0AI%20wanted%20to%20reach%20out%20regarding%20...%0A%0ARegards%2C%0A[Your%20Name]")
                }
                aria-label='Send us an email to get in touch'>
                <Mail /> Get in Touch
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
