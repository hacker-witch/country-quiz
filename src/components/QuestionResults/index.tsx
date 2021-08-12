import { QuizBox } from "../QuizBox";
import { Question } from "../Question";

interface QuestionResultsProps {
  question: string;
}

export const QuestionResults = ({ question }: QuestionResultsProps) => (
  <QuizBox>
    <Question>{question}</Question>
  </QuizBox>
);
