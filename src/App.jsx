import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Spinner from "./components/01_atoms/Spinner";
import Footer from "./components/03_organisms/Footer";
import Navbar from "./components/03_organisms/Navbar";
import MobileNavbar from "./components/03_organisms/MobileNavbar";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 810px)").matches);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 810px)").matches);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const triggerHeight = 70;
      setIsVisible(currentScroll > triggerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        {isVisible && (isMobile ? <MobileNavbar /> : <Navbar />)}
        <Routes />
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
