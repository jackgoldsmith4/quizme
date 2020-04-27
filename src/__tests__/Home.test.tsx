import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";

import Home from '../components/Home';

describe('Home Component', () => {
    test('render', async () => {
        render(<Home />);
    });

    test('create a quiz button', async () => {
        //TODO
    });

    test ('existing quiz button', async () => {
        //TODO
    });
});