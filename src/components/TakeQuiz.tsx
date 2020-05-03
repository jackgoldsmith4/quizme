import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, Paper, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import db from '../base.js';

interface TakeQuizProps {
    quizName: string;
}

type OptionalJSX = JSX.Element[] | JSX.Element | '';

const TakeQuiz: React.FC<TakeQuizProps> = (props) => {
    let history = useHistory();

    const [numQuestions, setNumQuestions] = React.useState<number>(-1);
    const [questions, setQuestions] = React.useState<OptionalJSX>('');
    const [scoreTracker, setScoreTracker] = React.useState<boolean[]>([]);
    const [scoreMessage, setScoreMessage] = React.useState<OptionalJSX>('');

    const gradeQuiz = () => {
        var score: number = 0;
        scoreTracker.map(bool => {
            if (bool) {
                score++;
            }
        })
    
        var newMessage = (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant='h4'> {score} / {numQuestions} Correct </Typography>
                </Grid>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={() => history.push('/')}
                >
                    Return to Homepage
                </Button>
            </Grid>
        );
        setScoreMessage(newMessage);
    }

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, correct: number, index: number) => {
        var choice = Number(e.target.value);
        var tempTracker = scoreTracker;
        if (choice == correct) {
            tempTracker[index] = true;
        } else {
            tempTracker[index] = false;
        }

        setScoreTracker(tempTracker);
    }

    const generateQuiz = (quizData: any) => { // TODO typecheck quizData correctly    
        var tempScoreTracker: boolean[] = new Array(quizData.numQuestions);

        for (var i=0; i<quizData.numQuestions; i++) {
            tempScoreTracker[i] = false;
        }

        setNumQuestions(quizData.numQuestions);
        setScoreTracker(tempScoreTracker);
    
        var qs: QuestionInfo[] = quizData.questions;
        var mappedQuestions: JSX.Element[] = qs.map(q =>
            <Grid key={q.questionNumber} container alignItems='center'>
                <Grid container justify='center' alignItems='center'>
                    <Typography variant='h4'> {q.questionName} </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <FormControl variant='outlined' fullWidth>
                            <RadioGroup
                                value={0}
                                onChange={(e) => handleAnswerChange(e, q.correctAnswer, q.questionNumber-1)}
                            >
                                <Grid container justify='center' alignItems='center'>
                                    <FormControlLabel
                                        control={<Radio color='primary' />}
                                        label={q.answer1}
                                        value={1}
                                        labelPlacement='end'
                                    />
                                </Grid>
                                <Grid container justify='center' alignItems='center'>
                                    <FormControlLabel
                                        control={<Radio color='primary' />}
                                        label={q.answer2}
                                        value={2}
                                        labelPlacement='end'
                                    />
                                </Grid>
                                <Grid container justify='center' alignItems='center'>
                                    <FormControlLabel
                                        control={<Radio color='primary' />}
                                        label={q.answer3}
                                        value={3}
                                        labelPlacement='end'
                                    />
                                </Grid>
                                <Grid container justify='center' alignItems='center'>
                                    <FormControlLabel
                                        control={<Radio color='primary' />}
                                        label={q.answer4}
                                        value={4}
                                        labelPlacement='end'
                                    />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>     
            </Grid>
        );
        setQuestions(mappedQuestions);
    }

    // retrieve data about the specific quiz from firebase and use it to generate question components
    React.useEffect(() => {
        db.goOnline();
        db.ref('quizzes/' + props.quizName).once('value').then(snapshot => generateQuiz(snapshot.val()));
        return () => {
            db.goOffline();
        }
    }, []);

    return(
        <React.Fragment>
            <Grid item xs={12} /><Grid item xs={12} />
            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant="h2"> {props.quizName} </Typography>
            </Grid>
            <Grid item xs={12} /><Grid item xs={12} />

            {questions}

            <Grid item xs={12} /><Grid item xs={12} />

            <Button
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                onClick={gradeQuiz}
            >
                Grade my Quiz
            </Button>

            <Grid item xs={12} /><Grid item xs={12} />

            {scoreMessage}

            <Grid item xs={12} /><Grid item xs={12} />
        </React.Fragment>
    );
}

export default TakeQuiz;