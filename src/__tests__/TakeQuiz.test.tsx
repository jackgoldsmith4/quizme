import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";

import TakeQuiz from '../components/TakeQuiz';

describe('TakeQuiz Component', () => {
    test('render', async () => {
        render(<TakeQuiz quizName=''/>);
    });

    test('can take the quiz: question buttons work', async () => {
        // TODO
    });

    test('can only click one button at a time (radio-style buttons)', async () => {
        // TODO
    });

    test('grade quiz: all questions left blank = 0 correct', async () => {
        // TODO
    });

    test('grade quiz: all questions answered correctly = perfect score', async () => {
        // TODO
    });

    test('grade quiz: can change answers and regrade quiz multiple times', async () => {
        // TODO
    });

    test('grade quiz: \'return home\' button is produced on button click, it returns to \'/\' route', async () => {
        // TODO
    });
});