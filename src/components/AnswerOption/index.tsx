import { FormEvent } from "react";
import styled from "styled-components";

const baseStyles = `
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

interface AnswerOptionProps {
  letter: string;
  value: string;
  isChecked: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const AnswerOption = ({
  letter,
  value,
  isChecked,
  onChange,
}: AnswerOptionProps) => {
  const id = `answer-option-${letter}`;
  return (
    <Wrapper>
      <Input
        type="radio"
        id={id}
        name="answerOption"
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <Label htmlFor={id}>
        <Letter>{letter}</Letter>
        <Value>{value}</Value>
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Letter = styled.span`
  margin-right: 2.875rem;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Value = styled.span`
  text-transform: capitalize;
`;

const Input = styled.input`
  appearance: none;
`;

const Label = styled.label`
  flex: 1;
  ${baseStyles};

  :hover,
  ${Input}:checked + & {
    cursor: pointer;
    background: #f9a826;
    color: #fff;
    border-color: #f9a826;
  }

  ${Input}:focus + & {
    box-shadow: 0 0 0 0.25rem rgba(249, 168, 38, 0.4);
  }
`;
