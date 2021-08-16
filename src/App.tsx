import { useState } from "react";
import styled from "styled-components";
import { QuestionForm, QuestionResults, QuizHeader } from "components";

const data = {
  question: "Kuala Lumpur is the capital of",
  answerOptions: ["vietnam", "malaysia", "sweden", "austria"],
  correctAnswer: "malaysia",
};

export const App = () => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  return (
    <Wrapper>
      <Container>
        <QuizHeader />

        <main>
          {chosenAnswer ? (
            <QuestionResults
              question={data.question}
              answerOptions={data.answerOptions}
              chosenAnswer={chosenAnswer}
              correctAnswer={data.correctAnswer}
            />
          ) : (
            <QuestionForm
              question={data.question}
              answerOptions={data.answerOptions}
              onSubmit={(answer) => setChosenAnswer(answer)}
            />
          )}
        </main>
      </Container>

      <Footer>
        created by <Username>hacker-witch</Username> - devChallenges.io
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  max-width: 29rem;

  @media (min-width: 31rem) {
    padding: 0;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1.8125rem 0;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #f2f2f2;
`;

const Username = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;
