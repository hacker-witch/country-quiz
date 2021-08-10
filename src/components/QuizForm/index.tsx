import styled from 'styled-components';
import { AnswerOption } from '../AnswerOption';

const letters =['a', 'b', 'c', 'd'];

interface QuizFormProps {
  question: string;
  answerOptions: string[];
}

export const QuizForm = ({ question, answerOptions }: QuizFormProps) => (
  <Form>
    <Fieldset>
      <Legend>{question}</Legend>
      <AnswerOptionsGroup>
        {answerOptions.map((option, index) => (
          <AnswerOption key={index} letter={letters[index]} value={option} />
        ))}
      </AnswerOptionsGroup>
    </Fieldset>
  </Form>
)

const Form = styled.form`
  padding: 4.25rem 2rem;
  background: #fff;
  border-radius: 1.5rem;
`;

const AnswerOptionsGroup = styled.div`
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