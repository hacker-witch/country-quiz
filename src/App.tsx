import styled from 'styled-components';
import { ReactComponent as Illustration } from 'img/header-illustration.svg';

export const App = () => (
  <Wrapper>
    <Header>
      <Heading>COUNTRY QUIZ</Heading>
      <StyledIllustration />
    </Header>
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 29rem;
  
  @media (min-width: 31rem) {
    padding: 0;
  }
`;

const StyledIllustration = styled(Illustration)`
  display: none;
  
  @media (min-width: 31rem) {
    display: block;
  }
`;

const Header = styled.header`
  display: flex;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  
  @media (min-width: 31rem) {
    font-size: 2.25rem;
  }
`;
