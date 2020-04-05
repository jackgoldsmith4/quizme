import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Quiz from './Quiz.js';
import base from '../base.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
        }
    }

    componentWillMount() {
        let quizzesRef = base.database().ref('quizzes');
        quizzesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let quiz = { name: snapshot.val(), id: snapshot.key };
            this.setState({ quizzes: [quiz].concat(this.state.quizzes) });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} /><Grid item xs={12} />
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant="h2"> Welcome to QuizMe! </Typography>
                </Grid>
                <Grid item xs={12} /><Grid item xs={12} />
                <Button
                    component={Link}
                    to='/create-quiz'
                    fullWidth
                    variant='contained'
                    color='primary'
                    size='large'
                >
                    Create a Quiz
                </Button>
            </React.Fragment>
        );
    }
}

export default App;