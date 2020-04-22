import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import Home from './Home';
import Quiz from './Quiz';
import TakeQuiz from './TakeQuiz';

const App: React.FC = () => {
    const [currentName, setName] = React.useState('');

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='md'>
                <Grid container spacing={3} alignItems='center'>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/take-quiz' render={(childProps) => <TakeQuiz quizName={currentName} {...childProps} />} />
                            <Route path='/create-quiz' component={Quiz} />
                            <Route path='/' render={(childProps) => <Home sendName={setName} {...childProps} />} />
                        </Switch>
                    </BrowserRouter>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default App;