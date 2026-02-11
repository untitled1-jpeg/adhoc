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
    const [shouldShowPreloader, setShouldShowPreloader] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const mainContentRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
        const hasSeenPreloader = sessionStorage.getItem('adhoc_preloader_seen');

        if (hasSeenPreloader) {
            setShouldShowPreloader(false);
            setIsLoading(false);
            // If already seen, immediately show content
            if (mainContentRef.current) {
                gsap.set(mainContentRef.current, { opacity: 1 });
            }
        } else {
            setShouldShowPreloader(true);
        }
    }, []);

    const handlePreloaderComplete = () => {
        sessionStorage.setItem('adhoc_preloader_seen', 'true');
        // Reveal content after preloader finishes
        if (mainContentRef.current) {
            gsap.to(mainContentRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    setIsLoading(false);
                    setShouldShowPreloader(false);
                }
            });
        }
    };

    // Prevent hydration mismatch by only rendering preloader logic on client
    if (!isClient) {
        return <div style={{ opacity: 0 }}>{children}</div>;
    }

    return (
        <>
            {shouldShowPreloader && <Preloader onComplete={handlePreloaderComplete} />}
            <MainContent
                ref={mainContentRef}
                id="main-content"
                style={{ opacity: !shouldShowPreloader && !isLoading ? 1 : 0 }}
            >
                <Header />
                <Content>{children}</Content>
                <Footer />
            </MainContent>
        </>
    );
}
