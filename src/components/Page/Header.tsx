import styled from "styled-components";
import { ReactComponent as Illustration } from "img/header-illustration.svg";

interface HeaderProps {
  withIllustration: boolean;
}

export const Header = ({ withIllustration }: HeaderProps) => (
  <Wrapper>
    <Heading>COUNTRY QUIZ</Heading>
    {withIllustration ? <StyledIllustration /> : null}
  </Wrapper>
);

const Wrapper = styled.header`
  padding: 2rem 0;
  position: relative;

  @media (min-width: 31rem) {
    padding: 0;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #f2f2f2;

  @media (min-width: 31rem) {
    text-align: left;
  }
`;

const StyledIllustration = styled(Illustration)`
  display: none;
  position: absolute;
  top: -0.5rem;
  right: 0;

  @media (min-width: 31rem) {
    display: block;
  }
`;
