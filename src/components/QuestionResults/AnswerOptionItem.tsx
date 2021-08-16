import { ReactNode } from "react";
import styled from "styled-components";
import { AnswerOption, Letter, Value } from "../AnswerOption";
import correctIcon from "img/check-circle-rounded-icon.svg";
import wrongIcon from "img/highlight-off-rounded-icon.svg";

interface AnswerOptionItemProps {
  letter: string;
  value: string;
  wasChosen: boolean;
  isCorrect: boolean;
}

export const AnswerOptionItem = ({
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
      <Icon src={correctIcon} alt="This answer is correct!" />
    </CorrectAnswer>
  ) : (
    <WronglyChosenAnswer as="li">
      {children}
      <Icon src={wrongIcon} alt="You've chosen the wrong answer!" />
    </WronglyChosenAnswer>
  );

const Icon = styled.img`
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
