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
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Progress bar removed per user request for full-screen video experience.

export default function Preloader({ onComplete }) {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        if (!videoReady) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Animation Sequence
            tl.to(videoRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out'
            })
                .to({}, { duration: 4.5 }) // Hold for the remainder of the 6 seconds
                .to(videoRef.current, {
                    opacity: 0,
                    scale: 1.02,
                    duration: 1,
                    ease: 'power2.inOut'
                })
                .to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    display: 'none'
                });

        }, wrapperRef);

        return () => ctx.revert();
    }, [onComplete, videoReady]);

    const handleCanPlayThrough = () => {
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
