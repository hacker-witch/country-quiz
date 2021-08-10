import styled from 'styled-components';

interface AnswerOptionProps {
  letter: string;
  value: string;
}

export const AnswerOption = ({ letter, value }: AnswerOptionProps) => {
  const id = `answer-option-${letter}`;
  return (
    <Wrapper>
      <Input type="radio" id={id} name="answerOption" value={value} />
      <Label htmlFor={id}>
        <Letter>{letter}</Letter>
        <Value>{value}</Value>
      </Label>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
`;

const Letter = styled.span`
  margin-right: 2.875rem;
  font-size: 1.5rem;
  text-transform: uppercase;
`

const Value = styled.span`
  text-transform: capitalize;
`;

const Input = styled.input`
  appearance: none;
`;

const Label = styled.label`
  flex: 1;
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(96, 102, 208, 0.8);
  border: 0.125rem solid rgba(96, 102, 208, 0.7);
  border-radius: 0.75rem;
  
  :hover, ${Input}:focus + & {
    cursor: pointer;
    background: #F9A826;
    color: #fff;
    border-color: #F9A826;
  }
`;