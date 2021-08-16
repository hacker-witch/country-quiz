import { useState } from "react";
import styled from "styled-components";
import { QuestionForm, QuestionResults, QuizFooter } from "components";

const data = {
  question: "Kuala Lumpur is the capital of",
  answerOptions: ["vietnam", "malaysia", "sweden", "austria"],
  correctAnswer: "malaysia",
};

export const App = () => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState("ANSWERING");

  switch (quizStatus) {
    case "ANSWERING":
      return (
        <Wrapper>
          <Container>
            <main>
              <QuestionForm
                question={data.question}
                answerOptions={data.answerOptions}
                onSubmit={(answer) => setChosenAnswer(answer)}
              />
            </main>
          </Container>

          <QuizFooter />
        </Wrapper>
      );

    case "VIEWING_RESULTS":
      return (
        <Wrapper>
          <Container>
            <main>
              <QuestionResults
                question={data.question}
                answerOptions={data.answerOptions}
                chosenAnswer={chosenAnswer!}
                correctAnswer={data.correctAnswer}
              />
            </main>
          </Container>

          <QuizFooter />
        </Wrapper>
      );

    default:
      return null;
  }
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
