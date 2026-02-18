'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { GridContainer, GridCol } from '@/components/Grid';

const FooterWrapper = styled.footer`
  padding: 8rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  position: relative;
  z-index: 10;

  @media (max-width: 767px) {
    padding: 60px 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem; /* Brought closer together as requested */
  
  @media (max-width: 767px) {
    align-items: center; /* Center logo on mobile */
  }
`;

const Copyright = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1rem;
  display: ${props => props.$mobileOnly ? 'none' : 'block'};

  @media (max-width: 767px) {
    display: ${props => props.$mobileOnly ? 'block' : 'none'};
    text-align: center; /* Center copyright */
    width: 100%;
    margin-top: 4rem;
  }
`;

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 767px) {
    margin-top: ${props => props.$isSecond ? '1rem' : '3rem'};
    gap: 1rem;
    align-items: center; /* Center links on mobile */
  }
`;

const NavLink = styled(Link)`
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
  
  &:hover {
    color: #ee552f;
  }
`;

const Definition = styled.div`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 300px;
  
  @media (max-width: 767px) {
    margin-top: 4rem;
    max-width: 100%;
    text-align: center; /* Center definition */
  }
  
  strong {
    font-weight: 700;
    display: block;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  span.translation {
    font-family: "sofia-pro", sans-serif;
    font-style: italic;
    font-weight: 300;
  }
`;

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const { socialLinks = [], contactEmail = 'hello@adhoc-co.com' } = settings || {};

  return (
    <FooterWrapper>
      <GridContainer>
        {/* Logo Column */}
        <GridCol $span={3} $mobileSpan={12} $mobileOrder={1}>
          <LogoWrapper>
            <Link href="/">
              <Image
                src="/icon_ADHOC.svg"
                alt="Adhoc Icon"
                width={60}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <Copyright>©{currentYear} Adhoc</Copyright>
          </LogoWrapper>
        </GridCol>

        {/* Nav Column 1 */}
        <GridCol $span={2} $start={5} $mobileSpan={12} $mobileOrder={2}>
          <NavColumn>
            <NavLink href="/#contact">Get on the List</NavLink>
            <NavLink href="/#memberships">Memberships</NavLink>
            <NavLink href="/#scope">Our Scope</NavLink>
          </NavColumn>
        </GridCol>

        {/* Nav Column 2 */}
        <GridCol $span={2} $mobileSpan={12} $mobileOrder={2}>
          <NavColumn $isSecond>
            <NavLink href="/#why-adhoc">Why Adhoc?</NavLink>
            <NavLink href="/leadership">Leadership</NavLink>
            <NavLink href={contactEmail.startsWith('http') ? contactEmail : `mailto:${contactEmail}`}>
              Contact
            </NavLink>
          </NavColumn>
        </GridCol>

        {/* Social / Definition Column */}
        <GridCol $span={3} $start={10} $mobileSpan={12} $mobileOrder={3}>
          <ContentWrapper>
            {socialLinks.length > 0 && (
              <NavColumn style={{ marginBottom: '2rem' }}>
                {socialLinks.map((link, i) => (
                  <NavLink key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.platform}
                  </NavLink>
                ))}
              </NavColumn>
            )}
            <Definition>
              <strong>ADHOC - /AD .HÄK/</strong>
              -created or done for a particular purpose as necessary.<br />Latin for <span className="translation">&quot;for this purpose&quot;</span>
            </Definition>
          </ContentWrapper>
        </GridCol>

        {/* Copyright Column - Only visible on Mobile */}
        <GridCol $span={12} $mobileOrder={4}>
          <Copyright $mobileOnly>©{currentYear} Adhoc</Copyright>
        </GridCol>
      </GridContainer>
    </FooterWrapper>
  );
}
