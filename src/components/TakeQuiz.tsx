import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, ButtonGroup, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import db from '../base.js';

interface TakeQuizProps {
    quizName: string;
    history: any; // TODO typecheck history prop
}

const TakeQuiz: React.FC<TakeQuizProps> = (props) => {
    const [score, setScore] = React.useState<number>(0);
    const [scoreTracker, setScoreTracker] = React.useState<boolean[]>([]);
    const [scoreMessage, setScoreMessage] = React.useState<any>('');
    const [questions, setQuestions] = React.useState<any>('');
    const [numQuestions, setNumQuestions] = React.useState<number>(-1);

    const redirectToHome = () => {
        props.history.push('/');
    }

    const gradeQuiz = () => {
        var newScore: number = 0;
        scoreTracker.map(bool => {
            if (bool) {
                newScore++;
            }
        })
        setScore(newScore);
    
        var newMessage = (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant='h4'> {score} / {numQuestions} Correct </Typography>
                </Grid>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={redirectToHome}
                >
                    Return to Homepage
                </Button>
            </Grid>
        );
        setScoreMessage(newMessage);
    }

    const handleChange = (c: number, correct: number, index: number) => {
        var tempTracker = scoreTracker;
        if (c == correct) {
            tempTracker[index] = true;
        } else {
            tempTracker[index] = false;
        }
        setScoreTracker(tempTracker);
    }

    // ****** TODO ****** FIX RADIO GROUP AND BUTTONS
    const generateQuiz = (quizData: any) => { // TODO typecheck quizData correctly
        setNumQuestions(quizData.numQuestions);
    
        // grow the array boolean array of scores to correct size
        var tempTracker = scoreTracker;
        for (var i=0; i<numQuestions; i++) {
            tempTracker.push(false);
        }
        setScoreTracker(tempTracker);
    
        var qs: any[] = quizData.questions.slice(1); // TODO typecheck this correctly
        var mappedQuestions: JSX.Element[] = qs.map(q =>
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
                            onChange={(e: any) => handleChange(e.target.value, q.correctAnswer, q.questionNumber-1)}
                    >
                    <Button 
                        value='1' 
                        component={FormControlLabel} 
                        control={<Radio color='primary' />} 
                        label={q.answer1}
                    />
                    <Button 
                        value='2' 
                        component={FormControlLabel} 
                        control={<Radio color='primary' />} 
                        label={q.answer2}
                    />
                    <Button 
                        value='3' 
                        component={FormControlLabel} 
                        control={<Radio color='primary' />} 
                        label={q.answer3}
                    />
                    <Button 
                        value='4' 
                        component={FormControlLabel} 
                        control={<Radio color='primary' />} 
                        label={q.answer4}
                    />
                    </ButtonGroup>
            </Grid>
        );
        setQuestions(mappedQuestions);
    }

    // retrieve data about the specific quiz from firebase and use it to generate question components
    db.ref('quizzes/' + props.quizName).once('value').then(snapshot => { generateQuiz(snapshot.val()) });

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
                onClick={() => gradeQuiz}
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