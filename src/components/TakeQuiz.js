import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, ButtonGroup, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import db from '../base.js';

class TakeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            scoreTracker: [],
            scoreMessage: '',
        };

        this.gradeQuiz = this.gradeQuiz.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // retrieve data about the specific quiz from firebase and use it to generate question components
        db.ref('quizzes/' + this.props.quizName).once('value').then(snapshot => { this.generateQuiz(snapshot.val()) });
    }

    gradeQuiz() {
        this.setState({ score: 0 });
        this.state.scoreTracker.map(bool => {
            if (bool) {
                this.state.score++;
            }
        })

        this.setState({ scoreMessage: (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant='h4'> {this.state.score} / {this.state.numQuestions} Correct </Typography>
                </Grid>
                <Button
                    component={Link}
                    to='/'
                    variant='contained'
                    color='primary'
                    size='large'
                >
                    Return to Homepage
                </Button>
            </Grid>
        )});
    }

    handleChange(e, correct, index) {
        if (e.target.value == correct) {
            this.state.scoreTracker[index] = true;
        } else {
            this.state.scoreTracker[index] = false;
        }
    }

    generateQuiz(quizData) {
        this.state.numQuestions = quizData.numQuestions;

        // grow the array boolean array of scores to correct size
        for (var i=0; i<this.state.numQuestions; i++) {
            this.state.scoreTracker.push(false);
        }

        var questions = quizData.questions.slice(1);
        this.setState({
            questions: questions.map((q) =>
                <Grid key={q.questionNumber} container alignItems='center'>
                    <Grid container justify='center' alignItems='center'>
                        <Typography variant='h4'> {q.questionName} </Typography>
                    </Grid>

                     <ButtonGroup
                             component={RadioGroup}
                             id={q}
                             fullWidth
                             orientation='vertical'
                             variant='contained'
                             onChange={(e) => this.handleChange(e, q.correctAnswer, q.questionNumber-1)}
                     >
                            <Button component={FormControlLabel} control={<Radio color='primary' />} label={q.answer1} value='1'> </Button>
                            <Button component={FormControlLabel} control={<Radio color='primary'/> } label={q.answer2} value='2'> </Button>
                            <Button component={FormControlLabel} control={<Radio color='primary'/> } label={q.answer3} value='3'> </Button>
                            <Button component={FormControlLabel} control={<Radio color='primary'/> } label={q.answer4} value='4'> </Button>
                     </ButtonGroup>
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

                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={this.gradeQuiz}
                >
                    Grade my Quiz
                </Button>

                <Grid item xs={12} /><Grid item xs={12} />

                {this.state.scoreMessage}

                <Grid item xs={12} /><Grid item xs={12} />
            </React.Fragment>
        );
    }
}

export default TakeQuiz;