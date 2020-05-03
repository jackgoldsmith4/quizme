import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import db from '../base.js';

interface HomeProps {
    sendQuizNameToTakeQuiz: (name: string) => void;
}

const Home: React.FC<HomeProps> = (props) => {
    let history = useHistory();

    const [quizButtons, setQuizButtons] = React.useState<JSX.Element[]>([]);

    const sendQuizName = (name: string) => {
        props.sendQuizNameToTakeQuiz(name);
        history.push('/take-quiz');
    }

    const generateQuizButtons = (quizList: JSON) => {
        if (quizList) {
            var keys = Object.keys(quizList);
            var newButtons: JSX.Element[] = [];

            newButtons.push(
                <Grid container key='take-a-quiz' direction='row' justify='center' alignItems='center'>
                    <Typography variant='h4'> Take a quiz: </Typography>
                </Grid>
            );
            
            keys.map((name) => newButtons.push(
                <Button
                    key={name}
                    fullWidth
                    size='large'
                    onClick={() => sendQuizName(name)}
                >
                    {name}
                </Button>
            ));

            setQuizButtons(newButtons);
        }
    }

    React.useEffect(() => {
        db.goOnline();
        db.ref('quizzes').once('value').then(snapshot => { generateQuizButtons(snapshot.val())});
        return () => {
            db.goOffline();
        }
    }, []);

    return (
        <React.Fragment>
            <Grid item xs={12} /><Grid item xs={12} />

            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant="h2"> Welcome to QuizMe! </Typography>
            </Grid>

            <Grid item xs={12} /><Grid item xs={12} />
            <Grid item xs={12} /><Grid item xs={12} />

            {quizButtons}

            <Grid item xs={12} /><Grid item xs={12} />

            <Button 
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                onClick={() => history.push('/create-quiz')}
            >
                Create a Quiz
            </Button>
        </React.Fragment>
    );
}

export default Home;