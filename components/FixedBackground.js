'use client';

import styled from 'styled-components';
import Image from 'next/image';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: -1; /* Above body background, below content */
  overflow: hidden;
  background-color: #000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Adjusted to 50% as requested */
  z-index: 1;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1; /* Increased to full opacity to ensure visibility behind overlay */
  z-index: 0;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  opacity: 1; /* Full opacity for LCP */
  z-index: 0; /* Same level as video to ensure visibility if video fails */
`;

import { useState, useEffect } from 'react';

export default function FixedBackground() {
  const [skipFlash, setSkipFlash] = useState(false);

  useEffect(() => {
    // If preloader has already run, we skip the initial black overlay to prevent flickering
    if (sessionStorage.getItem('adhoc_preloader_run')) {
      setSkipFlash(true);
    }
  }, []);

  return (
    <BackgroundWrapper>
      <StyledImage
        src="/img_background-fallback.webp"
        alt="Adhoc Private Life Coordination Cinematic Background"
        fill
        priority
        quality={100}
      />
      <Video
        autoPlay
        muted
        loop
        playsInline
        poster="/img_background-fallback.webp"
      >
        <source src="/background_Adhoc.mp4" type="video/mp4" />
      </Video>
      <Overlay $skipFlash={skipFlash} />
    </BackgroundWrapper>
  );
}
