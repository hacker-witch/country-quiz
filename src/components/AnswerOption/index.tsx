import { FormEvent } from "react";
import styled, { css } from "styled-components";

export const AnswerOption = styled.div`
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(96, 102, 208, 0.8);
  border: 0.125rem solid rgba(96, 102, 208, 0.7);
  border-radius: 0.75rem;
`;

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

export const Letter = styled.span`
  margin-right: 2.875rem;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

export const Value = styled.span`
  text-transform: capitalize;
`;

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
