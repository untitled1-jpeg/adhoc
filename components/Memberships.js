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
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    height: auto;
    min-height: 100vh;
    padding: 100px 0;
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

  @media (max-width: 767px) {
    text-align: center;
    margin-bottom: 1rem; /* Reduced from 2.5rem */
  }
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

  @media (max-width: 767px) {
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
    max-width: 100%;
  }
`;

const TiersGrid = styled.div`
  margin-top: 6rem;
  width: 100%;
  
  @media (max-width: 900px) {
    margin-top: 3rem;
  }

  @media (max-width: 767px) {
    margin-top: 4.5rem; /* Increased mobile spacing as requested */
  }
`;

const NoPaddingGrid = styled(GridContainer)`
  padding: 0;
  
  @media (max-width: 1550px) {
    padding: 0;
  }
  @media (max-width: 1024px) {
    padding: 0;
  }
  @media (max-width: 767px) {
    padding: 0 30px; /* Force sync with standard GridContainer padding if overridden */
  }
`;

const TierCard = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  
  @media (max-width: 900px) {
    margin-bottom: 1.25rem; /* Reduced from 2.5rem */
    height: auto;
    padding: 0; /* Rely on GridContainer (NoPaddingGrid) padding */
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
  margin-bottom: 1.2rem; /* Increased to match separator bottom margin for perfect centering */
  display: block;
  color: #fff;

  @media (max-width: 767px) {
    margin-bottom: 0.6rem; /* Reduced from 1.2rem */
  }
`;

const Separator = styled.div`
  width: 140px;
  height: 1px;
  background-color: #ee552f;
  margin: 0 0 1.2rem 0;

  @media (max-width: 767px) {
    margin-bottom: 0.6rem; /* Reduced from 1.2rem */
  }
`;

const TierDescription = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 280px;
  margin: 0 0 2rem 0;
  
  @media (max-width: 767px) {
    padding: 0;
    margin-bottom: 2rem; /* Standardized to ~32px */
  }
`;

const CtaWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 900px) {
    margin-top: 2rem;
  }

  @media (max-width: 767px) {
    margin-top: -7px; /* Adjusted for 45px visual gap */
  }
`;

const CenteredGridCol = styled(GridCol)`
  display: flex;
  justify-content: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
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
        { opacity: 0, filter: 'blur(55px)' },
        { opacity: 1, filter: 'blur(0px)', stagger: 0.3, duration: 1.5, ease: "power4.out" }
      )
        .addLabel("cards", "-=0.8");

      cardsRef.current.forEach((card, i) => {
        const title = card.querySelector('h3');
        const hours = card.querySelector('span'); // TierHours
        const separator = card.querySelector('div'); // Separator
        const desc = card.querySelector('p'); // TierDescription

        tl.fromTo(title,
          { opacity: 0, filter: 'blur(35px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.8 },
          `cards+=${i * 0.25}`
        )
          .fromTo(hours,
            { opacity: 0, filter: 'blur(15px)' },
            { opacity: 1, filter: 'blur(0px)', duration: 0.6 },
            "-=0.4"
          )
          .fromTo(separator,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut" },
            "-=0.4"
          )
          .fromTo(desc,
            { opacity: 0, filter: 'blur(15px)' },
            { opacity: 1, filter: 'blur(0px)', duration: 0.8 },
            "-=0.6"
          );
      });
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
            all of the moving parts of their&nbsp;lives.
          </Description>
        </GridCol>
      </GridContainer>

      <TiersGrid>
        <NoPaddingGrid>
          {/* Essential */}
          <GridCol $start={3} $span={2}>
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
          <GridCol $start={6} $span={2}>
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
          <GridCol $start={9} $span={3}>
            <TierCard ref={addToCardRefs}>
              <TierTitle>Exclusive</TierTitle>
              <TierHours>Full-time coordination</TierHours>
              <Separator />
              <TierDescription>
                Upscaled support from a dedicated life coordinator, structured entirely around your family.
              </TierDescription>
            </TierCard>
          </GridCol>
        </NoPaddingGrid>
      </TiersGrid>

      <CtaWrapper>
        <GridContainer>
          <CenteredGridCol $span={12} $mobileStart={1} $mobileSpan={12}>
            <CtaLink href="#contact">
              GET ON THE LIST <ArrowHorizontal width="20px" color="#ee552f" />
            </CtaLink>
          </CenteredGridCol>
        </GridContainer>
      </CtaWrapper>
    </SectionWrapper>
  );
}
