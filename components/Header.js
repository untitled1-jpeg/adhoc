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
  padding: ${props => props.$scrolled ? '1rem 40px' : '2rem 40px'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 0.4s ease;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 0 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.$scrolled ? '0.85rem 2rem' : '1rem 2rem'};
  border-radius: ${props => props.$scrolled ? '40px' : '0'};
  background: ${props => props.$scrolled
    ? 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)'
    : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(15px)' : 'none'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
        <LogoContainer $scrolled={scrolled}>
          <LogoLink
            href="/"
            $scrolled={scrolled}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Logo width="100%" color="#fff" scrolled={scrolled} />
          </LogoLink>
        </LogoContainer>
      </ContentContainer>
    </HeaderWrapper>
  );
}
