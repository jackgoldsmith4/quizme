import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import Home from './Home.js';
import Quiz from './Quiz.js';
import TakeQuiz from './TakeQuiz.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='md'>
                    <Grid container spacing={3} alignItems='center'>
                        <BrowserRouter>
                            <Switch>
                                <Route path='/take-quiz' component={TakeQuiz} />
                                <Route path='/create-quiz' component={Quiz} />
                                <Route path='/' component={Home} />
                            </Switch>
                        </BrowserRouter>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;