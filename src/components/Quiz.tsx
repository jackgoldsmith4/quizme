import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Question from './Question';
import db from '../base.js';

interface QuizProps {
    history: any; // TODO typecheck history prop
}

interface QuizState {
    name: string;
    numQuestions: number;
    questionComponents: Array<JSX.Element>;
    questions: Array<any>;
}

class Quiz extends React.Component<QuizProps, QuizState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'Create Your Quiz',
            numQuestions: 0,
            questionComponents: [],
            questions: [],
        }
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    handleNameChange(newName: string) {
        this.setState({ name: newName });
    }

    handleNumQuestionsChange(newNum: number) {
        if (newNum >= 0) {
            // render question components
            var arr: JSX.Element[] = this.state.questionComponents.slice(0);
            var newNumber: number = newNum;

            if (newNum > this.state.numQuestions) {
                for (var i=this.state.numQuestions; i<newNum; i++) {
                    arr.push(<Question key={i+1} number={i+1} handleQuestionChange={this.handleQuestionChange} />);
                    newNumber++;
                }
            } else if (newNum < this.state.numQuestions) {
                for (i=newNum; i<this.state.numQuestions; i++) {
                    arr.pop();
                    newNumber--;
                }
            }

            this.setState({ questionComponents: arr });
            this.setState({ numQuestions: newNumber });
        }
    }

    // retrieves data about from a child Question component
    handleQuestionChange(q: string, a1: string, a2: string, a3: string, a4: string, c: number, num: number) {
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

    handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, next: Function) {
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
                        onChange={e => this.handleNumQuestionsChange(Number(e.target.value))}
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