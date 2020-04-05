import React from 'react';
import Question from './Question.js';
import { Link } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import base from './base';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Create Your Quiz',
            numQuestions: 0,
            questions: [],
        }
    }

    changeQuestionsList(newNum) {
        let arr = [];
        for (var i = 0; i < newNum; i++) {
            arr.push(<Question key={i} number={i + 1} />);
        }

        return arr;
    }

    handleNameChange(newName) {
        this.setState({ name: newName });
    }

    handleNumQuestionsChange(i) {
        this.setState({ questions: this.changeQuestionsList(i)});
        this.setState({ numQuestions: i });
        document.getElementById('number-of-questions').disabled = true;
        this.render();
    }

    addQuizToDB(e) {
        e.preventDefault();
        /* Send the quiz to Firebase */
        base.database().ref('quizzes').push(); //TODO: put stuff to push inside push()
        this.inputEl.value = ''; // <- clear the input
      }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} /><Grid item xs={12} />
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant="h2"> {this.state.name} </Typography>
                </Grid>

                //TODO make this a form
                 <Grid item xs={10}>
                    <TextField
                        label='Quiz Name'
                        fullWidth
                        required={true}
                        variant='outlined'
                        onChange={e => this.handleNameChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id='number-of-questions'
                        label='# of Questions'
                        variant='outlined'
                        required={true}
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
                    //disabled={true}
                    type='submit'
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