'use client';

import styled from 'styled-components';
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

const SubHeadline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 1.8rem; /* Correcting to H3 style size */
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Separator = styled.div`
  width: 100px;
  height: 1px;
  background-color: #ee552f;
  margin: 0;
`;

const BioText = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

export default function LeadershipClient() {
  return (
    <PageWrapper>
      <GridContainer>
        {/* Left Column: Image & Contact Info */}
        <GridCol $start={2} $span={3}>
          <ImageWrapper>
            <Image
              src="/img_holly.jpg"
              alt="Holly Moon - President & CEO"
              fill
              priority
            />
          </ImageWrapper>
          <Info>
            <h3>President & CEO</h3>
            <p>hello@adhoc-co.com</p>
          </Info>
        </GridCol>

        {/* Right Column: Bio Content */}
        <GridCol $start={6} $span={6}>
          <Content>
            <Title>Our Leadership</Title>
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
