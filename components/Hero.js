'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Image from 'next/image';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';
import ArrowVertical from '@/components/icons/ArrowVertical';

import { GridContainer, GridCol } from '@/components/Grid';

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
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 180px;
    justify-content: flex-start;
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
`;

const Headline = styled.h1`
  font-family: "ivyora-display", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #fff;
  
  em {
    font-style: italic;
    font-family: "ivyora-display", serif;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
`;

const Subheadline = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
`;

const CtaLink = styled.a`
  margin-top: 0.5rem; /* Tightened per feedback */
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: "sofia-pro", sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1.5px solid #fff;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;
  margin-bottom: 0.5rem; /* Tightened per feedback */

  &:hover {
    gap: 1.5rem;
    color: #ee552f;
    border-bottom-color: #ee552f;
    
    svg {
      fill: #ee552f;
    }
  }
`;

const BottomNav = styled.div`
  position: relative; /* Switch to relative to follow flow perfectly */
  width: 100%;
  margin-top: 2rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    margin-top: 4rem;
    padding-bottom: 4rem;
    
    /* Flex children instead of grid stacking */
    & > ${GridContainer} {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      gap: 2.5rem;
      padding: 0 10px;
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    width: auto;
  }
`;

const NavLink = styled.a`
  font-family: "sofia-pro", sans-serif;
  font-size: clamp(0.8rem, 1vw, 1rem);
  color: #fff;
  text-decoration: none;
  border-bottom: 1.5px solid #fff;
  padding-bottom: 0.8rem;
  margin-bottom: 1.5rem;
  width: fit-content;
  text-align: center;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  white-space: nowrap;
  
  &:hover {
    border-bottom-color: #ee552f;
    color: #ee552f;
  }

  @media (max-width: 768px) {
    padding-bottom: 0.4rem;
    margin-bottom: 0.6rem;
    font-size: 0.75rem;
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
          { y: 40, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.2, duration: 1.5 }
        )
          .fromTo(subheadlineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=1"
          )
          .fromTo(ctaRef.current,
            { scaleX: 0, transformOrigin: "left", opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 1 },
            "-=0.8"
          )
          .fromTo(navItemsRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
            "-=0.5"
          );
      });
      return ctx;
    };

    // Check if we need to wait or play immediately
    const isAppLoading = document.getElementById('main-content')?.style.opacity === "0";

    let ctx;
    if (!isAppLoading) {
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
            <CtaLink href="#contact" ref={ctaRef}>
              GET ON THE LIST <ArrowHorizontal width="25px" color="#ee552f" />
            </CtaLink>
          </GridCol>
        </GridContainer>

        <BottomNav>
          <GridContainer>
            <GridCol $span={2} $start={4} $tabletSpan={4} $tabletStart={1} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#memberships">Memberships</NavLink>
                <NavArrow>
                  <ArrowVertical width="12px" color="#ee552f" />
                </NavArrow>
              </NavItem>
            </GridCol>
            <GridCol $span={2} $start={6} $tabletSpan={4} $tabletStart={5} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#scope">Our Scope</NavLink>
                <NavArrow>
                  <ArrowVertical width="12px" color="#ee552f" />
                </NavArrow>
              </NavItem>
            </GridCol>
            <GridCol $span={2} $start={8} $tabletSpan={4} $tabletStart={9} $mobileSpan={4} $mobileStart={1}>
              <NavItem ref={addToNavRefs}>
                <NavLink href="#why-adhoc">Why Adhoc?</NavLink>
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
