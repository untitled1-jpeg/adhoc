'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridContainer, GridCol } from '@/components/Grid';

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
    min-height: 100dvh;
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
    margin-bottom: 0.5rem; /* Reduced to tighten layout */
  }
`;

const Description = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
  margin-bottom: 4rem; /* Balanced intermediate spacing */
  color: #fff;
  max-width: 740px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    text-align: center;
    margin: 0 0 2rem 0; /* Standardized to ~32px */
    max-width: 100%;
  }
`;

const ScopeGrid = styled(GridContainer)`
  padding: 0 80px;
  column-gap: 60px;
  @media (max-width: 1550px) {
    padding: 0 60px;
  }
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  @media (max-width: 767px) {
    padding: 0;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 0 30px; /* Reduced from 40px as requested */
    margin-bottom: 3rem;
  }
`;

const ColumnTitle = styled.h3`
  font-family: "ivyora-display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem; /* Reduced to account for separator margin */
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 0.85rem;
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

const defaultCategories = [
  {
    title: 'Personal',
    listItems: [
      'Schedule management and personal logistics',
      'Travel planning and execution (domestic & international)',
      'Personal purchases, gifting, and special arrangements',
      'Leisure planning, experiences, and personal projects'
    ]
  },
  {
    title: 'Family',
    listItems: [
      "Children's schedules, school coordination, and activities",
      'Family holidays and milestone events',
      'Household staffing coordination and oversight',
      'Family logistics, transitions, and special circumstances',
      'Support during periods of change, growth, or crisis',
      'Long-term family planning'
    ]
  },
  {
    title: 'Home',
    listItems: [
      'Property and residence coordination',
      'Vendor sourcing, management, and accountability',
      'Maintenance schedules and planning',
      'Home projects',
      'Seasonal preparation'
    ]
  },
  {
    title: 'Professional',
    listItems: [
      'High-level calendar oversight',
      'Travel, event, and meeting coordination',
      'Liaison with the Advisory Team and office staff'
    ]
  }
];

export default function Scope({ data = {} }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const columnsRef = useRef([]);

  const {
    scopeIntro = 'Across personal, family, home, and professional life, we bring order, foresight, and intention. We anticipate and intelligently coordinate the many moving parts, so our members can stay focused on what matters most.',
    scopeCategories = defaultCategories
  } = data || {};

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
        .addLabel("columns", "-=0.8");

      columnsRef.current.forEach((col, i) => {
        const title = col.querySelector('h3');
        const separator = col.querySelector('div'); // The Separator styled component
        const items = col.querySelectorAll('li');

        tl.fromTo(title,
          { opacity: 0, filter: 'blur(25px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.8 },
          `columns+=${i * 0.2}`
        )
          .fromTo(separator,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut" },
            "-=0.4"
          )
          .fromTo(items,
            { opacity: 0, filter: 'blur(15px)' },
            { opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 0.6 },
            "-=0.6"
          );
      });
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
            {scopeIntro}
          </Description>
        </GridCol>
      </GridContainer>

      <ScopeGrid>
        {scopeCategories.map((category, idx) => (
          <GridCol
            key={idx}
            $start={1 + (idx * 3)}
            $span={3}
            $tabletStart={idx % 2 === 0 ? 1 : 7}
            $tabletSpan={6}
            ref={addToColumnRefs}
          >
            <Column>
              <ColumnTitle>{category.title}</ColumnTitle>
              <Separator />
              <List>
                {category.listItems?.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </List>
            </Column>
          </GridCol>
        ))}
      </ScopeGrid >
    </SectionWrapper >
  );
}
