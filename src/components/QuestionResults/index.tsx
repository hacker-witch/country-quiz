import { ReactNode } from "react";
import styled from "styled-components";
import { QuizBox } from "../QuizBox";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOption, Letter, Value } from "../AnswerOption";
import { ReactComponent as CheckCircleRoundedIcon } from "img/check-circle-rounded-icon.svg";
import { ReactComponent as HighlightOffRoundedIcon } from "img/highlight-off-rounded-icon.svg";

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
  <QuizBox>
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
);

interface AnswerOptionItemProps {
  letter: string;
  value: string;
  wasChosen: boolean;
  isCorrect: boolean;
}

const AnswerOptionItem = ({
  letter,
  value,
  wasChosen,
  isCorrect,
}: AnswerOptionItemProps) => {
  if (wasChosen || isCorrect) {
    return (
      <AnswerResult isCorrect={isCorrect}>
        <Letter>{letter}</Letter>
        <Value>{value}</Value>
      </AnswerResult>
    );
  }

  return (
    <AnswerOption as="li">
      <Letter>{letter}</Letter>
      <Value>{value}</Value>
    </AnswerOption>
  );
};

interface AnswerResultProps {
  isCorrect: boolean;
  children: ReactNode;
}

const AnswerResult = ({ isCorrect, children }: AnswerResultProps) =>
  isCorrect ? (
    <CorrectAnswer as="li">
      {children}
      <CorrectIcon />
    </CorrectAnswer>
  ) : (
    <WronglyChosenAnswer as="li">
      {children}
      <WrongIcon />
    </WronglyChosenAnswer>
  );

const CorrectIcon = styled(CheckCircleRoundedIcon)`
  fill: #fff;
  margin-left: auto;
`;

const WrongIcon = styled(HighlightOffRoundedIcon)`
  fill: #fff;
  margin-left: auto;
`;

const CorrectAnswer = styled(AnswerOption)`
  color: #fff;
  background: #60bf88;
  border-color: #60bf88;
`;

const WronglyChosenAnswer = styled(AnswerOption)`
  color: #fff;
  background: #ea8282;
  border-color: #ea8282;
`;
