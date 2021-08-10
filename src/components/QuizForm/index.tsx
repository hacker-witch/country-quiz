import styled from 'styled-components';

interface QuizFormProps {
  question: string;
}

export const QuizForm = ({ question }: QuizFormProps) => (
  <Form>
    <fieldset>
      <legend>{question}</legend>
    </fieldset>
  </Form>
)

const Form = styled.form`
  padding: 4.25rem 2rem;
  background: #fff;
  border-radius: 1.5rem;
`;