import { useEffect, useRef, Suspense, lazy } from "react";
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AboutUsSection = lazy(() => import("@/components/AboutUsSection"));
const OurWorkSection = lazy(() => import("@/components/OurWorkSection"));
const TestimonialSection = lazy(() =>
  import("@/components/TestimonialSection")
);
const WhatWeDoSection = lazy(() => import("@/components/WhatWeDoSection"));
const FooterSection = lazy(() => import("@/components/Footer"));
import Cube from "/cube.svg"

const Home = ({ onSectionRefs }) => {
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    projects: useRef(null),
    about: useRef(null),
    testimonials: useRef(null),
  };

  useEffect(() => {
    onSectionRefs(sectionRefs);
  }, [onSectionRefs]);

  return (
    <main>
      <Suspense fallback={
  <div className="fixed inset-0 flex items-center justify-center bg-slate-800">
      <img src={Cube} alt="Loading..." className="w-12 h-12 animate-spin" />
    </div>
  }
> 
        <div ref={sectionRefs.home } data-section='home'>
          <HeroSection />
        </div>
        <div ref={sectionRefs.services} data-section='services'>
          <WhatWeDoSection />
        </div>
        <div ref={sectionRefs.projects} data-section='projects'>
          <OurWorkSection />
        </div>
        <div ref={sectionRefs.about} data-section='about'>
          <AboutUsSection />
        </div>
        <div ref={sectionRefs.testimonials} data-section='testimonials'>
          <TestimonialSection />
        </div>
        <FooterSection />
      </Suspense>
    </main>
  );
};

export default Home;
