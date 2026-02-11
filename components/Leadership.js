'use client';

import styled from 'styled-components';
import { GridContainer, GridCol } from '@/components/Grid';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';

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
  return (
    <SectionWrapper id="why-adhoc">
      <GridContainer>
        <GridCol $span={12}>
          <Eyebrow>Why Adhoc?</Eyebrow>
        </GridCol>

        <GridCol $start={3} $span={8}>
          <Headline>
            We believe life works best when the right people are at the helm.
            Adhoc is built around a highly selective team of Life Coordinators
            chosen for their judgment, discretion, and emotional intelligence
            as much as their expertise.
          </Headline>
        </GridCol>

        <GridCol $start={4} $span={6}>
          <Description>
            Our coordinators think holistically, act proactively, and operate with intention.
            These are not task rabbits, but strategic partners who understand the rhythms
            of the lives they support, and they handle the details accordingly.
          </Description>
        </GridCol>

        <GridCol $start={5} $span={4} style={{ marginTop: '1rem' }}>
          <CtaLink href="/leadership">
            OUR LEADERSHIP <ArrowHorizontal width="20px" color="#ee552f" />
          </CtaLink>
        </GridCol>
      </GridContainer>
    </SectionWrapper>
  );
}
