import styled, { keyframes } from "styled-components";
import { Page } from "../Page";

export const LoadingPage = () => (
  <Page>
    <Container>
      <Spinner aria-label="Loading..." />
    </Container>
  </Page>
);

const Container = styled.div`
  height: 28.0625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 9.375rem;
  height: 9.375rem;

  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.5rem solid transparent;
    border-top-color: rgba(96, 102, 208, 0.8);
    animation: ${spin} 1s infinite linear;
  }
`;
