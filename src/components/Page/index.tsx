import { ReactNode } from "react";
import styled from "styled-components";
import { Container } from "../Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageProps {
  children: ReactNode;
  withHeaderIllustration?: boolean;
}

export const Page = ({
  children,
  withHeaderIllustration = true,
}: PageProps) => (
  <Wrapper>
    <Container>
      <Header />
      <QuizBox>{children}</QuizBox>
    </Container>
    <Footer />
  </Wrapper>
);

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const QuizBox = styled.main`
  padding: 2rem;
  background: #fff;
  border-radius: 1.5rem;
`;
