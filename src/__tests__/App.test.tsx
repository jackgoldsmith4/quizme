import * as React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from '../components/App';

describe('App Component', () => {
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

    // TODO full integration testing WITH DB: create quiz, take it, grade it, return home, delete it
});