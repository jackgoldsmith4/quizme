import React from 'react';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Quiz from './Quiz.js';

export default function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Quiz />
            </Container>
        </React.Fragment>
    );
}