import { useCallback, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import NotFound from "@/pages/Notfound";

const App = () => {
  const [sectionRefs, setSectionRefs] = useState({});
  const [targetSection, setTargetSection] = useState(null);

  const handleSectionRefs = useCallback((refs) => {
    setSectionRefs(refs);
  }, []);

  return (
    <div className='bg-gray-800 min-h-screen flex flex-col font-inter'>
      <Navbar sectionRefs={sectionRefs} setTargetSection={setTargetSection} />
      <motion.main
        className='flex-grow container mt-5 sm:mt-0 mx-auto py-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                onSectionRefs={handleSectionRefs}
                targetSection={targetSection}
                footerSectionRefs={sectionRefs}
                setTargetSection={setTargetSection}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </motion.main>
    </div>
  );
};

export default App;
