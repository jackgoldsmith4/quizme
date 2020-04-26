import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";

import Home from '../components/Home';

describe('Home Component', () => {
    test('render', async () => {
        render(<Home sendName={() => null} history=''/>);
    });

    test('Create a Quiz button', async () => {
        //TODO
    });

    test ('Existing quiz button', async () => {
        //TODO
    });
});