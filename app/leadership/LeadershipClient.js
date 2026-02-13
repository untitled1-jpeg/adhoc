'use client';

import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { GridContainer, GridCol } from '@/components/Grid';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px; /* Space for the logo */
  padding-bottom: 2rem;
  color: #fff;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 1rem; /* Brought closer to info text */
  
  img {
    object-fit: cover;
  }
`;

const Info = styled.div`
  h3 {
    font-family: "sofia-pro", sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.8rem;
    color: #fff;
  }
  
  p {
    font-family: "sofia-pro", sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem; /* Added space before main bio on mobile */
  }

  @media (max-width: 767px) {
    text-align: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* Enforce the 2rem universal rule */
  gap: 2rem;
`;

const Title = styled.h1`
  font-family: "ivyora-display", serif;
  font-style: italic;
  font-size: 2.2rem; /* Matching the homepage section headlines */
  font-weight: 400;
  margin: 0;
`;

const PageHeadline = styled.h4`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.35rem; /* Reduced from 0.75rem */
  color: #fff;
  line-height: 1.1;
  margin-top: -0.65rem; /* Middle ground alignment */

  @media (max-width: 767px) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
`;

const SubHeadline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 1.8rem; /* Correcting to H3 style size */
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  margin: 0;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

const Separator = styled.div`
  width: 100px;
  height: 1px;
  background-color: #ee552f;
  margin: 0;

  @media (max-width: 767px) {
    margin: 0 auto 2rem auto; /* Center separator */
  }
`;

const BioText = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

export default function LeadershipClient() {
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.5 }
      });

      // Pure Fade/Blur Entrance (No Slide)
      tl.fromTo(imageRef.current,
        { opacity: 0, filter: 'blur(20px)' },
        { opacity: 1, filter: 'blur(0px)' }
      )
        .fromTo(infoRef.current,
          { opacity: 0, filter: 'blur(20px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          "-=1.2"
        )
        // Stagger animate children of Content (Title, SubHeadline, Separator, BioText)
        .fromTo(contentRef.current.children,
          { opacity: 0, filter: 'blur(20px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.2,
            duration: 1.5
          },
          "-=1.0"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      <GridContainer>
        {/* Left Column: Image & Contact Info */}
        <GridCol $start={2} $span={3}>
          <ImageWrapper ref={imageRef}>
            <Image
              src="/img_holly.jpg"
              alt="Holly Moon - President & CEO"
              fill
              priority
            />
          </ImageWrapper>
          <Info ref={infoRef}>
            <h3>President & CEO</h3>
            <p>hello@adhoc-co.com</p>
          </Info>
        </GridCol>

        {/* Right Column: Bio Content */}
        <GridCol $start={6} $span={6}>
          <Content ref={contentRef}>
            <PageHeadline>Our Leadership</PageHeadline>
            <SubHeadline>
              Holly Moon is the President & CEO of Adhoc and a trusted operator with more than a decade of experience supporting executives, entrepreneurs, and families with complex lives.
            </SubHeadline>
            <Separator />
            <BioText>
              Known for her discretion, judgment, and ability to identify the right people for the right roles, she brings order and calm to demanding environments.
            </BioText>
            <BioText>
              Before Adhoc, Holly founded The Assistant Academy, where she built and trained elite executive and personal assistants. She lives in Dallas with her husband and children, Lincoln and Monroe, though they spend time on the East Coast whenever possible, drawn by the ocean, salty air, and fresh seafood.
            </BioText>
          </Content>
        </GridCol>
      </GridContainer>
    </PageWrapper>
  );
}
