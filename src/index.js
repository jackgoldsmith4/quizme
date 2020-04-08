import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import App from './components/App.js';
import Quiz from './components/Quiz.js';
import TakeQuiz from './components/TakeQuiz.js';

ReactDOM.render((
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth='md'>
            <Grid container spacing={3} alignItems='center'>
                <BrowserRouter>
                    <Switch>
                        <Route path='/take-quiz' component={TakeQuiz} />
                        <Route path='/create-quiz' component={Quiz} />
                        <Route path='/' component={App} />
                    </Switch>
                </BrowserRouter>
            </Grid>
        </Container>
    </React.Fragment>),
    document.getElementById('root')
);