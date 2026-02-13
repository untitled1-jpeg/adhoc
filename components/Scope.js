'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridContainer, GridCol } from '@/components/Grid';

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
  margin-bottom: 60px;
  display: block;
  text-align: center;
`;

const Description = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
  margin-bottom: 6rem;
  color: #fff;
  max-width: 740px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const ScopeGrid = styled(GridContainer)`
  column-gap: 20px; /* Standardized with GridContainer */
  
  @media (max-width: 1550px) {
    column-gap: 40px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-family: "ivyora-display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 1);
`;

const List = styled.ul`
  list-style: none;
  padding: 0 0 0 1.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: flex-start;
  
  &::before {
    content: "";
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 1rem;
    margin-top: 0.6rem;
    flex-shrink: 0;
  }
`;

export default function Scope() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const columnsRef = useRef([]);

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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(columnsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" },
          "-=0.7"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToColumnRefs = (el) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current.push(el);
    }
  };
  return (
    <SectionWrapper id="scope" ref={sectionRef}>
      <GridContainer>
        <GridCol $span={12}>
          <Eyebrow>Our Scope</Eyebrow>
        </GridCol>
        <GridCol $start={2} $span={10} ref={headlineRef}>
          <Description>
            Across personal, family, home, and professional life, we bring order, foresight, and intention.
            We anticipate and intelligently coordinate the many moving parts, so our members can stay focused on what matters most.
          </Description>
        </GridCol>
      </GridContainer>

      <ScopeGrid>
        <GridCol $start={3} $span={2} ref={addToColumnRefs}>
          <Column>
            <ColumnTitle>Personal</ColumnTitle>
            <List>
              <ListItem>Schedule management and personal logistics</ListItem>
              <ListItem>Travel planning and execution (domestic & international)</ListItem>
              <ListItem>Personal purchases, gifting, and special arrangements</ListItem>
              <ListItem>Leisure planning, experiences, and personal projects</ListItem>
            </List>
          </Column>
        </GridCol>

        <GridCol $start={5} $span={2} ref={addToColumnRefs}>
          <Column>
            <ColumnTitle>Family</ColumnTitle>
            <List>
              <ListItem>Children's schedules, school coordination, and activities</ListItem>
              <ListItem>Family holidays and milestone events</ListItem>
              <ListItem>Household staffing coordination and oversight</ListItem>
              <ListItem>Family logistics, transitions, and special circumstances</ListItem>
              <ListItem>Support during periods of change, growth, or crisis</ListItem>
              <ListItem>Long-term family planning</ListItem>
            </List>
          </Column>
        </GridCol>

        <GridCol $start={7} $span={2} ref={addToColumnRefs}>
          <Column>
            <ColumnTitle>Home</ColumnTitle>
            <List>
              <ListItem>Property and residence coordination</ListItem>
              <ListItem>Vendor sourcing, management, and accountability</ListItem>
              <ListItem>Maintenance schedules and planning</ListItem>
              <ListItem>Home projects</ListItem>
              <ListItem>Seasonal preparation</ListItem>
            </List>
          </Column>
        </GridCol>

        <GridCol $start={9} $span={2} ref={addToColumnRefs}>
          <Column>
            <ColumnTitle>Professional</ColumnTitle>
            <List>
              <ListItem>High-level calendar oversight</ListItem>
              <ListItem>Travel, event, and meeting coordination</ListItem>
              <ListItem>Liaison with the Advisory Team and office staff</ListItem>
            </List>
          </Column>
        </GridCol>
      </ScopeGrid>
    </SectionWrapper>
  );
}
