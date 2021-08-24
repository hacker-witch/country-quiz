import { useState } from "react";
import { generateQuestionFromCountryList } from "utils";
import { Country } from "types";

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const useQuiz = (countries: Country[]) => {
  const initialCurrentQuestion = generateQuestionFromCountryList(countries);
  const [currentQuestion, setCurrentQuestion] = useState(
    initialCurrentQuestion
  );
  const [chosenAnswer, setChosenAnswer] = useState(
    initialCurrentQuestion.answerOptions[0]
  );
  const [pastQuestionTitles, setPastQuestionTitles] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  const loadNextQuestion = () => {
    const question = generateQuestionFromCountryList(countries);
    setPastQuestionTitles([...pastQuestionTitles, question.title]);
    setCurrentQuestion(question);
    setChosenAnswer(question.answerOptions[0]);
  };

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => {
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const resetQuiz = () => {
    setCorrectAnswers(0);
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const chooseAnswer = (answer: string) => {
    setChosenAnswer(answer);
  };

  const answerQuestion = () => {
    setQuizStatus(QuizStatus.ViewingQuestionResults);

    if (chosenAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  return {
    currentQuestion,
    chosenAnswer,
    correctAnswers,
    quizStatus,
    finishQuiz,
    continueQuiz,
    resetQuiz,
    chooseAnswer,
    answerQuestion,
    QuizStatus,
  };
};
