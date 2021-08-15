import { QuizBox } from "../QuizBox";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOption, Letter, Value } from "../AnswerOption";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  question: string;
  answerOptions: string[];
}

export const QuestionResults = ({
  question,
  answerOptions,
}: QuestionResultsProps) => (
  <QuizBox>
    <Question>{question}</Question>

    <AnswerOptionsGroup as="ol">
      {answerOptions.map((answer, index) => (
        <AnswerOptionItem key={index} letter={letters[index]} value={answer} />
      ))}
    </AnswerOptionsGroup>

    <Button type="button">Next</Button>
  </QuizBox>
);

interface AnswerOptionItemProps {
  letter: string;
  value: string;
}

const AnswerOptionItem = ({ letter, value }: AnswerOptionItemProps) => (
  <AnswerOption as="li">
    <Letter>{letter}</Letter>
    <Value>{value}</Value>
  </AnswerOption>
);
