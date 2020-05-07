import * as React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from '../components/App';

describe('App Component, integration testing', () => {
    afterEach(cleanup);

    test('component renders with welcome title', () => {
        const { getByText } = render(<App />);
        getByText('Welcome to QuizMe!');
    });

    test('component renders with functional CreateQuiz Button', () => {
        const { getByText } = render(<App />);
        getByText(/Create/i);
        expect(getByText(/Create/i).className).toContain('Button');
        
        fireEvent.click(getByText(/Create/i));

        // clicking the button should render the CreateQuiz component/form, leaving the Home component
        expect(getByText(/Create/i).className).not.toContain('Button');
    });

    test.skip('end-to-end: create a quiz, take it, then delete it', () => {
        const { getByText, getByTestId } = render(<App />);
        
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('quiz-name-field'), { target: { value: '(JLG) Example Quiz' } });
        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 3 } });

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

        // fill out question 3
        fireEvent.change(getByTestId('Question 3'), { target: { value: 'question 3 name' } });
        fireEvent.change(getByTestId('Question 3a1'), { target: { value: 'answer 1' } });
        fireEvent.change(getByTestId('Question 3a2'), { target: { value: 'answer 2' } });
        fireEvent.change(getByTestId('Question 3a3'), { target: { value: 'answer 3' } });
        fireEvent.change(getByTestId('Question 3a4'), { target: { value: 'answer 4: correct' } });
        fireEvent.click(getByTestId('Question 3c4'));

        fireEvent.click(getByText(/Submit/i));

        // TODO
        // assert that JLG ex quiz is an option on the homepage
        // click on that quiz, go to TakeQuiz page
        // fill out the quiz correctly, grade it, then return home using generated button
        // at homepage, delete the quiz
    });
});