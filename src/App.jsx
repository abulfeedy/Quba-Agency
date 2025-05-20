import { lazy, Suspense, useCallback, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import NotFound from "@/pages/Notfound";

const App = () => {
  const [sectionRefs, setSectionRefs] = useState({});
  const location = useLocation();

  const handleSectionRefs = useCallback((refs) => {
    setSectionRefs(refs);
  }, []);

  // Reset sectionRefs on route change
  useEffect(() => {
    setSectionRefs({});
  }, [location.pathname]);
  
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col font-inter'>
      <Navbar sectionRefs={sectionRefs} />
        <motion.main
          className='flex-grow container mt-5 sm:mt-0 mx-auto py-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <Routes>
            <Route
              path='/'
              element={<Home onSectionRefs={handleSectionRefs} />}
            />
            <Route
              path="*" 
              element={<NotFound />} />
          </Routes>
        </motion.main>
      
    </div>
  );
};

export default App;
