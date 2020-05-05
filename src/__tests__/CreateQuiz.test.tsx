import * as React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from '../components/App';

window.alert = jest.fn(() => {});

describe('CreateQuiz Component', () => {
    afterEach(cleanup);

    test('CreateQuiz form renders with name field and number of questions field', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        getByTestId('quiz-name-field');
        getByTestId('number-of-questions-field');
    });

    test('number of questions field: input >=1 is valid, input <1 is changed to 1', () => {
        const { getByText, getByTestId, queryByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        expect(getByTestId('number-of-questions-field').getAttribute('value')).toBe('0');

        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 2 } });
        getByTestId('Question 1');
        getByTestId('Question 2');
        expect(queryByTestId('Question 3')).toBe(null);

        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: -1 } });
        getByTestId('Question 1');
        expect(queryByTestId('Question 2')).toBe(null);
        expect(queryByTestId('Question -1')).toBe(null);

        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 3 } });
        getByTestId('Question 1');
        getByTestId('Question 2');
        getByTestId('Question 3');
        expect(queryByTestId('Question 4')).toBe(null);
    });

    test('submit button: shouldn\'t work if name field isn\'t changed', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 1 } });

        // submit button shouldn't work because name wasn't updated
        fireEvent.click(getByText(/Submit/i));
        getByTestId('quiz-name-field');
        getByTestId('number-of-questions-field');
    });

    test('submit button: shouldn\'t work if # of questions field isn\'t changed', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('quiz-name-field'), { target: { value: 'Test: Example Quiz' } });
        
        // submit button shouldn't work becuase # of questions wasn't updated, but name was successfully changed
        fireEvent.click(getByText(/Submit/i));
        getByTestId('quiz-name-field');
        getByTestId('number-of-questions-field');
    });

    test('submit button: shouldn\'t work if question fields aren\'t filled out', () => {
        const { getByText, getByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('quiz-name-field'), { target: { value: 'Test: Example Quiz' } });
        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 1 } });

        // submit button shouldn't work because the question wasn't filled out
        fireEvent.click(getByText(/Submit/i));
        getByTestId('quiz-name-field');
        getByTestId('number-of-questions-field');
    });

    test('submit button: success if everything is filled out', () => {
        const { getByText, getByTestId, queryByTestId } = render(<App />);
        fireEvent.click(getByText(/Create/i));

        fireEvent.change(getByTestId('quiz-name-field'), { target: { value: 'Test: Example Quiz' } });
        fireEvent.change(getByTestId('number-of-questions-field'), { target: { value: 1 } });

        fireEvent.change(getByTestId('Question 1'), { target: { value: 'question name' } });
        fireEvent.change(getByTestId('Question 1a1'), { target: { value: 'answer 1' } });
        fireEvent.change(getByTestId('Question 1a2'), { target: { value: 'answer 2' } });
        fireEvent.change(getByTestId('Question 1a3'), { target: { value: 'answer 3' } });
        fireEvent.change(getByTestId('Question 1a4'), { target: { value: 'answer 4' } });
        fireEvent.click(getByTestId('Question 1c1'));

        // submit button returns to home page
        fireEvent.click(getByText(/Submit/i));
        expect(getByText(/Welcome/i).textContent).toContain('Welcome to QuizMe!');
        expect(queryByTestId('quiz-name-field')).toBe(null);
        expect(queryByTestId('number-of-questions-field')).toBe(null);
    });
});