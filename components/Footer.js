'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { GridContainer, GridCol } from '@/components/Grid';

const FooterWrapper = styled.footer`
  padding: 10rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  position: relative;
  z-index: 10;
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
  gap: 1rem;
`;

const Copyright = styled.span`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1rem;
`;

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  
  strong {
    font-weight: 700;
    display: block;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  em {
    font-family: "ivyora-display", serif;
    font-style: italic;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <GridContainer>
        {/* Logo Column */}
        <GridCol $span={3}>
          <LogoWrapper>
            <Link href="/">
              <Image
                src="/ADHOC_Icon.png"
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
        <GridCol $span={2} $start={5}>
          <NavColumn>
            <NavLink href="/#contact">Get on the List</NavLink>
            <NavLink href="/#memberships">Memberships</NavLink>
            <NavLink href="/#scope">Our Scope</NavLink>
          </NavColumn>
        </GridCol>

        {/* Nav Column 2 */}
        <GridCol $span={2}>
          <NavColumn>
            <NavLink href="/#why-adhoc">Why Adhoc?</NavLink>
            <NavLink href="/leadership">Leadership</NavLink>
            <NavLink href="/privacy">Privacy Policy</NavLink>
          </NavColumn>
        </GridCol>

        {/* Definition Column */}
        <GridCol $span={3} $start={10}>
          <Definition>
            <strong>ADHOC - /ad .hāk/</strong>
            -created or done for a particular purpose as necessary.<br />
            Latin for "<em>for this purpose</em>"
          </Definition>
        </GridCol>
      </GridContainer>
    </FooterWrapper>
  );
}
