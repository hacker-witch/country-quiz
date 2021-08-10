import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { AnswerOption } from '../AnswerOption';

const letters =['a', 'b', 'c', 'd'];

interface QuizFormProps {
  question: string;
  answerOptions: string[];
}

export const QuizForm = ({ question, answerOptions }: QuizFormProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(answerOptions[0]);
  const [wasAnswered, setWasAnswered] = useState(false);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasAnswered(true);
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>{question}</Legend>
        <AnswerOptionsGroup>
          {answerOptions.map((option, index) => (
            <AnswerOption
              key={index}
              letter={letters[index]}
              value={option}
              isChecked={option === checkedAnswer}
              onChange={_ => setCheckedAnswer(option)}
            />
          ))}
        </AnswerOptionsGroup>
      </Fieldset>
      
      <Button type="submit">Submit</Button>
    </Form>
  )
};

const Form = styled.form`
  padding: 4.25rem 2rem 2rem 2rem;
  background: #fff;
  border-radius: 1.5rem;
`;

const AnswerOptionsGroup = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1.5625rem;
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2F527B;
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
  
  :focus, :hover {
    outline: none;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    background: #F9A826;
  }
`;