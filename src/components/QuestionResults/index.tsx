import { Page } from "../Page";
import { Question } from "../Question";
import { Button } from "../Button";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { AnswerOptionItem } from "./AnswerOptionItem";

const letters = ["a", "b", "c", "d"];

interface QuestionResultsProps {
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  correctAnswer: string;
  finishQuiz: () => void;
  continueQuiz: () => void;
}

export const QuestionResults = ({
  question,
  answerOptions,
  chosenAnswer,
  correctAnswer,
  finishQuiz,
  continueQuiz,
}: QuestionResultsProps) => (
  <Page>
    <Question>{question}</Question>

    <AnswerOptionsGroup as="ol">
      {answerOptions.map((answer, index) => (
        <AnswerOptionItem
          key={index}
          letter={letters[index]}
          value={answer}
          wasChosen={answer === chosenAnswer}
          isCorrect={answer === correctAnswer}
        />
      ))}
    </AnswerOptionsGroup>

    <Button
      type="button"
      onClick={(e) =>
        chosenAnswer === correctAnswer ? continueQuiz() : finishQuiz()
      }
    >
      Next
    </Button>
  </Page>
);
