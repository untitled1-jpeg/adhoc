'use client';

import styled from 'styled-components';

const Svg = styled.svg`
  width: ${props => props.$width || '32px'};
  height: auto;
  fill: ${props => props.$color || '#ee552f'};
  transition: transform 0.3s ease;
`;

export default function ArrowVertical({ width, color, className }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.37 20.08"
            $width={width}
            $color={color}
            className={className}
        >
            <path d="M19.19,20.08c.24-1.95,1.22-6.52,5.11-10.13,2.82-2.61,5.95-3.65,8.08-4.05l-1.13-5.89c-2.3.44-5.45,1.43-8.57,3.6h0c-1.13.8-2.46,1.87-3.81,3.32-1.17,1.26-2.06,2.5-2.72,3.56h0c-.64-1.01-1.53-2.25-2.72-3.56-.32-.34-1.62-1.79-3.27-3C6.88,1.53,3.53.46,1.13,0L0,5.89c2.13.41,5.26,1.44,8.08,4.05,3.89,3.61,4.87,8.18,5.11,10.13,2,0,4,0,6,0Z" />
        </Svg>
    );
}
