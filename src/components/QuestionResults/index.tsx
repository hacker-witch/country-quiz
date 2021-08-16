import { Page } from "../Page";
import { Container } from "../Container";
import { QuizHeader } from "../QuizHeader";
import { QuizFooter } from "../QuizFooter";
import { QuizBox } from "../QuizBox";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOptionItem } from "./AnswerOptionItem";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  correctAnswer: string;
}

export const QuestionResults = ({
  question,
  answerOptions,
  chosenAnswer,
  correctAnswer,
}: QuestionResultsProps) => (
  <Page>
    <Container>
      <QuizHeader />

      <QuizBox as="main">
        <Question>{question}</Question>

        <AnswerOptionsGroup as="ol">
          {answerOptions.map((answer, index) => (
            <AnswerOptionItem
              key={index}
              letter={letters[index]}
              value={answer}
              wasChosen={answer === chosenAnswer}
              isCorrect={answer === correctAnswer}
            />
          ))}
        </AnswerOptionsGroup>

        <Button type="button">Next</Button>
      </QuizBox>
    </Container>

    <QuizFooter />
  </Page>
);
