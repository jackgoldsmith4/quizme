import React from 'react';
import Title from './Title.js';
import Namespace from './Namespace.js';
import Question from './Question.js';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Quiz() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='center'>
                <Title />
                <Namespace />
                <Question />
                <Question />
                <Question />
                <Question />
            </Grid>
        </div>
    );
}
