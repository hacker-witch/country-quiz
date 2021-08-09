import styled from 'styled-components';
import { ReactComponent as Illustration } from 'img/header-illustration.svg';

export const App = () => (
  <header>
    <Container>
      <Heading>COUNTRY QUIZ</Heading>
      <Illustration />
    </Container>
  </header>
);

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 29rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  
  @media (min-width: 29rem) {
    font-size: 2.25rem;
  }
`;
