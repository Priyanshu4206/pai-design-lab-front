import React, { useState } from 'react';
import styled from 'styled-components';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Phone, Mail, Send, CheckCircle, Check } from 'lucide-react';
import useScrollToTop from '../../hooks/useScrollToTop';

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--architect-dark);
`;

const HeroSection = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const ContainerWide = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  @media (min-width: 768px){
    font-size: 3rem;
  }
  @media (min-width: 1024px) { 
    font-size: 3.75rem;
  }
  color: white;
  margin-bottom: 1.5rem;

  span {
    font-family: 'Playfair Display', Times, serif;
    background: linear-gradient(to right, white, white, rgba(193, 164, 96, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  max-width: 36rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 3fr;
  }
`;

const ContactBox = styled.div`
  background-color: rgba(50, 50, 50, 0.1);
  border-radius: 0.125rem;
  padding: 2rem;
  border: 1px solid rgba(70, 70, 70, 0.2);
  height: 100%;
`;

const BoxTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 200;
  color: white;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  padding: 0.75rem;
  border-radius: 9999px;
  background-color: rgba(70, 70, 70, 0.2);
  margin-right: 1rem;
`;

const ContactText = styled.div``;

const ContactLabel = styled.h4`
  color: white;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;

const ContactLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  &:hover {
    color: #d9a24a;
  }
`;

const PhoneNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const PhoneNumber = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d9a24a;
  }
`;

const PhoneIcon = styled(Phone)`
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  
  ${PhoneNumber}:hover & {
    color: #d9a24a;
  }
`;

const OfficeHours = styled.div`
  margin-top: 3rem;
`;

const FormGroup = styled.div`
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormField = styled.div``;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: rgba(70, 70, 70, 0.2);
  border: 1px solid rgba(70, 70, 70, 0.3);
  border-radius: 0.125rem;
  padding: 0.75rem 1rem;
  color: white;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: rgba(217, 162, 74, 0.6);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: rgba(70, 70, 70, 0.2);
  border: 1px solid rgba(70, 70, 70, 0.3);
  border-radius: 0.125rem;
  padding: 0.75rem 1rem;
  color: white;
  outline: none;
  transition: border-color 0.3s ease;
  resize: none;
  &:focus {
    border-color: rgba(217, 162, 74, 0.6);
  }
`;

const SubmitButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
  border-radius: 2px;
  transition: letter-spacing 0.3s ease-in-out, transform 1s ease-in-out;
  overflow: hidden;
  padding: 0.75rem 1.5rem;
  border-radius: 0.125rem;
  font-weight: 200;
  font-size: 1rem;
  transition: all 0.1s ease;
  min-width: 200px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    color: var(--color-mainBg);
    background-color: var(--color-primary);
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const SuccessContent = styled.div`
  text-align: center;
`;

const SuccessTitle = styled.h4`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;

// Phone number component with call functionality
const CallablePhoneNumber = ({ number }) => {
  // Format the number for tel: link by removing spaces
  const formattedNumber = number.replace(/\s+/g, '');

  return (
    <PhoneNumberWrapper>
      <PhoneNumber href={`tel:${formattedNumber}`}>
        {number}
        <PhoneIcon size={14} />
      </PhoneNumber>
    </PhoneNumberWrapper>
  );
};

// Main Component
const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  useScrollToTop();

  return (
    <PageWrapper>
      <HeroSection>
        <Container>
          <Title><span>Contact Us</span></Title>
          <Subtitle>
            Get in touch with our team to discuss your architectural needs and how we can help bring your vision to life.
          </Subtitle>
        </Container>

        <ContainerWide>
          <Grid>
            <AnimatedSection direction="left">
              <ContactBox>
                <BoxTitle>Let's create something amazing together</BoxTitle>

                <ContactDetails>
                  <ContactItem>
                    <IconWrapper>
                      <MapPin className="h-5 w-5" style={{ color: '#d9a24a' }} />
                    </IconWrapper>
                    <ContactText>
                      <ContactLabel>Our Location</ContactLabel>
                      <ContactValue>
                        12th Floor, Gold Tower, Wave Noida,<br />
                        Sector-18, Noida, Uttar Pradesh
                      </ContactValue>
                    </ContactText>
                  </ContactItem>

                  <ContactItem>
                    <IconWrapper>
                      <Mail className="h-5 w-5" style={{ color: '#d9a24a' }} />
                    </IconWrapper>
                    <ContactText>
                      <ContactLabel>Email Us</ContactLabel>
                      <ContactLink href="mailto:info@paidesignstudio.com">info@paidesignstudio.com</ContactLink>
                    </ContactText>
                  </ContactItem>

                  <ContactItem>
                    <IconWrapper>
                      <Phone className="h-5 w-5" style={{ color: '#d9a24a' }} />
                    </IconWrapper>
                    <ContactText>
                      <ContactLabel>Call Us</ContactLabel>
                      <CallablePhoneNumber number="+91 97181 22864" />
                      <CallablePhoneNumber number="+91 99990 33566" />
                      <CallablePhoneNumber number="+91 87556 44379" />
                    </ContactText>
                  </ContactItem>
                </ContactDetails>

                <OfficeHours>
                  <ContactLabel>Office Hours</ContactLabel>
                  <ContactValue style={{ marginBottom: '0.5rem' }}>Monday - Friday: 9am - 6pm</ContactValue>
                  <ContactValue>Saturday: By appointment only</ContactValue>
                </OfficeHours>
              </ContactBox>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <ContactBox>
                <BoxTitle>Send us a message</BoxTitle>

                {isSubmitted ? (
                  <SuccessMessage>
                    <SuccessContent>
                      <CheckCircle style={{ height: '4rem', width: '4rem', color: '#d9a24a', margin: '0 auto 1rem auto' }} />
                      <SuccessTitle>Thank You!</SuccessTitle>
                      <SuccessText>Your message has been sent successfully. We'll get back to you soon.</SuccessText>
                    </SuccessContent>
                  </SuccessMessage>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <FormField>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </FormField>
                      <FormField>
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </FormField>
                    </FormGroup>

                    <FormField style={{ marginBottom: '1.5rem' }}>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                      />
                    </FormField>

                    <FormField style={{ marginBottom: '2rem' }}>
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </FormField>

                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <svg className="animate-spin" style={{ marginLeft: '-0.25rem', marginRight: '0.75rem', height: '1.25rem', width: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          Send Message
                          <Send style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem', transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1" />
                        </span>
                      )}
                    </SubmitButton>
                  </form>
                )}
              </ContactBox>
            </AnimatedSection>
          </Grid>
        </ContainerWide>
      </HeroSection>
    </PageWrapper>
  );
};

export default ContactPage;