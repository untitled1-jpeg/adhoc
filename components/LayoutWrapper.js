'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import FixedBackground from './FixedBackground';
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

    // Move reveal logic to a separate function for reuse
    const revealContent = useCallback((skipAnim = false) => {
        if (!mainContentRef.current) return;

        if (skipAnim) {
            gsap.set(mainContentRef.current, { visibility: 'visible', opacity: 1 });
            setIsLoading(false);
            window.dispatchEvent(new CustomEvent('adhoc_ready'));
        } else {
            gsap.set(mainContentRef.current, { visibility: 'visible' });
            gsap.to(mainContentRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    setIsLoading(false);
                    window.dispatchEvent(new CustomEvent('adhoc_ready'));
                }
            });
        }
    }, []);

    useEffect(() => {
        setIsClient(true);

        // Check if preloader has already run in this session
        const hasRun = sessionStorage.getItem('adhoc_preloader_run');
        if (hasRun) {
            revealContent(true);
        }
    }, [revealContent]);

    const handlePreloaderComplete = useCallback(() => {
        sessionStorage.setItem('adhoc_preloader_run', 'true');
        revealContent();
    }, [revealContent]);

    // Prevent hydration mismatch
    if (!isClient) {
        return <div style={{ opacity: 0, background: '#000', minHeight: '100vh' }}>{children}</div>;
    }

    return (
        <>
            <FixedBackground />
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
