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
            numQuestions: 0,
            questionComponents: [],
            questions: [],
        }
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    handleNameChange(newName) {
        this.setState({ name: newName });
    }

    handleNumQuestionsChange(newNum) {
        if (newNum >= 0) {
            // render question components
            var arr = this.state.questionComponents.slice(0);

            if (newNum > this.state.numQuestions) {
                for (var i=this.state.numQuestions; i<newNum; i++) {
                    arr.push(<Question key={i+1} number={i+1} handleQuestionChange={this.handleQuestionChange} />);
                    this.state.numQuestions++;
                }
            } else if (newNum < this.state.numQuestions) {
                for (var i=newNum; i<this.state.numQuestions; i++) {
                    arr.pop();
                    this.state.numQuestions--;
                }
            }

            this.setState({ questionComponents: arr });
            //this.setState({ numQuestions: newNum });
        }
    }

    // retrieves data about from a child Question component
    handleQuestionChange(q, a1, a2, a3, a4, c, num) {
        var question = {
            questionName: q,
            questionNumber: num,
            answer1: a1,
            answer2: a2,
            answer3: a3,
            answer4: a4,
            correctAnswer: c,
        }

        this.state.questions[num-1] = question;
    }

    handleSubmit(e, next) {
        if (this.state.numQuestions != this.state.questions.length || this.state.numQuestions == 0) {
            alert("Please fill out all questions or change the number of questions");
        } else {
            // add number of questions field to firebase
            db.ref('quizzes/' + this.state.name).set({
                numQuestions: this.state.numQuestions,
            });

            // add data about each question
            this.state.questions.map(q => {
                db.ref('quizzes/' + this.state.name + '/questions/' + q.questionNumber).set(q);
            });
        }
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
                        type='number'
                        defaultValue={0}
                        //required={true}
                        onChange={e => this.handleNumQuestionsChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} /><Grid item xs={12} />

                {this.state.questionComponents}

                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    //disabled={true} TODO only enable this button when everything is filled out
                    size='large'
                    onClick={(e) => this.handleSubmit(e, this.props.history.push('/'))}
                >
                    Submit
                </Button>
                <Grid item xs={12} /><Grid item xs={12} />
            </React.Fragment>
        );
    }
}

export default Quiz;