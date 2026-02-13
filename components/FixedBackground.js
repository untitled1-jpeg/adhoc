'use client';

import styled from 'styled-components';
import Image from 'next/image';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10; /* Deep background */
  overflow: hidden;
  background-color: #000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8; /* Increased base opacity since overlay handles legibility */
  z-index: 0;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  opacity: 0.8;
  z-index: -1; /* Behind video fallback */
`;

export default function FixedBackground() {
  return (
    <BackgroundWrapper>
      <Video
        autoPlay
        muted
        loop
        playsInline
        poster="/img_background-fallback.webp"
      >
        <source src="/background_Adhoc.mp4" type="video/mp4" />
      </Video>
      <StyledImage
        src="/img_background-fallback.webp"
        alt="Background Fallback"
        fill
        priority
        quality={100}
      />
      <Overlay />
    </BackgroundWrapper>
  );
}
