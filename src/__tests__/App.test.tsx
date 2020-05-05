import * as React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from '../components/App';

describe('App Component + general user interaction testing', () => {
    afterEach(cleanup);

    test('component renders with welcome title', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Welcome/i).textContent).toContain('Welcome to QuizMe!');
    });

    test('component renders with functional CreateQuiz Button', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Create/i).className).toContain('Button');
        expect(getByText(/Create/i).textContent).toContain('Create a Quiz');
        
        fireEvent.click(getByText(/Create/i));

        // clicking the button should render the CreateQuiz component/form, leaving the Home component
        expect(getByText(/Create/i).className).not.toContain('Button');
        expect(getByText(/Create/i).textContent).toContain('Create your Quiz');
    });

    test('Integration: create a 2-question quiz from the starting page, then take that quiz', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('quiz-name-field'), { target: { value: 'Test: Example Quiz' } });
        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 2 } });

        // fill out question 1
        fireEvent.change(getByTestId('Question 1'), { target: { value: 'question 1 name' } });
        fireEvent.change(getByTestId('Question 1a1'), { target: { value: 'answer 1: correct' } });
        fireEvent.change(getByTestId('Question 1a2'), { target: { value: 'answer 2' } });
        fireEvent.change(getByTestId('Question 1a3'), { target: { value: 'answer 3' } });
        fireEvent.change(getByTestId('Question 1a4'), { target: { value: 'answer 4' } });
        fireEvent.click(getByTestId('Question 1c1'));

        // fill out question 2
        fireEvent.change(getByTestId('Question 2'), { target: { value: 'question 2 name' } });
        fireEvent.change(getByTestId('Question 2a1'), { target: { value: 'answer 1' } });
        fireEvent.change(getByTestId('Question 2a2'), { target: { value: 'answer 2: correct' } });
        fireEvent.change(getByTestId('Question 2a3'), { target: { value: 'answer 3' } });
        fireEvent.change(getByTestId('Question 2a4'), { target: { value: 'answer 4' } });
        fireEvent.click(getByTestId('Question 2c2'));

        fireEvent.click(getByText(/Submit/i));

        // should have returned to welcome page after submiting the quiz
        expect(getByText(/Welcome/i).textContent).toContain('Welcome to QuizMe!');

        // TODO click on the quiz from Home page, take the quiz, grade it
    });
});