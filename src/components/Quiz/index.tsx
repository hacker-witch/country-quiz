import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { Question } from "../Question";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";

const letters = ["a", "b", "c", "d"];

interface QuizProps {
  flag?: string;
  question: string;
  answerOptions: string[];
  onSubmit: (answer: string) => void;
}

export const Quiz = ({
  flag,
  question,
  answerOptions,
  onSubmit,
}: QuizProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(answerOptions[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(checkedAnswer);
  };

  return (
    <Page>
      <form onSubmit={handleSubmit}>
        {flag ? <Flag src={flag} alt="" /> : null}
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

        <SubmitAnswerButton type="submit">Submit</SubmitAnswerButton>
      </form>
    </Page>
  );
};

const Fieldset = styled.fieldset`
  border: none;
`;

const Flag = styled.img`
  margin-bottom: 28px;
  width: 84px;
  height: 54px;
  border-radius: 4px;
  box-shadow: 0px 4px 24px 0px #0000001a;
`;

const SubmitAnswerButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
