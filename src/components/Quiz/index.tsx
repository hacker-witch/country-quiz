import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { Question } from "../Question";
import { AnswerOptionsGroup } from "../AnswerOptionsGroup";
import { Button } from "../Button";
import { AnswerOptionField } from "./AnswerOptionField";
import { QuestionResults } from "../QuestionResults";
import { QuizResults } from "../QuizResults";
import { Country } from "data";
import { generateQuestionFromCountryList } from "quiz";

const letters = ["a", "b", "c", "d"];

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

interface QuizProps {
  countries: Country[];
}

export const Quiz = ({ countries }: QuizProps) => {
  const initialCurrentQuestion = generateQuestionFromCountryList(countries);
  const [currentQuestion, setCurrentQuestion] = useState(
    initialCurrentQuestion
  );
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  const loadNextQuestion = () => {
    const question = generateQuestionFromCountryList(countries);
    setCurrentQuestion(question);
    setChosenAnswer(question.answerOptions[0]);
  };

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => {
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const resetQuiz = () => {
    setChosenAnswer(null);
    setCorrectAnswers(0);
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const answerQuestion = (answer: string) => {
    setChosenAnswer(answer);
    setQuizStatus(QuizStatus.ViewingQuestionResults);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Page>
          <QuizForm
            flag={currentQuestion.flag}
            question={currentQuestion.title}
            answerOptions={currentQuestion.answerOptions}
            chosenAnswer={chosenAnswer!}
            answerQuestion={answerQuestion}
          />
        </Page>
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion.title}
          flag={currentQuestion.flag ? currentQuestion.flag : undefined}
          answerOptions={currentQuestion.answerOptions}
          chosenAnswer={chosenAnswer!}
          correctAnswer={currentQuestion.correctAnswer}
          finishQuiz={finishQuiz}
          continueQuiz={continueQuiz}
        />
      );

    case QuizStatus.GameOver:
      return (
        <QuizResults correctAnswers={correctAnswers} resetQuiz={resetQuiz} />
      );

    default:
      return null;
  }
};

interface QuizFormProps {
  flag?: string;
  question: string;
  answerOptions: string[];
  chosenAnswer: string;
  answerQuestion: (answer: string) => void;
}

const QuizForm = ({
  flag,
  question,
  answerOptions,
  chosenAnswer,
  answerQuestion,
}: QuizFormProps) => {
  const [checkedAnswer, setCheckedAnswer] = useState(chosenAnswer);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion(checkedAnswer);
  };

  return (
    <form onSubmit={handleSubmit}>
      {flag ? <Flag src={flag} alt="" /> : null}
      <Fieldset>
        <Question as="legend">{question}</Question>
        <AnswerOptionsGroup>
          {answerOptions.map((option, index) => (
            <AnswerOptionField
              key={index}
              letter={letters[index]}
              value={option}
              isChecked={option === checkedAnswer}
              onChange={(_) => setCheckedAnswer(option)}
            />
          ))}
        </AnswerOptionsGroup>
      </Fieldset>

      <SubmitAnswerButton type="submit">Submit</SubmitAnswerButton>
    </form>
  );
};

const Fieldset = styled.fieldset`
  border: none;
`;

const Flag = styled.img`
  margin-bottom: 1.75rem;
  width: 5.25rem;
  height: 3.375rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 1.5rem 0 #0000001a;
`;

const SubmitAnswerButton = styled(Button)`
  margin-top: 1.5rem;
  margin-left: auto;
`;
