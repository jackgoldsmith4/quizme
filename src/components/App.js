import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Quiz from './Quiz.js';
import db from '../base.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getQuizList() {
        let questions = db.ref('quizzes').on('value', function(snapshot) {
            console.log(snapshot.val());
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

                {this.getQuizList()}
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