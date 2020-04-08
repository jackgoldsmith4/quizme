import React from 'react';
import Question from './Question.js';
import { Link } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import db from '../base.js';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Create Your Quiz',
            questions: [],
        }
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    handleNameChange(newName) {
        this.setState({ name: newName });
    }

    // TODO add validation to only take positive numbers as input
    handleNumQuestionsChange(newNum) {
        let arr = [];
        for (var i = 1; i <= newNum; i++) {
            arr.push(<Question key={i} number={i} handleQuestionChange={this.handleQuestionChange} />);
        }

        this.setState({ questions: arr });

        // add number of questions field to firebase
        db.ref('quizzes/' + this.state.name).set({
            numQuestions: newNum,
        });

        // disable text field so the list of questions can't be changed again
        document.getElementById('number-of-questions').disabled = true;

        this.render();
    }

    // retrieves data about each Question component and adds to firebase
    handleQuestionChange(q, a1, a2, a3, a4, c, num) {
        db.ref('quizzes/' + this.state.name + '/questions/' + num).set({
            questionName: q,
            answer1: a1,
            answer2: a2,
            answer3: a3,
            answer4: a4,
            correctAnswer: c,
        })
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} /><Grid item xs={12} />
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant="h2"> {this.state.name} </Typography>
                </Grid>

                <Grid item xs={10}>
                    <TextField
                        label='Quiz Name'
                        fullWidth
                        //required={true}
                        variant='outlined'
                        onChange={e => this.handleNameChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id='number-of-questions'
                        label='# of Questions'
                        variant='outlined'
                        //required={true}
                        disabled={false}
                        onChange={e => this.handleNumQuestionsChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} /><Grid item xs={12} />

                {this.state.questions}
                <Button
                    component={Link}
                    to='/'
                    fullWidth
                    variant='contained'
                    color='primary'
                    //disabled={true} TODO only enable this button when everything is filled out
                    size='large'
                >
                    Submit
                </Button>
                <Grid item xs={12} /><Grid item xs={12} />
            </React.Fragment>
        );
    }
}

export default Quiz;