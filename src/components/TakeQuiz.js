import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import db from '../base.js';

class TakeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = db.ref('quizzes/' + this.props.quizName);
        console.log(this.state);
    }

    render() {
        return(
            <React.Fragment>
                <Grid item xs={12} /><Grid item xs={12} />
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Typography variant="h2"> {this.state.quizName} </Typography>
                </Grid>

                <Grid item xs={12} /><Grid item xs={12} />

            </React.Fragment>
        );
    }
}

export default TakeQuiz;