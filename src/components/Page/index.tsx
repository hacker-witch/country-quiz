import { ReactNode } from "react";
import styled from "styled-components";
import { Container } from "../Container";
import { Header } from "./Header";
import { QuizFooter } from "../QuizFooter";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <Wrapper>
    <Container>
      <Header />
      <main>{children}</main>
    </Container>
    <QuizFooter />
  </Wrapper>
);

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
