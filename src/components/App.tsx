import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import Home from './Home';
import CreateQuiz from './CreateQuiz';
import TakeQuiz from './TakeQuiz';

const App: React.FC = () => {
    const [quizName, updateQuizName] = React.useState<string>('');

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='md'>
                <Grid container spacing={3} alignItems='center'>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' exact render={(childProps) => <Home sendQuizNameToTakeQuiz={updateQuizName} {...childProps} />} />
                            <Route path='/take-quiz' render={(childProps) => <TakeQuiz quizName={quizName} {...childProps} />} />
                            <Route path='/create-quiz' component={CreateQuiz} />
                        </Switch>
                    </BrowserRouter>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default App;