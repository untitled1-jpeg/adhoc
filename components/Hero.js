'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';
import ArrowVertical from '@/components/icons/ArrowVertical';

import { GridContainer, GridCol } from '@/components/Grid';

gsap.registerPlugin(ScrollToPlugin);

const HeroWrapper = styled.section`
  position: relative;
  height: 90vh;
  min-height: 850px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  padding-top: 100px; /* Buffer for fixed logo */
  
  @media (max-width: 767px) {
    height: auto;
    min-height: 100vh;
    padding: 160px 0 100px 0; /* Increased top padding for logo clearance */
    justify-content: center; /* Centered vertically as requested */
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 767px) {
    text-align: left;
    padding: 0; /* Handled by GridContainer inside */
  }
`;

const Headline = styled.h1`
  font-family: "ivyora-display", serif;
  font-size: clamp(3.25rem, 10vw, 4.5rem); /* User corrected specification */
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #fff;
  
  em {
    font-style: italic;
    font-family: "ivyora-display", serif;
    font-weight: 400;
  }

  @media (max-width: 767px) {
    font-size: 3.25rem; /* Locked to 3.25rem per user request */
    line-height: 1.2;
    margin-bottom: 2rem; /* Standardized to 32px */
  }
`;

const Subheadline = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 767px) {
    font-size: 0.9rem; /* Updated as requested */
    max-width: 100%; /* Ensure full width */
    margin-bottom: 2rem; /* Standardized to 32px */
  }
`;

const CtaLink = styled.a`
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: "sofia-pro", sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.4rem;
  transition: all 0.3s ease;
  width: fit-content;
  margin-bottom: 0.5rem;
  
  &:hover {
    gap: 1.5rem;
    color: #ee552f;
    border-bottom-color: #ee552f;
    
    svg {
      fill: #ee552f;
    }
  }

  @media (max-width: 767px) {
    margin-top: 1rem;
  }
`;

const BottomNav = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2rem;
  z-index: 10;
  
  @media (max-width: 767px) {
    margin-top: 2.5rem; /* Reinstated correct property */
    padding-bottom: 4rem;
    
    & > ${GridContainer} {
      display: flex;
      flex-direction: row; /* Side-by-side on mobile */
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 0 30px;
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (max-width: 767px) {
    align-items: center; /* Center-align link and arrow on mobile when row */
    margin-bottom: 0;
    width: auto;
  }
`;

const NavLink = styled.a`
  font-family: "sofia-pro", sans-serif;
  font-size: clamp(0.8rem, 1vw, 1rem);
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.4rem;
  margin-bottom: 1.5rem;
  width: fit-content;
  text-align: left;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  white-space: nowrap;
  
  &:hover {
    border-bottom-color: #ee552f;
    color: #ee552f;
  }

  @media (max-width: 767px) {
    padding-bottom: 0.2rem;
    margin-bottom: 0.6rem; /* Restored/Increased spacing to arrow */
    font-size: 0.85rem;
    letter-spacing: 0;
  }
`;

const NavArrow = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${NavItem}:hover & {
    transform: translateY(5px);
    
    svg {
      fill: #ee552f;
    }
  }
`;

export default function Hero() {
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const navItemsRef = useRef([]);

  useEffect(() => {
    const playEntrance = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.2 }
        });

        // Split headline into lines manually for precision
        const lines = headlineRef.current.querySelectorAll('span, em');

        tl.fromTo(lines,
          { opacity: 0, filter: 'blur(40px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.3,
            duration: 1.8,
            ease: "power4.out"
          }
        )
          .fromTo(subheadlineRef.current,
            { opacity: 0, filter: 'blur(15px)' },
            { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" },
            "-=1.2"
          )
          .fromTo([ctaRef.current, ...navItemsRef.current],
            { opacity: 0, filter: 'blur(15px)' },
            {
              opacity: 1,
              filter: 'blur(0px)',
              stagger: 0.15,
              duration: 1.2,
              ease: "power3.out"
            },
            "-=1"
          );
      });
      return ctx;
    };

    // Check if we need to wait or play immediately
    const hasPreloaderRun = typeof window !== 'undefined' && sessionStorage.getItem('adhoc_preloader_run');

    let ctx;
    if (hasPreloaderRun) {
      // Internal navigation - play immediately
      ctx = playEntrance();
    } else {
      // Initial load - wait for preloader signal
      const handleReady = () => {
        ctx = playEntrance();
      };
      window.addEventListener('adhoc_ready', handleReady);
      return () => {
        window.removeEventListener('adhoc_ready', handleReady);
        if (ctx) ctx.revert();
      };
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const addToNavRefs = (el) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href.startsWith('#')) return;
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: targetSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <HeroWrapper>
      <Content>
        <GridContainer style={{ height: 'auto' }}>
          <GridCol $start={3} $span={8} $tabletSpan={10} $tabletStart={2} $mobileSpan={12} $mobileStart={1}>
            <Headline ref={headlineRef}>
              <span style={{ display: 'block' }}>Your life.</span>
              <em>Intelligently coordinated.</em>
            </Headline>
          </GridCol>
          <GridCol $start={4} $span={6} $tabletSpan={8} $tabletStart={3} $mobileSpan={12} $mobileStart={1}>
            <Subheadline ref={subheadlineRef}>
              Latin for “for this purpose,” Adhoc exists to keep complex lives running without friction.
              We oversee the details others miss. From logistics to schedules and contingencies, everything is
              handled with thought and intention. Through your dedicated coordinator, life stays aligned, on
              time, and under control. Nothing escalates. Nothing surprises. It is simply handled. Intelligently.
            </Subheadline>
            <CtaLink href="#contact" ref={ctaRef} onClick={handleScroll}>
              GET ON THE LIST <ArrowHorizontal width="25px" color="#ee552f" />
            </CtaLink>
          </GridCol>
        </GridContainer>

        <BottomNav>
          <GridContainer>
            <GridCol $span={2} $start={4} $tabletSpan={4} $tabletStart={1} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#memberships" onClick={handleScroll}>Memberships</NavLink>
                <NavArrow>
                  <ArrowVertical width="12px" color="#ee552f" />
                </NavArrow>
              </NavItem>
            </GridCol>
            <GridCol $span={2} $start={6} $tabletSpan={4} $tabletStart={5} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#scope" onClick={handleScroll}>Our Scope</NavLink>
                <NavArrow>
                  <ArrowVertical width="12px" color="#ee552f" />
                </NavArrow>
              </NavItem>
            </GridCol>
            <GridCol $span={2} $start={8} $tabletSpan={4} $tabletStart={9} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#why-adhoc" onClick={handleScroll}>Why Adhoc?</NavLink>
                <NavArrow>
                  <ArrowVertical width="12px" color="#ee552f" />
                </NavArrow>
              </NavItem>
            </GridCol>
          </GridContainer>
        </BottomNav>
      </Content>
    </HeroWrapper>
  );
}
