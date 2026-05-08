'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { GridContainer, GridCol } from '@/components/Grid';
import Instagram from './icons/Instagram';
import LinkedIn from './icons/LinkedIn';
import { urlFor } from '@/sanity/lib/image';

const FooterWrapper = styled.footer`
  padding: 8rem 0 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  position: relative;
  z-index: 10;

  @media (max-width: 767px) {
    padding: 60px 0 30px 0;
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
  display: block;

  @media (max-width: 767px) {
    text-align: center; /* Center copyright */
    width: 100%;
    margin-top: 2rem; /* Reduced from 4rem for better mobile spacing */
  }
`;

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 767px) {
    margin-top: ${props => props.$isSecond ? '1.5rem' : '3rem'};
    gap: 1.5rem;
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
    margin-top: 3rem;
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

const SocialLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateY(-2px);
  }
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem; /* Reduced from 3.5rem to close up space */
  
  @media (max-width: 767px) {
    justify-content: center;
    margin-top: 1.5rem; /* Match the uniform link rhythm gap */
    margin-bottom: 2rem;
  }
`;

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const { 
    socialLinks = [], 
    contactEmail = 'hello@adhoc-co.com',
    affiliations = [] 
  } = settings || {};

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
              <SocialGrid>
                {socialLinks.map((link, i) => {
                  const Icon = link.platform?.toLowerCase().includes('instagram') ? Instagram :
                    link.platform?.toLowerCase().includes('linkedin') ? LinkedIn : null;

                  return (
                    <SocialLink key={i} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                      {Icon ? <Icon size={24} /> : link.platform}
                    </SocialLink>
                  );
                })}
              </SocialGrid>
            )}
            <Definition>
              <strong>ADHOC - /AD .HÄK/</strong>
              -created or done for a particular purpose as necessary.<br />Latin for <span className="translation">&quot;for this purpose&quot;</span>
            </Definition>
          </ContentWrapper>
        </GridCol>

        {/* Bottom Bar / Trust Bar */}
        <GridCol $span={12} $mobileOrder={4}>
          <div style={{ 
            marginTop: '6rem', 
            paddingTop: '2.5rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }} className="footer-bottom-bar">
            <style jsx>{`
              @media (max-width: 767px) {
                .footer-bottom-bar {
                  flex-direction: column-reverse !important;
                  justify-content: center !important;
                  text-align: center !important;
                  margin-top: 4rem !important;
                }
                .affiliation-logo {
                  width: 91px !important;
                  height: 91px !important;
                }
              }
            `}</style>
            
            <Copyright>©{currentYear} Adhoc</Copyright>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {affiliations?.length > 0 ? (
                affiliations.map((aff, i) => (
                  <Image
                    key={i}
                    src={urlFor(aff.logo).url()}
                    alt={aff.name || "Affiliation"}
                    width={70}
                    height={70}
                    className="affiliation-logo"
                    style={{ objectFit: 'contain', opacity: 0.6 }}
                  />
                ))
              ) : (
                <Image
                  src="/images/PSA-logo-crest-rev.png"
                  alt="Private Service Alliance"
                  width={70}
                  height={70}
                  className="affiliation-logo"
                  style={{ objectFit: 'contain', opacity: 0.6 }}
                />
              )}
            </div>
          </div>
        </GridCol>
      </GridContainer>
    </FooterWrapper>
  );
}
