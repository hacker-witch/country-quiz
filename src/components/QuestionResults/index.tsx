import styled from "styled-components";
import { Page } from "../Page";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOptionItem } from "./AnswerOptionItem";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  flag?: string;
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  correctAnswer: string;
  finishQuiz: () => void;
  continueQuiz: () => void;
}

export const QuestionResults = ({
  question,
  flag,
  answerOptions,
  chosenAnswer,
  correctAnswer,
  finishQuiz,
  continueQuiz,
}: QuestionResultsProps) => (
  <Page>
    {flag ? <Flag src={flag} alt="" /> : null}
    <Question as="div">{question}</Question>

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

    <NextQuestionButton
      type="button"
      onClick={(e) =>
        chosenAnswer === correctAnswer ? continueQuiz() : finishQuiz()
      }
    >
      Next
    </NextQuestionButton>
  </Page>
);

const Flag = styled.img`
  margin-bottom: 1.75rem;
  width: 5.25rem;
  height: 3.375rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 1.5rem 0 #0000001a;
`;

const NextQuestionButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
