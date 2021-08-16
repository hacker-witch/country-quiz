import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { Container } from "../Container";
import { Question } from "../Question";
import { QuizFooter } from "../QuizFooter";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { QuizHeader } from "../QuizHeader";
import { QuizBox } from "../QuizBox";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";

const letters = ["a", "b", "c", "d"];

interface QuestionFormProps {
  question: string;
  answerOptions: string[];
  onSubmit: (answer: string) => void;
}

export const QuestionForm = ({
  question,
  answerOptions,
  onSubmit,
}: QuestionFormProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(answerOptions[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(checkedAnswer);
  };

  return (
    <Page>
      <Container>
        <QuizHeader />

        <main>
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
        </main>
      </Container>

      <QuizFooter />
    </Page>
  );
};

const Fieldset = styled.fieldset`
  border: none;
`;
