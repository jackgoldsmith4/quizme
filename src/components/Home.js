import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import db from '../base.js';

class Home extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            quizButtons: [],
        }

        this.setQuizButtons = this.setQuizButtons.bind(this);

        // get the list of quiz names from firebase to display
        db.ref('quizzes').once('value').then(snapshot => { this.setQuizButtons(snapshot.val()) });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClick(name, next) {
        this.props.sendName(name);
    }

    setQuizButtons(quizList) {
        if (quizList && this._isMounted) {
            var keys = Object.keys(quizList);
            this.setState({
                quizButtons: keys.map((name) =>
                    <Button
                        key={name}
                        fullWidth
                        size='large'
                        onClick={() => this.handleClick(name, this.props.history.push('/take-quiz'))}
                    >
                        {name}
                    </Button>
                )
            })
        }
    }

    render() {
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

                {this.state.quizButtons}

                <Grid item xs={12} /><Grid item xs={12} />

                <Button
                    component={Link}
                    to='/create-quiz'
                    fullWidth
                    variant='contained'
                    color='primary'
                    size='large'
                >
                    Create a Quiz
                </Button>
            </React.Fragment>
        );
    }
}

export default Home;