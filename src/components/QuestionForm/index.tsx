import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Question } from "../Question";
import { AnswerOption } from "../AnswerOption";
import { QuizBox } from "../QuizBox";

const letters = ["a", "b", "c", "d"];

interface QuestionFormProps {
  question: string;
  answerOptions: string[];
}

export const QuestionForm = ({
  question,
  answerOptions,
}: QuestionFormProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(answerOptions[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <QuizBox as="form" onSubmit={handleSubmit}>
      <Fieldset>
        <Question as="legend">{question}</Question>
        <AnswerOptionsGroup>
          {answerOptions.map((option, index) => (
            <AnswerOption
              key={index}
              letter={letters[index]}
              value={option}
              isChecked={option === checkedAnswer}
              onChange={(_) => setCheckedAnswer(option)}
            />
          ))}
        </AnswerOptionsGroup>
      </Fieldset>

      <Button type="submit">Submit</Button>
    </QuizBox>
  );
};

const AnswerOptionsGroup = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1.5625rem;
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const Button = styled.button`
  display: block;
  margin-top: 1.5rem;
  margin-left: auto;
  padding: 1rem 2.25rem;
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  background: #bbb;

  :hover {
    cursor: pointer;
  }

  :focus,
  :hover {
    outline: none;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    background: #f9a826;
  }
`;