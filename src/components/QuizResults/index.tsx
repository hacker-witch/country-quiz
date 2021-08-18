import { Page } from "../Page";
import styled from "styled-components";
import { ReactComponent as Illustration } from "img/results-illustration.svg";

interface QuizResultsProps {
  correctAnswers: number;
}

export const QuizResults = ({ correctAnswers }: QuizResultsProps) => (
  <Page withHeaderIllustration={false}>
    <StyledIllustration />
    <Heading>Results</Heading>
    <Results>
      You got <CorrectAnswers>{correctAnswers}</CorrectAnswers> correct answers
    </Results>
  </Page>
);

const StyledIllustration = styled(Illustration)`
  display: block;
  margin: 1.625rem auto 0 auto;
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
