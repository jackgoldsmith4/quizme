import * as React from 'react';
import { render, cleanup, fireEvent, getByTestId } from "@testing-library/react";

import TakeQuiz from '../components/TakeQuiz'

const historyMock = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: historyMock
    }),
}));

const sampleName: string = 'Example Quiz';
const sampleQuizData: QuizDBSnapshot = {
    numQuestions: 2,
    questions: [
        {
            questionName: 'question 1',
            questionNumber: 1,
            answer1: 'answer choice 1: correct',
            answer2: 'answer choice 2',
            answer3: 'answer choice 3',
            answer4: 'answer choice 4',
            correctAnswer: 1
        },
        {
            questionName: 'question 2',
            questionNumber: 2,
            answer1: 'answer choice 1',
            answer2: 'answer choice 2',
            answer3: 'answer choice 3',
            answer4: 'answer choice 4: correct',
            correctAnswer: 4
        }
    ]
}

describe('TakeQuiz Component', () => {
    afterEach(cleanup);

    test('quiz renders with name as title and correct number of questions', () => {
        const { getByText, queryByText } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        getByText('Example Quiz');

        getByText('question 1');
        getByText('answer choice 1: correct')

        getByText('question 2');
        getByText('answer choice 4: correct')

        expect(queryByText('question 3')).toBe(null);
        getByText('Grade my Quiz');
    });

    test('quiz grader: treats empty answers as wrong answers', () => {
        const { getByText, getByTestId } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('0 / 2');
    });

    test('quiz grader: both answers incorrect', () => {
        const { getByText, getByTestId } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        fireEvent.click(getByTestId('q1a4'));
        fireEvent.click(getByTestId('q2a3'));

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('0 / 2');
    });

    test('quiz grader: both answers correct', () => {
        const { getByText, getByTestId } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        fireEvent.click(getByTestId('q1a1'));
        fireEvent.click(getByTestId('q2a4'));

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('2 / 2');
    });

    test('quiz grader: re-grades after each new button click', () => {
        const { getByText, getByTestId } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        fireEvent.click(getByTestId('q1a1'));
        fireEvent.click(getByTestId('q2a3'));

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('1 / 2');

        fireEvent.click(getByTestId('q2a4'));

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('2 / 2');
    });

    test('quiz grader: generates button to return to the homepage', () => {
        const { getByText, getByTestId } = render(<TakeQuiz quizName={sampleName} quizData={sampleQuizData} />);

        fireEvent.click(getByText('Grade my Quiz'));
        expect(getByTestId('grade-results').textContent).toContain('0 / 2');
        
        fireEvent.click(getByText('Return to Homepage'));
        expect(historyMock).toHaveBeenCalled();
    });
});