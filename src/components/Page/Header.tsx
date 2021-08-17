import styled from "styled-components";
import { ReactComponent as Illustration } from "img/header-illustration.svg";

export const Header = () => (
  <Wrapper>
    <Heading>COUNTRY QUIZ</Heading>
    <StyledIllustration />
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  align-items: start;
  padding: 2rem 0;

  @media (min-width: 31rem) {
    position: relative;
    top: 42px;
    padding: 0;
  }
`;

const Heading = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #f2f2f2;

  @media (min-width: 31rem) {
    text-align: left;
    position: relative;
    top: 0.625rem;
  }
`;

const StyledIllustration = styled(Illustration)`
  display: none;

  @media (min-width: 31rem) {
    display: block;
  }
`;
