import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";

import CreateQuiz from '../components/CreateQuiz';

describe('CreateQuiz Component', () => {
    test('render', async () => {
        render(<CreateQuiz history='' />);
    });

    test('name field filling out updates name in title', async () => {
        // TODO
    });

    test('numQuestions field updates the number of Question components rendered', async () => {
        // TODO
    });

    test('numQuestions field cannot be less than 1', async () => {
        // TODO
    });

    test('numQuestions field (and question components) update correctly when changed twice', async () => {
        // TODO
    });

    test('submission: quiz name field is required', async () => {
        // TODO
    });

    test('submission: number of questions field is required', async () => {
        // TODO
    });

    test('submission: each question must be filled out for submit to go through', async () => {
        // TODO
    });

    test('submission: question ID\'s match [1-<#questions>]', async () => {
        // TODO
    });
});