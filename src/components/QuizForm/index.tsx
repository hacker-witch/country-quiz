import styled from 'styled-components';

interface QuizFormProps {
  question: string;
}

export const QuizForm = ({ question }: QuizFormProps) => (
  <Form>
    <Fieldset>
      <Legend>{question}</Legend>
    </Fieldset>
  </Form>
)

const Form = styled.form`
  padding: 4.25rem 2rem;
  background: #fff;
  border-radius: 1.5rem;
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2F527B;
`;