import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import db from '../base.js';

class TakeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
        }

        db.ref('quizzes/' + this.props.quizName).once('value').then(snapshot => { this.generateQuiz(snapshot.val()) });
    }

    generateQuiz(quizData) {
        this.state.numQuestions = quizData.numQuestions;

        var questions = quizData.questions.slice(1);
        this.setState({
            questions: questions.map((q) =>
                <Grid key={q.questionName} container alignItems='center'>
                     <Grid item xs={12}>
                        <Paper>
                            <Typography variant='h3'> {q.questionName} </Typography>
                        </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <Button
                                fullWidth
                                variant='contained'
                                //onClick={}
                            >
                                {q.answer1}
                            </Button>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <Button
                                fullWidth
                                variant='contained'
                                //onClick={}
                            >
                                {q.answer2}
                            </Button>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <Button
                                label={q.answer3}
                                fullWidth
                                variant='contained'
                                //onClick={}
                            >
                                {q.answer3}
                            </Button>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <Button
                                fullWidth
                                variant='contained'
                                //onClick={}
                            >
                                {q.answer4}
                            </Button>
                         </Paper>
                     </Grid>
                     <Grid item xs={12} />
                     <Grid item xs={12} />
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