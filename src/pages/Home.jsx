import { useEffect, useRef, Suspense, lazy } from "react";
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AboutUsSection = lazy(() => import("@/components/AboutUsSection"));
const OurWorkSection = lazy(() => import("@/components/OurWorkSection"));
const TestimonialSection = lazy(() =>
  import("@/components/TestimonialSection")
);
const WhatWeDoSection = lazy(() => import("@/components/WhatWeDoSection"));

const Home = ({ onSectionRefs }) => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const sectionRefs = {
      home: heroRef,
      about: aboutRef,
      services: servicesRef,
      projects: projectsRef,
      testimonials: testimonialsRef,
    };
    onSectionRefs(sectionRefs);
  }, [onSectionRefs]);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <div ref={heroRef} data-section='home'>
          <HeroSection />
        </div>
        <div ref={servicesRef} data-section='services'>
          <WhatWeDoSection />
        </div>
        <div ref={projectsRef} data-section='projects'>
          <OurWorkSection />
        </div>
        <div ref={aboutRef} data-section='about'>
          <AboutUsSection />
        </div>
        <div ref={testimonialsRef} data-section='testimonials'>
          <TestimonialSection />
        </div>
      </Suspense>
    </main>
  );
};

export default Home;
