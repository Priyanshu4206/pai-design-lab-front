import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Spinner from "./components/01_atoms/Spinner";
import Footer from "./components/03_organisms/Footer";
import HeroNavbar from "./components/03_organisms/HeroNavbar";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <HeroNavbar />
        <Routes />
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
