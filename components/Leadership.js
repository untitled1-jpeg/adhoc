'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridContainer, GridCol } from '@/components/Grid';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = styled.section`
  color: #fff;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 767px) {
    height: auto;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 100px 0; /* Rely on GridContainer padding */
    text-align: left;
    justify-content: flex-start;
  }
`;

const Eyebrow = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2.5rem; /* Standardized to 40px */
  display: block;
  text-align: center;
  width: 100%;

  @media (max-width: 767px) {
    text-align: left;
    margin-bottom: 1rem;
  }
`;

const Headline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #fff;
  margin-bottom: 3rem; /* Reduced from 6rem */
  max-width: 740px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    text-align: left;
    margin-left: 0;
    max-width: 100%;
    margin-bottom: 2rem; /* Standardized spacing */
  }
`;

const Description = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem; /* Reduced from 5rem */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 767px) {
    text-align: left;
    margin-left: 0;
    max-width: 100%;
    margin-bottom: 2rem; /* Standardized spacing */
  }
`;

const CtaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: "sofia-pro", sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.4rem;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover {
    gap: 1.5rem;
    color: #ee552f;
    border-bottom-color: #ee552f;
    
    svg {
      fill: #ee552f;
    }
  }
`;

export default function Leadership() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      tl.fromTo(headlineRef.current,
        { opacity: 0, filter: 'blur(55px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power4.out" }
      )
        .fromTo(contentRef.current.children,
          { opacity: 0, filter: 'blur(25px)' },
          { opacity: 1, filter: 'blur(0px)', stagger: 0.3, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <SectionWrapper id="why-adhoc" ref={sectionRef}>
      <GridContainer>
        <GridCol $span={12} $mobileSpan={12} $mobileStart={1}>
          <Eyebrow>Why Adhoc?</Eyebrow>
        </GridCol>

        <GridCol $start={3} $span={8} $tabletStart={2} $tabletSpan={10} $mobileSpan={12} $mobileStart={1} ref={headlineRef}>
          <Headline>
            We believe life works best when the right people are at the helm.
            Adhoc is built around a highly selective team of Life Coordinators
            chosen for their judgment, discretion, and emotional intelligence
            as much as their expertise.
          </Headline>
        </GridCol>

        <GridCol $start={4} $span={6} $tabletStart={2} $tabletSpan={10} $mobileSpan={12} $mobileStart={1} ref={contentRef}>
          <Description>
            Our coordinators think holistically, act proactively, and operate with intention.
            These are not task rabbits, but strategic partners who understand the rhythms
            of the lives they support, and they handle the details accordingly.
          </Description>
          <CtaWrapper>
            <CtaLink href="/leadership">
              OUR LEADERSHIP <ArrowHorizontal width="20px" color="#ee552f" />
            </CtaLink>
          </CtaWrapper>
        </GridCol>
      </GridContainer>
    </SectionWrapper>
  );
}

const CtaWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3.5rem;

  @media (max-width: 767px) {
    justify-content: flex-start;
    margin-top: 2rem;
  }
`;
