'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${props => props.$scrolled ? '1rem 2rem' : '2rem 2rem'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: ${props => props.$scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.4s ease;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 0 60px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: ${props => props.$scrolled ? '0.5rem' : '1.5rem'};
  opacity: ${props => props.$scrolled ? 0 : 1}; /* Optionally hide line on scroll if desired, or keep it */
  transition: all 0.4s ease;
`;

const LogoLink = styled(Link)`
  display: block;
  width: ${props => props.$scrolled ? '165px' : '242px'};
  transition: width 0.4s ease;
  
  svg {
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: ${props => props.$scrolled ? '110px' : '154px'};
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <ContentContainer>
        <LogoLink href="/" $scrolled={scrolled}>
          <Logo width="100%" color="#fff" />
        </LogoLink>
      </ContentContainer>
    </HeaderWrapper>
  );
}
