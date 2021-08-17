import styled, { css } from "styled-components";
import { ReactComponent as Illustration } from "img/header-illustration.svg";

interface HeaderProps {
  withIllustration: boolean;
}

export const Header = ({ withIllustration }: HeaderProps) => (
  <Wrapper withIllustration={withIllustration}>
    <Heading withIllustration={withIllustration}>COUNTRY QUIZ</Heading>
    {withIllustration ? <StyledIllustration /> : null}
  </Wrapper>
);

const withIllustrationStyles = {
  wrapper: css`
    @media (min-width: 31rem) {
      position: relative;
      top: 2.625rem;
      padding: 0;
    }
  `,

  heading: css`
    @media (min-width: 31rem) {
      position: relative;
      top: 0.625rem;
    }
  `,
};

interface WrapperProps {
  withIllustration: boolean;
}

const Wrapper = styled.header<WrapperProps>`
  display: flex;
  align-items: start;
  padding: 2rem 0;

  @media (min-width: 31rem) {
    padding: 0;
  }

  ${(props) => (props.withIllustration ? withIllustrationStyles.wrapper : null)}
`;

interface HeadingProps {
  withIllustration: boolean;
}

const Heading = styled.h1<HeadingProps>`
  flex: 1;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #f2f2f2;

  @media (min-width: 31rem) {
    text-align: left;
  }

  ${(props) => (props.withIllustration ? withIllustrationStyles.heading : null)}
`;

const StyledIllustration = styled(Illustration)`
  display: none;

  @media (min-width: 31rem) {
    display: block;
  }
`;
