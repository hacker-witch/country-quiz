import { ReactNode, useRef } from "react";
import { TransitionGroup, Transition } from "react-transition-group";
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

const AnswerResult = ({ isCorrect, children }: AnswerResultProps) => {
  const nodeRef = useRef(null);
  return (
    <TransitionGroup component={null}>
      <Transition nodeRef={nodeRef} timeout={0} appear>
        {(state) =>
          isCorrect ? (
            <CorrectAnswer as="li" transitionState={state}>
              {children}
              <Icon src={correctIcon} alt="This answer is correct!" />
            </CorrectAnswer>
          ) : (
            <WronglyChosenAnswer as="li" transitionState={state}>
              {children}
              <Icon src={wrongIcon} alt="You've chosen the wrong answer!" />
            </WronglyChosenAnswer>
          )
        }
      </Transition>
    </TransitionGroup>
  );
};

const Icon = styled.img`
  fill: #fff;
  margin-left: auto;
`;

interface AnswerProps {
  transitionState: string;
}

const CorrectAnswer = styled(AnswerOption)<AnswerProps>`
  transition-property: color, background-color, border-color;
  transition-duration: 0.3s;
  color: ${(props) =>
    props.transitionState === "entering" ? "rgba(96, 102, 208, 0.8)" : "#fff"};
  background: ${(props) =>
    props.transitionState === "entering" ? "none" : "#60bf88"};
  border-color: ${(props) =>
    props.transitionState === "entering"
      ? "rgba(96, 102, 208, 0.7)"
      : "#60bf88"};
`;

const WronglyChosenAnswer = styled(AnswerOption)<AnswerProps>`
  transition-property: color, background-color, border-color;
  transition-duration: 0.3s;
  color: ${(props) =>
    props.transitionState === "entering" ? "rgba(96, 102, 208, 0.8)" : "#fff"};
  background: ${(props) =>
    props.transitionState === "entering" ? "none" : "#ea8282"};
  border-color: ${(props) =>
    props.transitionState === "entering"
      ? "rgba(96, 102, 208, 0.7)"
      : "#ea8282"};
`;
