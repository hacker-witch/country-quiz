import { FormEvent } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { QuestionTitle } from "../QuestionTitle";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";
import { Flag as BaseFlag } from "../Flag";

const letters = ["a", "b", "c", "d"];

interface QuestionPageProps {
  flag?: string;
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  chooseAnswer: (answer: string) => void;
  answerQuestion: () => void;
}

export const QuestionPage = ({
  flag,
  question,
  answerOptions,
  chosenAnswer,
  chooseAnswer,
  answerQuestion,
}: QuestionPageProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion();
  };

  return (
    <Page>
      {flag ? <Flag src={flag} alt="" /> : null}
      <form onSubmit={handleSubmit}>
        <Fieldset>
          <QuestionTitle as="legend">{question}</QuestionTitle>
          <AnswerOptionsGroup>
            {answerOptions.map((option, index) => (
              <AnswerOptionField
                key={option}
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
    </Page>
  );
};

const Flag = styled(BaseFlag)`
  margin-bottom: 1.75rem;
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const SubmitAnswerButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
