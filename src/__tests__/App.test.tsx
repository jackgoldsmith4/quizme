import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";

import App from '../components/App';
import Home from '../components/Home';
import CreateQuiz from '../components/CreateQuiz';
import TakeQuiz from '../components/TakeQuiz';

describe('Typical app flow: create a quiz and then take it', () => {
    test('App component renders', async () => {
        render(<App />);
    });
});