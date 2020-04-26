import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import db from '../base.js';

interface HomeProps {
    sendName: Function;
    history: any; // TODO typecheck history prop
}

const Home: React.FC<HomeProps> = (props) => {
    const [quizButtons, setQuizButtons] = React.useState<JSX.Element[]>([]);

    const handleTakeQuizClick = (name: string) => {
        props.sendName(name);
        props.history.push('/take-quiz');
    }

    const handleCreateQuizClick = () => {
        props.history.push('/create-quiz');
    }

    const generateQuizButtons = (quizList: JSON) => {
        if (quizList) {
            var keys = Object.keys(quizList);
            var newButtons: JSX.Element[] = keys.map((name) =>
                <Button
                    key={name}
                    fullWidth
                    size='large'
                    onClick={() => handleTakeQuizClick(name)}
                >
                    {name}
                </Button>
            );
            setQuizButtons(newButtons);
        }
    }

    db.ref('quizzes').once('value').then(snapshot => generateQuizButtons(snapshot.val()));

    return (
        <React.Fragment>
            <Grid item xs={12} /><Grid item xs={12} />

            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant="h2"> Welcome to QuizMe! </Typography>
            </Grid>

            <Grid item xs={12} /><Grid item xs={12} />
            <Grid item xs={12} /><Grid item xs={12} />

            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant='h4'> Take a quiz: </Typography>
            </Grid>

            {quizButtons}

            <Grid item xs={12} /><Grid item xs={12} />

            <Button 
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                onClick={handleCreateQuizClick}
            >
                Create a Quiz
            </Button>
        </React.Fragment>
    );
}

export default Home;