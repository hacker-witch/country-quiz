import styled from 'styled-components';

interface QuizFormProps {
  question: string;
}

export const QuizForm = ({ question }: QuizFormProps) => (
  <Form>
    <Fieldset>
      <legend>{question}</legend>
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