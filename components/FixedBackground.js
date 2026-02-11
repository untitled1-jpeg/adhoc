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
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  opacity: 0.8;
  z-index: 0;
`;

export default function FixedBackground() {
  return (
    <BackgroundWrapper>
      <StyledImage
        src="/background_adhoc.webp"
        alt="Background"
        fill
        priority
        quality={100}
      />
      <Overlay />
    </BackgroundWrapper>
  );
}
