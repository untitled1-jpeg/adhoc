'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MainContent = styled.div`
  opacity: ${props => props.$isLoading ? 0 : 1};
  visibility: ${props => props.$isLoading ? 'hidden' : 'visible'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: opacity 1s ease; /* Backup transition */
`;

const Content = styled.main`
  flex: 1;
`;

export default function LayoutWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const mainContentRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Stabilize the complete handler to prevent Preloader from re-triggering on Layout re-renders
    const handlePreloaderComplete = useCallback(() => {
        // Reveal content after preloader finishes
        if (mainContentRef.current) {
            gsap.set(mainContentRef.current, { visibility: 'visible' });
            gsap.to(mainContentRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    setIsLoading(false);
                    // Signal to children (like Hero) that entrance can begin
                    window.dispatchEvent(new CustomEvent('adhoc_ready'));
                }
            });
        }
    }, []);

    // Prevent hydration mismatch
    if (!isClient) {
        return <div style={{ opacity: 0 }}>{children}</div>;
    }

    return (
        <>
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            <MainContent
                ref={mainContentRef}
                id="main-content"
                $isLoading={isLoading}
            >
                <Header />
                <Content>{children}</Content>
                <Footer />
            </MainContent>
        </>
    );
}
