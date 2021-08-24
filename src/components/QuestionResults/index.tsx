import styled from "styled-components";
import { Page } from "../Page";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOptionItem } from "./AnswerOptionItem";
import { Question as IQuestion } from "quiz";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  question: IQuestion;
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
    <Question as="div">{question}</Question>

    <AnswerOptionsGroup as="ol">
      {question.answerOptions.map((answer, index) => (
        <AnswerOptionItem
          key={index}
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
