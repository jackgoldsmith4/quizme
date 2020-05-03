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

    test('Integration: create a 2-question quiz from the starting page, then take it', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.input(getByTestId('quiz-name-field'), 'Test: Example Quiz');
        fireEvent.input(getByTestId('number-of-questions-field'), 2);

        // TODO fill in question 1

        // TODO fill in question 2

        fireEvent.click(getByText(/Submit/i));

        // assert on the submit that both questions are filled out, all data is in the submit method
        // take the quiz
    });
});