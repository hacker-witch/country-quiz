import { Page } from "../Page";
import styled from "styled-components";
import { ReactComponent as Illustration } from "img/results-illustration.svg";

export const QuizResults = () => (
  <Page withHeaderIllustration={false}>
    <StyledIllustration />
  </Page>
);

const StyledIllustration = styled(Illustration)`
  display: block;
  margin: 1.625rem auto 0 auto;
`;
