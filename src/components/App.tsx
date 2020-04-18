import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import Home from './Home';
import Quiz from './Quiz';
import TakeQuiz from './TakeQuiz';

interface AppState {
    currentName: string;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.getQuizName = this.getQuizName.bind(this);
        this.state = {
            currentName: '',
        }
    }

    // retrieves the name of a quiz from the child Home component that was clicked on and is to be taken
    getQuizName(name: string) {
        this.setState({ currentName: name });
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='md'>
                    <Grid container spacing={3} alignItems='center'>
                        <BrowserRouter>
                            <Switch>
                                <Route path='/take-quiz' render={(childProps) => <TakeQuiz quizName={this.state.currentName} {...childProps} />} />
                                <Route path='/create-quiz' component={Quiz} />
                                <Route path='/' render={(childProps) => <Home sendName={this.getQuizName} {...childProps} />} />
                            </Switch>
                        </BrowserRouter>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;