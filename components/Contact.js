'use client';

import styled from 'styled-components';
import { GridContainer, GridCol } from '@/components/Grid';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';

const SectionWrapper = styled.section`
  color: #fff;
  padding: 6rem 0; /* Reduced from 8rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Headline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: 3.75rem; /* 60px */
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 3.5rem; /* Middle ground established */
  color: #fff;
  
  em {
    font-family: "ivyora-display", serif;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem; /* Middle ground established */
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 0; /* Middle ground established */
  color: #fff;
  font-family: "sofia-pro", sans-serif;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  
  &:focus {
    border-bottom-color: #fff;
  }
`;

const OptionsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0; /* Reduced from 3rem */
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-family: "sofia-pro", sans-serif;
  font-size: 0.9rem;
  
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    
    &:checked {
      border-color: #fff;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  border: none;
  border-bottom: 1.5px solid #fff;
  color: #fff;
  padding: 0.6rem 0; /* Reduced padding */
  font-family: "sofia-pro", sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem; /* Reduced from 2rem */

  &:hover {
    gap: 1.5rem;
    color: #ee552f;
    border-bottom-color: #ee552f;
    
    svg {
      fill: #ee552f;
    }
  }
`;

const Disclaimer = styled.p`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <GridContainer>
        <GridCol $start={3} $span={8}>
          <Headline>Get on the list and<br /><em>get your life back.</em></Headline>
        </GridCol>

        <GridCol $start={4} $span={6}>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Full name</Label>
              <Input type="text" id="name" name="name" required placeholder="John Doe" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required placeholder="john@example.com" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="zip">Zip Code</Label>
              <Input type="text" id="zip" name="zip" required placeholder="90210" />
            </FormGroup>

            <OptionsGrid>
              <Option>
                <input type="radio" name="membership" value="Essential" />
                Essential
              </Option>
              <Option>
                <input type="radio" name="membership" value="Elevated" />
                Elevated
              </Option>
              <Option>
                <input type="radio" name="membership" value="Exclusive" />
                Exclusive
              </Option>
            </OptionsGrid>

            <SubmitButton type="submit">
              START THE CONVERSATION <ArrowHorizontal width="25px" color="#ee552f" />
            </SubmitButton>
          </Form>
          <Disclaimer>We respect your privacy. No spam, ever.</Disclaimer>
        </GridCol>
      </GridContainer>
    </SectionWrapper>
  );
}
