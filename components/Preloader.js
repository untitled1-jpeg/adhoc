'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Logo from '@/components/icons/Logo';

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const LogoWrapper = styled.div`
  opacity: 0;
  /* User requested scaling the logo ~25%. 
     Previously it was 250px. 25% of that is too small (60px).
     25% smaller is ~180px. 
     But let's go with a fixed width that looks elegant. */
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: 0%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function Preloader({ onComplete }) {
    const wrapperRef = useRef(null);
    const logoRef = useRef(null);
    const fillRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Animation Sequence
            tl.to(logoRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            })
                .to(fillRef.current, {
                    width: '100%',
                    duration: 3,
                    ease: 'power1.inOut'
                }, '-=0.5')
                .to([logoRef.current, barRef.current], {
                    opacity: 0,
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.in'
                })
                .to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    display: 'none'
                });

        }, wrapperRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <PreloaderWrapper ref={wrapperRef}>
            <ContentContainer>
                <LogoWrapper ref={logoRef}>
                    <Logo width="635px" color="#fff" />
                </LogoWrapper>
                <ProgressBar ref={barRef} style={{ width: '235px' }}>
                    <ProgressFill ref={fillRef} />
                </ProgressBar>
            </ContentContainer>
        </PreloaderWrapper>
    );
}
