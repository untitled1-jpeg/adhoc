'use client';

import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 0 60px;
  
  /* Laptops (around 1500px) */
  @media (max-width: 1550px) {
    padding: 0 40px;
    column-gap: 15px;
  }

  /* Tablets / Small Laptops */
  @media (max-width: 1024px) {
    padding: 0 30px;
  }
  
  /* Mobile */
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 20px;
    column-gap: 10px;
  }
`;

export const GridCol = styled.div`
  grid-column: ${props => props.$start
    ? `${props.$start} / span ${props.$span || 1}`
    : `span ${props.$span || 12}`};
  
  @media (max-width: 768px) {
    grid-column: 1 / -1; /* Full width on mobile by default */
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
