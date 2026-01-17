import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import ResultCard from "@/components/quiz/ResultCard";

import {
    getQuiz,
    startQuiz,
    submitQuiz,
} from "../../../store/slices/quizSlice";

import {
    selectQuiz,
    selectQuizLoading,
    selectQuizError,
    selectAttemptId,
    selectQuizResult,
} from "../../../store/selectors/quizSelectors";

const QuizAttempt = ({ classroomId }) => {
    console.log("Classroom ID in QuizAttempt:", classroomId);
    const quizId = 1; // TEMPORARY FIX FOR TESTING
    const dispatch = useDispatch();
    const quiz = useSelector(selectQuiz);
    console.log("Quiz Data:", quiz);
    const loading = useSelector(selectQuizLoading);
    const error = useSelector(selectQuizError);
    const attemptId = useSelector(selectAttemptId);
    const result = useSelector(selectQuizResult);

    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    /* ================= LOAD QUIZ ================= */
    useEffect(() => {
        dispatch(getQuiz({ quizId }));
    }, [quizId, dispatch]);

    /* ================= SET TIMER ================= */
    useEffect(() => {
        if (quiz?.durationSeconds) {
            setTimeLeft(quiz.durationSeconds);
        }
    }, [quiz]);

    /* ================= TIMER ================= */
    useEffect(() => {
        if (!attemptId || result) return;

        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, attemptId, result]);

    /* ================= START QUIZ ================= */
    const handleStart = () => {
        dispatch(startQuiz({ quizId }));
    };

    /* ================= SELECT ANSWER ================= */
    const handleSelect = (questionId, optionId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    /* ================= SUBMIT QUIZ ================= */
    const handleSubmit = () => {
        const formattedAnswers = Object.entries(answers).map(
            ([questionId, selectedOptionId]) => ({
                questionId: Number(questionId),
                selectedOptionId: Number(selectedOptionId),
            })
        );
        console.log("Formatted Answers for Submission:", formattedAnswers);

        dispatch(
            submitQuiz({
                attemptId,
                answers: formattedAnswers,
            })
        );
    };

    /* ================= UI STATES ================= */
    if (loading) return <p className="text-center">Loading quiz...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!quiz) return null;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <QuizHeader
                title={quiz.title}
                timeLeft={timeLeft}
                totalTime={quiz.durationSeconds}
            />

            {/* START */}
            {!attemptId && !result && (
                <Button className="w-full" onClick={handleStart}>
                    Start Quiz
                </Button>
            )}

            {/* QUESTIONS */}
            {attemptId &&
                !result &&
                quiz.questions.map((q, index) => (
                    <QuestionCard
                        key={q.id}
                        question={q}
                        index={index}
                        selected={answers[q.id]}
                        onSelect={handleSelect}
                    />
                ))}

            {/* SUBMIT */}
            {attemptId && !result && (
                <Button className="w-full mt-4" onClick={handleSubmit}>
                    Submit Quiz
                </Button>
            )}

            {/* RESULT */}
            {result && <ResultCard result={result} />}
        </div>
    );
};

export default QuizAttempt;
