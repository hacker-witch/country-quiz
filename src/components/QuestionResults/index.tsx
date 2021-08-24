import styled from "styled-components";
import { Page } from "../Page";
import { QuestionTitle } from "../QuestionTitle";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOptionItem } from "./AnswerOptionItem";
import { Flag } from "../Flag";
import { Question } from "types";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  question: Question;
  chosenAnswer: string;
  finishQuiz: () => void;
  continueQuiz: () => void;
}

export const QuestionResults = ({
  question,
  chosenAnswer,
  finishQuiz,
  continueQuiz,
}: QuestionResultsProps) => (
  <Page>
    {question.flag ? <Flag src={question.flag} alt="" /> : null}
    <QuestionTitle as="div">{question.title}</QuestionTitle>

    <AnswerOptionsGroup as="ol">
      {question.answerOptions.map((answer, index) => (
        <AnswerOptionItem
          key={answer}
          letter={letters[index]}
          value={answer}
          wasChosen={answer === chosenAnswer}
          isCorrect={answer === question.correctAnswer}
        />
      ))}
    </AnswerOptionsGroup>

    <NextQuestionButton
      type="button"
      onClick={(e) =>
        chosenAnswer === question.correctAnswer ? continueQuiz() : finishQuiz()
      }
    >
      Next
    </NextQuestionButton>
  </Page>
);

const NextQuestionButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
