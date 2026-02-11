'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import gsap from 'gsap';

const MainContent = styled.div`
  opacity: 0; /* Hidden initially */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
`;

export default function LayoutWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const mainContentRef = useRef(null);

    const handlePreloaderComplete = () => {
        // Reveal content after preloader finishes
        if (mainContentRef.current) {
            gsap.to(mainContentRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => setIsLoading(false)
            });
        }
    };

    return (
        <>
            <Preloader onComplete={handlePreloaderComplete} />
            <MainContent ref={mainContentRef} id="main-content">
                <Header />
                <Content>{children}</Content>
                <Footer />
            </MainContent>
        </>
    );
}
