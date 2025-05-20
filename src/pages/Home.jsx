import { useEffect, useRef, useState, lazy, Suspense } from "react";
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AboutUsSection = lazy(() => import("@/components/AboutUsSection"));
const OurWorkSection = lazy(() => import("@/components/OurWorkSection"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const WhatWeDoSection = lazy(() => import("@/components/WhatWeDoSection"));
const FooterSection = lazy(() => import("@/components/Footer"));
import Cube from "/cube.svg";

const Home = ({ onSectionRefs }) => {
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    projects: useRef(null),
    about: useRef(null),
    testimonials: useRef(null),
  };

  const [loadedSections, setLoadedSections] = useState({
    home: false,
    services: false,
    projects: false,
    about: false,
    testimonials: false,
    footer: false,
  });

  const allSectionsLoaded = Object.values(loadedSections).every(Boolean);

  useEffect(() => {
    onSectionRefs({ ...sectionRefs, allSectionsLoaded });
  }, [onSectionRefs, allSectionsLoaded]);

  const handleSectionLoad = (section) => {
    setLoadedSections((prev) => ({ ...prev, [section]: true }));
  };

  return (
    <main>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-slate-800">
            <img
              src={Cube}
              alt="Loading..."
              className="w-12 h-12 animate-spin"
            />
          </div>
        }
      >
        <section ref={sectionRefs.home} data-section="home">
          <HeroSection onLoad={() => handleSectionLoad("home")} />
        </section>
        <section ref={sectionRefs.services} data-section="services">
          <WhatWeDoSection onLoad={() => handleSectionLoad("services")} />
        </section>
        <section ref={sectionRefs.projects} data-section="projects">
          <OurWorkSection onLoad={() => handleSectionLoad("projects")} />
        </section>
        <section ref={sectionRefs.about} data-section="about">
          <AboutUsSection onLoad={() => handleSectionLoad("about")} />
        </section>
        <section ref={sectionRefs.testimonials} data-section="testimonials">
          <TestimonialSection onLoad={() => handleSectionLoad("testimonials")} />
        </section>
        <FooterSection onLoad={() => handleSectionLoad("footer")} />
      </Suspense>
    </main>
  );
};

export default Home;
