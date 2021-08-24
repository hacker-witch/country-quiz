import { FormEvent } from "react";
import styled from "styled-components";
import { QuestionTitle } from "../QuestionTitle";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";

const letters = ["a", "b", "c", "d"];

interface QuizFormProps {
  flag?: string;
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  chooseAnswer: (answer: string) => void;
  answerQuestion: () => void;
}

export const QuizForm = ({
  flag,
  question,
  answerOptions,
  chosenAnswer,
  chooseAnswer,
  answerQuestion,
}: QuizFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion();
  };

  return (
    <form onSubmit={handleSubmit}>
      {flag ? <Flag src={flag} alt="" /> : null}
      <Fieldset>
        <QuestionTitle as="legend">{question}</QuestionTitle>
        <AnswerOptionsGroup>
          {answerOptions.map((option, index) => (
            <AnswerOptionField
              key={index}
              letter={letters[index]}
              value={option}
              isChecked={option === chosenAnswer}
              onChange={(_) => chooseAnswer(option)}
            />
          ))}
        </AnswerOptionsGroup>
      </Fieldset>

      <SubmitAnswerButton type="submit">Submit</SubmitAnswerButton>
    </form>
  );
};

const Fieldset = styled.fieldset`
  border: none;
`;

const Flag = styled.img`
  margin-bottom: 1.75rem;
  width: 5.25rem;
  height: 3.375rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 1.5rem 0 #0000001a;
`;

const SubmitAnswerButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
