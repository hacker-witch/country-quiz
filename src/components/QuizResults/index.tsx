import { Page } from "../Page";
import styled from "styled-components";
import { ReactComponent as Illustration } from "img/results-illustration.svg";

export const QuizResults = () => (
  <Page withHeaderIllustration={false}>
    <StyledIllustration />
    <Heading>Results</Heading>
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
