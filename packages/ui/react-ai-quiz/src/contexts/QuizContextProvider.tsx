import { generateObject } from "ai";
import React, { createContext, ReactNode, useState } from "react";
import { z } from "zod";
import { googleModel } from "../providers";

interface Question {
  question: string;
  options: { content: string; isCorrect: boolean }[];
}

interface QuestionWithUserAnswer {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface QuizContextType {
  questions: Question[];
  score: number;
  currentQuestionIndex: number;
  quizPrompt: string;
  isBuildingQuiz: boolean;
  finalQuestionsWithAnswers: QuestionWithUserAnswer[];
  error: string | null;
  nextQuestion: () => void;
  increaseScore: () => void;
  createQuiz: (topic: string) => void;
  answerQuestion: (answerIndex: number) => void;
  resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

export const QuizContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isBuildingQuiz, setIsBuildingQuiz] = useState<boolean>(false);
  const [quizPrompt, setQuizPrompt] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Map<number, number>()
  );
  const [error, setError] = useState<string | null>(null);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const increaseScore = () => {
    setScore((prev) => prev + 10);
  };

  const createQuiz = async (prompt: string) => {
    // mocked questions
    // setQuestions(questions);

    // leverage the AI model to generate questions!
    setQuizPrompt(prompt);
    setIsBuildingQuiz(true);
    try {
      // ideally this would be in a server action/backend to not expose the API keys in the frontend
      const { object } = await generateObject({
        model: googleModel("gemini-2.0-flash-exp"),
        messages: [
          {
            role: "system",
            content:
              "You are an expert in creating quizzes. For the provided topic, create a quiz with 5 questions. Each question should have 3 options (with only one correct). Ensure that the correct option is not always the first, so shuffle the options for each question. If the user provides content that cannot generate a quiz, return only null as per the specified JSON schema.",
          },
          {
            role: "user",
            content: "Create a quiz for the following topic: " + prompt,
          },
        ],
        schema: z
          .array(
            z.object({
              question: z.string(),
              options: z
                .array(
                  z.object({
                    content: z.string(),
                    isCorrect: z.boolean(),
                  })
                )
                .length(3),
            })
          )
          .length(5)
          .or(
            z
              .null()
              .describe(
                "Should return null if it was not possible to create the quiz for the provided topic."
              )
          ),
      });
      if (object === null) {
        setError(
          "It wasn't possible to generate a quiz for the provided topic."
        );
        setQuizPrompt("");
      } else {
        const questionsWithShuffledOptions = object.map((question) => ({
          ...question,
          options: question.options.sort(() => Math.random() - 0.5),
        }));
        setQuestions(questionsWithShuffledOptions);
      }
    } catch (error: unknown) {
      setError("An error occurred while creating the quiz.");
      console.log(error);
    } finally {
      setIsBuildingQuiz(false);
    }
  };

  const answerQuestion = (answerIndex: number) => {
    if (questions[currentQuestionIndex].options[answerIndex].isCorrect) {
      increaseScore();
    }
    setSelectedAnswers((prev) => prev.set(currentQuestionIndex, answerIndex));
    nextQuestion();
  };

  const finalQuestionsWithAnswers = questions.map((question, index) => {
    const selectedAnswerIndex = selectedAnswers.get(index);
    const selectedAnswer =
      selectedAnswerIndex !== undefined
        ? question.options[selectedAnswerIndex].content
        : "";
    const correctAnswerIndex = question.options.findIndex(
      (option) => option.isCorrect
    );
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;
    return {
      question: question.question,
      correctAnswer: question.options.find((option) => option.isCorrect)!
        .content,
      selectedAnswer,
      isCorrect,
    };
  });

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setQuizPrompt("");
    setSelectedAnswers(new Map());
    setError(null);
  };

  return (
    <QuizContext.Provider
      value={{
        isBuildingQuiz,
        score,
        questions,
        currentQuestionIndex,
        finalQuestionsWithAnswers,
        quizPrompt,
        error,
        increaseScore,
        nextQuestion,
        createQuiz,
        answerQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = React.useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizContextProvider");
  }
  return context;
};
