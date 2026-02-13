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
  padding: 15rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Eyebrow = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4rem;
  display: block;
  text-align: center;
`;

const Description = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #fff;
  text-align: center;
  max-width: 740px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TiersGrid = styled.div`
  margin-top: 6rem;
  width: 100%;
  
  @media (max-width: 900px) {
    margin-top: 2rem;
  }
`;

const TierCard = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  
  @media (max-width: 900px) {
    margin-bottom: 1.5rem;
    height: auto;
  }
`;

const TierTitle = styled.h3`
  font-family: "ivyora-display", serif;
  font-size: 3rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.2rem;
  line-height: 1;

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const TierHours = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  display: block;
  color: #fff;
`;

const Separator = styled.div`
  width: 140px;
  height: 1px;
  background-color: #ee552f;
  margin: 0 0 1.2rem 0;
`;

const TierDescription = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 280px;
  margin: 0 0 2rem 0;
  
  @media (max-width: 900px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const CtaWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 900px) {
    margin-top: 2rem;
  }
`;

const CtaLink = styled.a`
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
  
  &:hover {
    gap: 1.5rem;
    color: #ee552f;
    border-bottom-color: #ee552f;
    
    svg {
      fill: #ee552f;
    }
  }
`;

export default function Memberships() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      tl.fromTo([titleRef.current, descriptionRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
      )
        .fromTo(cardsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  return (
    <SectionWrapper id="memberships" ref={sectionRef}>
      <GridContainer>
        <GridCol $span={12}>
          <Eyebrow ref={titleRef}>Memberships</Eyebrow>
        </GridCol>
        <GridCol $start={3} $span={8}>
          <Description ref={descriptionRef}>
            A private membership that pairs individuals and
            families with a dedicated coordinator to manage
            all of the moving parts of their lives.
          </Description>
        </GridCol>
      </GridContainer>

      <TiersGrid>
        <GridContainer>
          {/* Essential */}
          <GridCol $start={2} $span={3}>
            <TierCard ref={addToCardRefs}>
              <TierTitle>Essential</TierTitle>
              <TierHours>50 hours per month</TierHours>
              <Separator />
              <TierDescription>
                Consistent support from a dedicated life coordinator.
              </TierDescription>
            </TierCard>
          </GridCol>

          {/* Elevated */}
          <GridCol $start={6} $span={3}>
            <TierCard ref={addToCardRefs}>
              <TierTitle>Elevated</TierTitle>
              <TierHours>80 hours per month</TierHours>
              <Separator />
              <TierDescription>
                Expanded support from a dedicated life coordinator.
              </TierDescription>
            </TierCard>
          </GridCol>

          {/* Exclusive */}
          <GridCol $start={10} $span={3}>
            <TierCard ref={addToCardRefs}>
              <TierTitle>Exclusive</TierTitle>
              <TierHours>Full-time coordination</TierHours>
              <Separator />
              <TierDescription>
                Upscaled support from a dedicated life coordinator, structured entirely around your family.
              </TierDescription>
            </TierCard>
          </GridCol>
        </GridContainer>
      </TiersGrid>

      <CtaWrapper>
        <GridContainer>
          <GridCol $span={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <CtaLink href="#contact">
              GET ON THE LIST <ArrowHorizontal width="20px" color="#ee552f" />
            </CtaLink>
          </GridCol>
        </GridContainer>
      </CtaWrapper>
    </SectionWrapper>
  );
}
