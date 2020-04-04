import React from 'react';
import Namespace from './Namespace.js';
import Question from './Question.js';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
}));

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Create Your Quiz',
            numQuestions: 0,
        }
    }

    handleNameChange(newName) {
        this.state.name = newName;
        this.render();
    }

    handleNumQuestionsChange(i) {
        this.state.numQuestions = i;
        render();
    }

    render() {
        return (
            <div className={classes.root}>
                <Grid container spacing={3} alignItems='center'>
                    <Grid item xs={12} /><Grid item xs={12} />
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <Typography variant="h1"> {this.state.name} </Typography>
                    </Grid>
                    <Namespace
                        name={this.state.name}
                        onChange={(newName) => this.handleNameChange(newName)}
                    />
                    <Question />
                </Grid>
            </div>
        );
    }
}

export default Quiz;