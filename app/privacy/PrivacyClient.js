'use client';

import styled from 'styled-components';
import { GridContainer, GridCol } from '@/components/Grid';

const PageWrapper = styled.div`
  padding: 15rem 0 10rem;
  color: #fff;
  min-height: 100vh;
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-family: "ivyora-display", serif;
  font-size: 3.5rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 4rem;
  line-height: 1.1;

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #ee552f;
`;

const Text = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const ListItem = styled.li`
  font-family: "sofia-pro", sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;

  &::before {
    content: "—";
    margin-right: 1.5rem;
    color: #ee552f;
    flex-shrink: 0;
  }
`;

export default function PrivacyClient() {
    return (
        <PageWrapper>
            <GridContainer>
                <GridCol $start={3} $span={8}>
                    <Title>Privacy Policy</Title>

                    <ContentSection>
                        <Text>
                            At Adhoc, we understand that privacy is paramount for individuals and families managing complex lives.
                            This policy outlines how we protect and handle your personal information with the same level of discretion
                            and care that we bring to our life coordination services.
                        </Text>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>Information We Collect</SectionTitle>
                        <Text>To provide our bespoke services, we may collect the following types of information:</Text>
                        <List>
                            <ListItem>Personal identifiers and contact details.</ListItem>
                            <ListItem>Logistical preferences and lifestyle requirements.</ListItem>
                            <ListItem>Payment and billing information for membership administration.</ListItem>
                            <ListItem>Information shared during the course of your coordination engagement.</ListItem>
                        </List>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>How We Use Your Information</SectionTitle>
                        <Text>Your data is used exclusively to facilitate and enhance your experience with Adhoc:</Text>
                        <List>
                            <ListItem>To pair you with a dedicated Life Coordinator.</ListItem>
                            <ListItem>To manage and execute your personal and professional logistics.</ListItem>
                            <ListItem>To communicate regarding membership updates and service delivery.</ListItem>
                            <ListItem>To ensure the security and integrity of our coordination environment.</ListItem>
                        </List>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>Data Security</SectionTitle>
                        <Text>
                            We employ industry-standard security measures to protect against unauthorized access, alteration,
                            disclosure, or destruction of your personal information. Our systems are designed specifically
                            to maintain the confidentiality of the moving parts of your life.
                        </Text>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>Third-Party Disclosure</SectionTitle>
                        <Text>
                            Adhoc does not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                            This does not include trusted partners who assist us in operating our website or conducting our business,
                            so long as those parties agree to keep this information strictly confidential.
                        </Text>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>Your Rights</SectionTitle>
                        <Text>
                            You have the right to access, correct, or request the deletion of your personal data at any time.
                            Given the intimate nature of our coordination services, we are committed to honoring these requests
                            swiftly and discreetly.
                        </Text>
                    </ContentSection>

                    <ContentSection>
                        <SectionTitle>Contact Us</SectionTitle>
                        <Text>
                            For questions regarding this policy or your privacy at Adhoc, please contact us at
                            privacy@adhoc-co.com.
                        </Text>
                    </ContentSection>
                </GridCol>
            </GridContainer>
        </PageWrapper>
    );
}
