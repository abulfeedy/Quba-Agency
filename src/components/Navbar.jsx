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

const Navbar = ({ sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pendingScroll, setPendingScroll] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", ref: sectionRefs.home, id: "home" },
    { name: "What We Do", ref: sectionRefs.services, id: "services" },
    { name: "Our Work", ref: sectionRefs.projects, id: "projects" },
    { name: "Who we are", ref: sectionRefs.about, id: "about" },
    { name: "Clients", ref: sectionRefs.testimonials, id: "testimonials" },
  ];

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to detect active section
  useEffect(() => {
    if (!sectionRefs.allSectionsLoaded) return;

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      let topmostSection = null;
      let minTop = Infinity;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          const rect = entry.target.getBoundingClientRect();
          if (rect.top < minTop) {
            minTop = rect.top;
            topmostSection = sectionId;
          }
        }
      });

      if (topmostSection) {
        setActiveSection(topmostSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.keys(sectionRefs).forEach((key) => {
      if (key !== "allSectionsLoaded" && sectionRefs[key]?.current) {
        observer.observe(sectionRefs[key].current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  // Handle pending scroll after navigation
  useEffect(() => {
    if (location.pathname === "/" && pendingScroll && pendingScroll.current) {
      pendingScroll.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScroll(null);
    }
  }, [location.pathname, pendingScroll]);

  const scrollToSection = (ref) => {
    if (location.pathname !== "/") {
      setPendingScroll(ref);
      navigate("/");
    } else if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
            : "bg-slate-800"
        } text-white px-6 py-4 sm:px-10 sm:py-5 flex justify-between items-center`}
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div
          onClick={() => scrollToSection(sectionRefs.home)}
          className="flex items-center gap-3 cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToSection(sectionRefs.home);
            }
          }}
          aria-label="Go to homepage"
        >
          <Box
            size={36}
            className="text-purple-300 transition-transform hover:rotate-14 duration-300"
          />
          <span className="text-xl sm:text-2xl hover:rotate-2 duration-300 text-gray-300 font-extrabold tracking-tight">
            Quba <span className="text-purple-300">Agency</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <li key={link.id} role="none">
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.ref);
                }}
                className={`text-sm font-medium tracking-widest transition-all duration-300 group relative ${
                  activeSection === link.id ? "text-purple-300" : "text-gray-300"
                }`}
                role="menuitem"
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-purple-300 transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Button
            onClick={() =>
              (window.location.href =
                "mailto:qubaweb3@agency.com?subject=Let’s Work Together")
            }
            className="bg-purple-300 text-gray-800 hover:bg-purple-400 hover:text-white transition-all duration-300 font-semibold tracking-wide"
            aria-label="Send us an email to get in touch"
          >
            <Mail className="mr-2" /> Get in Touch
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center gap-4">
          <Button
            onClick={() =>
              (window.location.href =
                "mailto:qubaweb3@agency.com?subject=Let’s Work Together")
            }
            className="bg-purple-300 text-gray-800 hover:bg-purple-400 hover:text-white sm:hidden text-sm"
            size="sm"
            aria-label="Send us an email to get in touch"
          >
            <Mail className="mr-2" /> Get in Touch
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-300 hover:bg-purple-400/50"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-slate-900/80 backdrop-blur-md pl-6 border-0 text-white w-72"
            >
              <SheetTitle className="text-lg font-semibold text-gray-200 mb-4">
                Menu
              </SheetTitle>
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-8 mt-4">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.ref);
                        }}
                        className={`text-lg font-semibold uppercase transition-transform duration-300 hover:translate-x-2 ${
                          activeSection === link.id
                            ? "text-purple-300"
                            : "text-gray-200 hover:text-purple-400"
                        }`}
                        aria-current={activeSection === link.id ? "page" : undefined}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white mt-6 hidden sm:block"
                onClick={() =>
                  (window.location.href =
                    "mailto:qubaweb3@agency.com?subject=Let’s Work Together")
                }
                aria-label="Send us an email to get in touch"
              >
                Get in Touch
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
