'use client';

import { useEffect, useRef, useActionState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridContainer, GridCol } from '@/components/Grid';
import ArrowHorizontal from '@/components/icons/ArrowHorizontal';
import { submitContactForm } from '@/app/actions';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = styled.section`
  color: #fff;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 767px) {
    height: auto;
    min-height: 100vh;
    padding: 100px 0; /* Rely on GridContainer padding */
    text-align: left;
    justify-content: flex-start;
  }
`;

const Headline = styled.h2`
  font-family: "ivyora-display", serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 4rem;
  color: #fff;
  max-width: 740px;
  margin-left: auto;
  margin-right: auto;
  
  em {
    font-family: "ivyora-display", serif;
    font-style: italic;
  }
  
  @media (max-width: 767px) {
    font-size: clamp(2.2rem, 10vw, 3rem);
    margin-bottom: 2rem;
    text-align: center;
    margin-left: 0;
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem; /* Drastically reduced from 1.05rem */
  display: flex;
  flex-direction: column;
  text-align: left;

  @media (max-width: 600px) {
    margin-bottom: 0.4rem; /* Even tighter on mobile */
  }
`;

const Label = styled.label`
  font-family: "sofia-pro", sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 0.2rem 0; /* Reduced from 0.45rem */
  color: #fff;
  font-family: "sofia-pro", sans-serif;
  font-size: 1rem; /* Slightly smaller font for tighter feel */
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
  margin: 1.5rem 0; /* Reduced from 2rem */
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start; /* Left align on mobile */
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
  border-bottom: 1px solid #fff;
  color: #fff;
  padding: 0.4rem 0; /* Standardized with links */
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

export default function Contact({ data = {} }) {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  const {
    contactHeadline = 'Get on the list and',
    contactHeadlineItalic = 'get your life back.',
    nameHint,
    emailHint,
    phoneHint,
    zipHint
  } = data || {};

  // eslint-disable-next-line react-hooks/rules-of-hooks -- verified React 19 usage
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    message: '',
    errors: {}
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      });

      tl.fromTo(elementsRef.current[0], // Headline
        { opacity: 0, filter: 'blur(55px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power4.out" }
      )
        .fromTo(elementsRef.current.slice(1), // Form fields, options, submit, disclaimer
          { opacity: 0, filter: 'blur(25px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
          },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Only run once on mount

  // Reset form on success if needed, or just show success message
  useEffect(() => {
    if (state?.success) {
      // Optional: Reset form logic here if not replacing content
    }
  }, [state?.success]);


  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <SectionWrapper id="contact" ref={sectionRef}>
      <GridContainer>
        <GridCol $start={3} $span={8} $tabletStart={2} $tabletSpan={10} $mobileStart={1} $mobileSpan={12} ref={addToElementsRef}>
          <Headline>
            <span>{contactHeadline}</span><br />
            <em>{contactHeadlineItalic}</em>
          </Headline>
        </GridCol>

        <GridCol $start={4} $span={6} $tabletStart={2} $tabletSpan={10} $mobileStart={1} $mobileSpan={12}>
          {state?.success ? (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <h3 style={{ fontFamily: '"ivyora-display", serif', fontSize: '2rem', marginBottom: '1rem' }}>Thank you!</h3>
              <p style={{ fontFamily: '"sofia-pro", sans-serif' }}>We have received your message and will be in touch shortly.</p>
            </div>
          ) : (
            <Form action={formAction}>
              <FormGroup ref={addToElementsRef}>
                <Label htmlFor="name">Full name</Label>
                <Input type="text" id="name" name="name" required placeholder={nameHint || "John Doe"} />
                {state?.errors?.name && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{state.errors.name[0]}</p>}
              </FormGroup>
              <FormGroup ref={addToElementsRef}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" required placeholder={emailHint || "john@example.com"} />
                {state?.errors?.email && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{state.errors.email[0]}</p>}
              </FormGroup>
              <FormGroup ref={addToElementsRef}>
                <Label htmlFor="phone">Phone</Label>
                <Input type="tel" id="phone" name="phone" placeholder={phoneHint || "+1 (555) 000-0000"} />
              </FormGroup>
              <FormGroup ref={addToElementsRef}>
                <Label htmlFor="zip">Zip Code</Label>
                <Input type="text" id="zip" name="zip" required placeholder={zipHint || "90210"} />
                {state?.errors?.zip && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{state.errors.zip[0]}</p>}
              </FormGroup>

              <OptionsGrid ref={addToElementsRef}>
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

              {state?.message && !state.success && (
                <p style={{ color: '#ff6b6b', marginBottom: '1rem', fontFamily: '"sofia-pro", sans-serif' }}>{state.message}</p>
              )}

              <div ref={addToElementsRef} style={{ display: 'flex' }} className="submit-wrapper">
                <style jsx>{`
                  @media (max-width: 767px) {
                    .submit-wrapper {
                      justify-content: flex-start !important;
                    }
                  }
                  @media (min-width: 768px) {
                    .submit-wrapper {
                      justify-content: center;
                    }
                  }
                `}</style>
                <SubmitButton type="submit" disabled={isPending} style={{ opacity: isPending ? 0.7 : 1 }}>
                  {isPending ? 'SENDING...' : 'START THE CONVERSATION'} <ArrowHorizontal width="25px" color="#ee552f" />
                </SubmitButton>
              </div>
            </Form>
          )}
          <Disclaimer ref={addToElementsRef}>We respect your privacy. No spam, ever.</Disclaimer>
        </GridCol>
      </GridContainer>
    </SectionWrapper>
  );
}
