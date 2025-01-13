import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import useScrollToTop from "../../hooks/useScrollToTop";
import Testimonials from './Testimonials';

const HeroPage = () => {
    useScrollToTop();
    return (
        <>
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <Testimonials />
        </>
    );
}

export default HeroPage;
