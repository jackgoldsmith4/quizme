import React from 'react';
import { Grid, Paper, Divider, TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: 0,
        }
    }

    render() {
        return (
            <React.Fragment>
                 <Grid container alignItems='center'>
                     <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <TextField
                                label='Question:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.setState({question: e.target.value})}
                            />
                        </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={classes.paper}>
                            <TextField
                                label='Answer Choice 1:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.setState({answer1: e.target.value})}
                            />
                            <Checkbox color='primary'/>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={classes.paper}>
                            <TextField
                                label='Answer Choice 2:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.setState({answer2: e.target.value})}
                            />
                            <Checkbox color='primary'/>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={classes.paper}>
                            <TextField
                                label='Answer Choice 3:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.setState({answer3: e.target.value})}
                            />
                            <Checkbox color='primary'/>
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={classes.paper}>
                            <TextField
                                label='Answer Choice 4:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.setState({answer4: e.target.value})}
                            />
                            <Checkbox color='primary'/>
                         </Paper>
                     </Grid>
                 </Grid>

                <Grid item xs={12} />
                <Grid item xs={12} />
            </React.Fragment>
        );
    }
}

export default Question;