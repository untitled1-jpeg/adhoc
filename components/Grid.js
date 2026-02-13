'use client';

import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  
  /* Laptops (around 1500px) */
  @media (max-width: 1550px) {
    padding: 0 40px;
    column-gap: 15px;
  }

  /* Tablet Range (e.g., iPad Mini to iPad Pro) */
  @media (min-width: 481px) and (max-width: 1024px) {
    /* Removed max-width restriction to prevent inconsistent margins */
    padding: 0 40px; /* Match laptop padding for consistency */
  }

  /* Phablet/Small Tablet Range (User Preferred "Narrow" Look) */
  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 70vw;
    padding: 0 30px;
  }
  
  /* Mobile (Standard Phones) */
  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 30px;
    column-gap: 10px;
    max-width: none;
  }
`;

export const GridCol = styled.div`
  grid-column: ${props => props.$start
    ? `${props.$start} / span ${props.$span || 1}`
    : `span ${props.$span || 12}`};
  
  @media (max-width: 1024px) {
    ${props => props.$tabletSpan && `
      grid-column: ${props.$tabletStart
      ? `${props.$tabletStart} / span ${props.$tabletSpan}`
      : `span ${props.$tabletSpan}`};
    `}
  }

  @media (max-width: 767px) {
    grid-column: ${props => props.$mobileStart
    ? `${props.$mobileStart} / span ${props.$mobileSpan || 12}`
    : `1 / -1`}; 
  }

  /* Force full width on standard mobile (4-col grid) */
  @media (max-width: 480px) {
    grid-column: 1 / -1;
  }
`;

/* Optional: Development Grid Overlay */
const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  justify-content: center;
`;

const OverlayGrid = styled(GridContainer)`
  height: 100%;
`;

const ColMarker = styled.div`
  background: rgba(255, 0, 0, 0.1);
  height: 100%;
  border-left: 1px solid rgba(255, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 0, 0, 0.2);
`;

export function DevGridOverlay({ show = false }) {
  if (!show) return null;

  return (
    <OverlayWrapper>
      <OverlayGrid>
        {Array.from({ length: 12 }).map((_, i) => (
          <GridCol key={i} $span={1}>
            <ColMarker />
          </GridCol>
        ))}
      </OverlayGrid>
    </OverlayWrapper>
  );
}
