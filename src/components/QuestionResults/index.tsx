import { QuizBox } from "../QuizBox";
import { Question } from "../Question";
import { Button } from "../Button";

interface QuestionResultsProps {
  question: string;
}

export const QuestionResults = ({ question }: QuestionResultsProps) => (
  <QuizBox>
    <Question>{question}</Question>
    <Button type="button">Next</Button>
  </QuizBox>
);
