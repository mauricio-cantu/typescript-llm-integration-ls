import { useState } from "react";
import { useQuiz } from "./contexts/QuizContextProvider";

function App() {
  const {
    questions,
    error,
    finalQuestionsWithAnswers,
    quizPrompt,
    isBuildingQuiz,
    currentQuestionIndex,
    score,
    createQuiz,
    answerQuestion,
    resetQuiz,
  } = useQuiz();
  const [prompt, setPrompt] = useState("");
  const wrongTakes = finalQuestionsWithAnswers.filter((q) => !q.isCorrect);

  if (error) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <p>{error}</p>
        <button
          className="rounded-md h-10 hover:bg-zinc-800 transition-colors bg-zinc-900 cursor-pointer px-3"
          onClick={() => resetQuiz()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (isBuildingQuiz) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <p>🤖 Hold tight, I'm creating a quiz about {quizPrompt}...</p>
        <div className="w-5 h-5 border-4 border-t-transparent border-zinc-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!quizPrompt) {
    return (
      <div className="flex flex-col gap-2.5">
        <h1 className="text-center text-5xl font-extrabold mb-8">
          AI Quiz 📝🤖
        </h1>
        <label htmlFor="prompt">Enter the topic of the quiz</label>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          name="prompt"
          id="prompt"
          placeholder="MCU movies"
          className="border border-gray-300 rounded-md p-2 h-10 w-full"
        />
        <button
          className="rounded-md h-10 bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer disabled:cursor-default disabled:bg-zinc-600"
          disabled={!prompt}
          onClick={() => createQuiz(prompt)}
          aria-label="Create quiz"
        >
          Create quiz
        </button>
      </div>
    );
  }

  if (currentQuestionIndex === questions.length) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-center text-3xl">Quiz completed!</p>
        <p className="text-center">
          Your final score was <strong>{score}</strong>/{questions.length * 10}
          {score === questions.length * 10 && "🎉"}
        </p>
        <button
          onClick={() => resetQuiz()}
          className="px-3 rounded-md h-10 hover:bg-zinc-800 transition-colors bg-zinc-900 cursor-pointer"
        >
          Reset
        </button>
        {!!wrongTakes.length && (
          <>
            <div className="w-full h-[0.3px] bg-zinc-200"></div>
            <div className="flex flex-col gap-2">
              <ul className="list-none ">
                {wrongTakes.map((question, index) => (
                  <li key={index} className={index ? "mt-4" : ""}>
                    <p>
                      <strong>{question.question}</strong>
                    </p>
                    <p>Your answer: {question.selectedAnswer}</p>
                    <p>Correct answer: {question.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }

  if (questions.length) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <span>
          <strong>{currentQuestionIndex + 1}</strong>/{questions.length}
        </span>
        <h1 className="text-4xl font-bold">
          {questions[currentQuestionIndex].question}
        </h1>
        <div className="flex flex-row gap-4 mt-2">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              className="cursor-pointer p-4 rounded-md bg-zinc-900 border-zinc-300 border hover:bg-zinc-800 transition-colors"
              onClick={() => answerQuestion(index)}
              key={index}
            >
              {option.content}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
