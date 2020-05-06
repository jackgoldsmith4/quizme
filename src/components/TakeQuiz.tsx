import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';

import TakeQuizQuestion from './TakeQuizQuestion';
import db from '../base.js';

interface TakeQuizProps {
    quizName: string;
    quizData?: QuizDBSnapshot;
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
                    <Typography data-testid='grade-results' variant='h4'> {score} / {numQuestions} Correct </Typography>
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

    const updateScoreTracker = (choice: number, correct: number, index: number) => {
        var tempTracker = scoreTracker;
        if (choice == correct) {
            tempTracker[index] = true;
        } else {
            tempTracker[index] = false;
        }

        setScoreTracker(tempTracker);
    }

    const generateQuiz = (quizData: QuizDBSnapshot) => {
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
                    <TakeQuizQuestion quizInfo={q} updateParentState={updateScoreTracker} />
                </Grid>     
            </Grid>
        );
        setQuestions(mappedQuestions);
    }

    // retrieve data about the quiz and use it to generate quiz elements
    React.useEffect(() => {
        if (!props.quizData) {
            db.goOnline();
            db.ref('quizzes/' + props.quizName).once('value').then(snapshot => generateQuiz(snapshot.val()));
            return () => {
                db.goOffline();
            }
        } else {
            generateQuiz(props.quizData!);
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