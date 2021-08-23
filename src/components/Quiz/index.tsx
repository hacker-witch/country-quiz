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
  chosenAnswer: string;
  answerQuestion: (answer: string) => void;
}

export const Quiz = ({
  flag,
  question,
  answerOptions,
  chosenAnswer,
  answerQuestion,
}: QuizProps) => {
  return (
    <Page>
      <QuizForm
        flag={flag}
        question={question}
        answerOptions={answerOptions}
        chosenAnswer={chosenAnswer}
        answerQuestion={answerQuestion}
      />
    </Page>
  );
};

interface QuizFormProps extends QuizProps {}

const QuizForm = ({
  flag,
  question,
  answerOptions,
  chosenAnswer,
  answerQuestion,
}: QuizFormProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(chosenAnswer);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion(checkedAnswer);
  };

  return (
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
