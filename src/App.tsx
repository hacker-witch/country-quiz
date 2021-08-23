import { useState, useEffect } from "react";
import {
  Quiz,
  QuestionResults,
  QuizResults,
  LoadingPage,
  ErrorPage,
} from "components";
import { generateQuestion } from "quiz";

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [flag, setFlag] = useState<string | null>(null);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = async () => {
    setIsLoading(true);

    try {
      const question = await generateQuestion();
      setAnswerOptions(question.answerOptions);
      setCurrentQuestion(question.title);
      setCorrectAnswer(question.correctAnswer);
      setChosenAnswer(question.answerOptions[0]);
      question.flag ? setFlag(question.flag) : setFlag(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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

    if (answer === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage error={error} />;

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Quiz
          question={currentQuestion!}
          flag={flag ? flag : undefined}
          answerOptions={answerOptions}
          chosenAnswer={chosenAnswer!}
          answerQuestion={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion!}
          flag={flag ? flag : undefined}
          answerOptions={answerOptions}
          chosenAnswer={chosenAnswer!}
          correctAnswer={correctAnswer!}
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
