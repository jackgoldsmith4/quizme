import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import db from '../base.js';

class TakeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
        }

        // retrieve data about the specific quiz from firebase and use it to generate question components
        db.ref('quizzes/' + this.props.quizName).once('value').then(snapshot => { this.generateQuiz(snapshot.val()) });
    }

    handleClick(e, q, answerNumber, correctNumber) {
        if (answerNumber === correctNumber) {
            this.state.score += 1;
        }
        e.currentTarget.style.backgroundColor='#add8e6';
        //TODO disable the button group
    }

    generateQuiz(quizData) {
        this.state.numQuestions = quizData.numQuestions;

        var questions = quizData.questions.slice(1);
        this.setState({
            questions: questions.map((q) =>
                <Grid key={q.questionName} container alignItems='center'>
                    <Grid key={q.questionName} container justify='center' alignItems='center'>
                        <Typography variant='h3'> {q.questionName} </Typography>
                    </Grid>

                    <Grid item xs={12} /><Grid item xs={12} />

                     <ButtonGroup
                             id={q}
                             fullWidth
                             orientation='vertical'
                             variant='contained'
                             disabled={false}
                     >
                            <Button onClick={(e) => this.handleClick(e, q, 1, q.correctAnswer)}> {q.answer1} </Button>
                            <Button onClick={(e) => this.handleClick(e, q, 2, q.correctAnswer)}> {q.answer2} </Button>
                            <Button onClick={(e) => this.handleClick(e, q, 3, q.correctAnswer)}> {q.answer3} </Button>
                            <Button onClick={(e) => this.handleClick(e, q, 4, q.correctAnswer)}> {q.answer4} </Button>
                     </ButtonGroup>
                     <Grid item xs={12} /><Grid item xs={12} />
                     <Grid item xs={12} /><Grid item xs={12} />
                     <Grid item xs={12} /><Grid item xs={12} />
                 </Grid>
            )
        })
    }

    render() {
        return(
            <React.Fragment>
                <Grid item xs={12} /><Grid item xs={12} />
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant="h2"> {this.props.quizName} </Typography>
                </Grid>

                <Grid item xs={12} /><Grid item xs={12} />

                {this.state.questions}

                <Grid item xs={12} /><Grid item xs={12} />
            </React.Fragment>
        );
    }
}

export default TakeQuiz;