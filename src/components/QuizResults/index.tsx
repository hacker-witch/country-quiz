import styled from "styled-components";
import { Page } from "../Page";
import { ReactComponent as Illustration } from "img/results-illustration.svg";

interface QuizResultsProps {
  correctAnswers: number;
  resetQuiz: () => void;
}

export const QuizResults = ({
  correctAnswers,
  resetQuiz,
}: QuizResultsProps) => (
  <Page withHeaderIllustration={false}>
    <StyledIllustration />
    <Heading>Results</Heading>
    <Results>
      You got <CorrectAnswers>{correctAnswers}</CorrectAnswers> correct{" "}
      {correctAnswers > 1 ? "answers" : "answer"}
    </Results>
    <Button onClick={() => resetQuiz()}>Try again</Button>
  </Page>
);

const StyledIllustration = styled(Illustration)`
  display: block;
  margin: 0.625rem auto 0 auto;
`;

const Heading = styled.h2`
  margin-top: 4.5rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: #1d355d;
`;

const Results = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: #1d355d;
`;

const CorrectAnswers = styled.span`
  font-size: 2.25rem;
  font-weight: 700;
  color: #60bf88;
`;

const Button = styled.button`
  display: block;
  margin: 4.4375rem auto 0 auto;
  padding: 1.125rem 3.8125rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d355d;
  border: 0.125rem solid #1d355d;
  border-radius: 0.75rem;
  background: none;
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.3s;

  :hover,
  :focus {
    background: #1d355d;
    color: #fff;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(29, 53, 93, 0.4);
  }
`;
