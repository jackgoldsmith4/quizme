import React from 'react';
import { Grid, Paper, Divider, TextField, Checkbox } from '@material-ui/core';
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
                    <Paper className={classes.paper}>
                        <TextField label='Question:' fullWidth variant='outlined' />
                    </Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>
                        <TextField label='Answer Choice 1:' fullWidth variant='outlined' />
                        <Checkbox />
                     </Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>
                        <TextField label='Answer Choice 2:' fullWidth variant='outlined' />
                        <Checkbox />
                     </Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>
                        <TextField label='Answer Choice 3:' fullWidth variant='outlined' />
                        <Checkbox />
                     </Paper>
                 </Grid>
                 <Grid item xs={6} sm={6}>
                     <Paper className={classes.paper}>
                        <TextField label='Answer Choice 4:' fullWidth variant='outlined' />
                        <Checkbox />
                     </Paper>
                 </Grid>
             </Grid>

            <Grid item xs={12} />
            <Grid item xs={12} />
        </React.Fragment>
    );
}