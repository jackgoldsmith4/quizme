import React from 'react';
import { Grid, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Question() {
    const classes = useStyles();
    return (
        <React.Fragment>
             <Grid container>
                 <Grid item xs={12}>
                     <Paper className={classes.paper}>Question</Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>Answer1</Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>Answer2</Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>Answer3</Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>Answer4</Paper>
                 </Grid>
             </Grid>

            <Grid item xs={12} />
            <Grid item xs={12} />
        </React.Fragment>
    );
}