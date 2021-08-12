import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Question } from "../Question";
import { AnswerOption } from "../AnswerOption";
import { QuizBox } from "../QuizBox";
import { Button } from "../Button";

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
