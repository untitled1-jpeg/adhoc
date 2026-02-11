'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridContainer, GridCol } from '@/components/Grid';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = styled.section`
  color: #fff;
  padding: 12rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Eyebrow = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4rem;
  display: block;
`;

const Headline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #fff;
  margin-bottom: 3rem; /* Reduced from 6rem */
  max-width: 900px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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
`;

const CtaLink = styled.a`
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
  border-bottom: 1.5px solid #fff;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;
  margin: 0 auto;
  
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

      tl.fromTo([headlineRef.current, contentRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <SectionWrapper id="why-adhoc" ref={sectionRef}>
      <GridContainer>
        <GridCol $span={12}>
          <Eyebrow>Why Adhoc?</Eyebrow>
        </GridCol>

        <GridCol $start={3} $span={8} ref={headlineRef}>
          <Headline>
            We believe life works best when the right people are at the helm.
            Adhoc is built around a highly selective team of Life Coordinators
            chosen for their judgment, discretion, and emotional intelligence
            as much as their expertise.
          </Headline>
        </GridCol>

        <GridCol $start={4} $span={6} ref={contentRef}>
          <Description>
            Our coordinators think holistically, act proactively, and operate with intention.
            These are not task rabbits, but strategic partners who understand the rhythms
            of the lives they support, and they handle the details accordingly.
          </Description>
          <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
            <CtaLink href="/leadership">
              OUR LEADERSHIP <ArrowHorizontal width="20px" color="#ee552f" />
            </CtaLink>
          </div>
        </GridCol>
      </GridContainer>
    </SectionWrapper>
  );
}
