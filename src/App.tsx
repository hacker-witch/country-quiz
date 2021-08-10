import styled from 'styled-components';
import { QuizForm } from 'components';
import { ReactComponent as Illustration } from 'img/header-illustration.svg';

const data = {
  question: 'Kuala Lumpur is the capital of',
  answerOptions: ['vietnam', 'malaysia', 'sweden', 'austria'],
  correctAnswer: 'malaysia'
}

export const App = () => (
  <Wrapper>
    <Container>
      <Header>
        <Heading>COUNTRY QUIZ</Heading>
        <StyledIllustration />
      </Header>
      
      <main>
        <QuizForm
          question={data.question}
          answerOptions={data.answerOptions}
        />
      </main>
    </Container>
    
    <Footer>
      created by <Username>hacker-witch</Username> - devChallenges.io
    </Footer>
  </Wrapper>
);

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
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
  align-items: start;
  
  @media (min-width: 31rem) {
    position: relative;
    top: 42px;
  }
`;

const Heading = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #F2F2F2;
  
  @media (min-width: 31rem) {
    text-align: left;
    position: relative;
    top: 0.625rem;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1.8125rem 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #F2F2F2;
`;

const Username = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;
