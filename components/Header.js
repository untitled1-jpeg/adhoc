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
  position: relative;
  z-index: 100;
  padding: ${props => props.$scrolled ? '1.2rem 4rem 1rem' : '0'}; /* Reduced from supercharged size */
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Softer/Smoother Gradient */
  background: ${props => props.$scrolled ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0) 80%)' : 'transparent'};
  
  /* Mask edges */
  mask-image: ${props => props.$scrolled ? 'radial-gradient(ellipse at center, black 40%, transparent 80%)' : 'none'};
  -webkit-mask-image: ${props => props.$scrolled ? 'radial-gradient(ellipse at center, black 40%, transparent 80%)' : 'none'};
  
  border-radius: 0;
`;

const LogoLink = styled(Link)`
  display: block;
  width: ${props => props.$scrolled ? '165px' : '242px'};
  transition: width 0.4s ease;
  
  svg {
    width: 100%;
    height: auto;
  }

  @media (max-width: 767px) {
    width: ${props => props.$scrolled ? '85px' : '154px'};
  }
`;

import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export default function Header({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const { siteLogo } = settings || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
            {siteLogo ? (
              <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center' }}>
                <Image
                  src={urlFor(siteLogo).url()}
                  alt="Adhoc"
                  width={scrolled ? 165 : 242}
                  height={100}
                  style={{ objectFit: 'contain', transition: 'all 0.4s ease' }}
                />
              </div>
            ) : (
              <Logo width="100%" color="#fff" scrolled={scrolled} />
            )}
          </LogoLink>
        </LogoContainer>
      </ContentContainer>
    </HeaderWrapper>
  );
}
