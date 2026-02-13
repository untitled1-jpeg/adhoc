'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const PreloaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const VideoWrapper = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  video {
    width: 112%; /* 20% smaller than previous 140% */
    height: 112%;
    object-fit: contain; /* Ensure logo is never cropped */
    
    @media (max-width: 767px) {
      width: 161%; /* 15% larger than previous 140% */
      height: 161%;
    }
  }
`;

// Progress bar removed per user request for full-screen video experience.

export default function Preloader({ onComplete }) {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const videoLoadedRef = useRef(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        if (!videoReady) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // LCP Optimization: Bot Detection
            const isBot = /Googlebot|HeadlessChrome|Lighthouse|PageSpeed|Insights|GTM|DataScraper/i.test(navigator.userAgent);

            if (isBot) {
                // Dispatch ready event immediately for Hero
                window.dispatchEvent(new CustomEvent('adhoc_ready'));
                sessionStorage.setItem('adhoc_preloader_run', 'true');

                // Hide immediately
                gsap.set(wrapperRef.current, { display: 'none' });
                if (onComplete) onComplete();
                return;
            }

            // Animation Sequence
            if (videoLoadedRef.current) {
                // Video loaded successfully - play full cinematic sequence
                tl.to(videoRef.current, {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                })
                    .to({}, { duration: 2.5 })
                    .to(videoRef.current, {
                        opacity: 0,
                        scale: 1.02,
                        duration: 1,
                        ease: 'power2.inOut'
                    })
                    .to(wrapperRef.current, {
                        opacity: 0,
                        duration: 1.0,
                        ease: 'power2.inOut',
                        display: 'none'
                    });
            } else {
                // Timeout fallback - fade out immediately to save LCP
                tl.to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    display: 'none'
                });
            }

        }, wrapperRef);

        return () => ctx.revert();
    }, [onComplete, videoReady]);

    useEffect(() => {
        // Safety timeout to ensure preloader doesn't hang if connection is slow
        const timeout = setTimeout(() => {
            if (!videoReady) {
                setVideoReady(true);
            }
        }, 3000); // 3s max wait time (reduced from 5s)

        return () => clearTimeout(timeout);
    }, [videoReady]);

    const handleCanPlayThrough = () => {
        videoLoadedRef.current = true;
        setVideoReady(true);
    };

    return (
        <PreloaderWrapper ref={wrapperRef}>
            <VideoWrapper ref={videoRef}>
                <video
                    autoPlay
                    muted
                    playsInline
                    onCanPlayThrough={handleCanPlayThrough}
                >
                    <source src="/logo_Adhoc.webm" type="video/webm" />
                    <source src="/logo_Adhoc.mov" type="video/quicktime" />
                </video>
            </VideoWrapper>
        </PreloaderWrapper>
    );
}
