import { FormEvent } from "react";
import styled, { css } from "styled-components";
import { AnswerOption, Letter, Value } from "../AnswerOption";

interface AnswerOptionFieldProps {
  letter: string;
  value: string;
  isChecked: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const AnswerOptionField = ({
  letter,
  value,
  isChecked,
  onChange,
}: AnswerOptionFieldProps) => {
  const id = `answer-option-${letter}`;
  return (
    <Wrapper>
      <Input
        type="radio"
        id={id}
        name="answerOptionField"
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <AnswerOption as="label" htmlFor={id}>
        <Letter>{letter}</Letter>
        <Value>{value}</Value>
      </AnswerOption>
    </Wrapper>
  );
};

const Input = styled.input`
  appearance: none;
`;

const hoverStyles = css`
  cursor: pointer;
  background: #f9a826;
  color: #fff;
  border-color: #f9a826;
`;

const Wrapper = styled.div`
  display: flex;

  ${AnswerOption} {
    flex: 1;
    transition-property: background-color, border-color, color, box-shadow;
    transition-duration: 0.3s;
  }

  ${AnswerOption}:hover {
    ${hoverStyles}
  }

  ${Input}:checked + ${AnswerOption} {
    ${hoverStyles}
  }

  ${Input}:focus + ${AnswerOption} {
    box-shadow: 0 0 0 0.25rem rgba(249, 168, 38, 0.4);
  }
`;
