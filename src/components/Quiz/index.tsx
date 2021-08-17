import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { Question } from "../Question";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { QuizBox } from "../QuizBox";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";

const letters = ["a", "b", "c", "d"];

interface QuizProps {
  question: string;
  answerOptions: string[];
  onSubmit: (answer: string) => void;
}

export const Quiz = ({ question, answerOptions, onSubmit }: QuizProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(answerOptions[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(checkedAnswer);
  };

  return (
    <Page>
      <QuizBox as="form" onSubmit={handleSubmit}>
        <Fieldset>
          <Question as="legend">{question}</Question>
          <AnswerOptionsGroup>
            {answerOptions.map((option, index) => (
              <AnswerOptionField
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
    </Page>
  );
};

const Fieldset = styled.fieldset`
  border: none;
`;
