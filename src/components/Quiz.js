import React from 'react';
import Question from './Question.js';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';

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
            questions: [],
        }
    }

    changeQuestionsList(newNum) {
        let arr = [];
        for (var i = 0; i < newNum; i++) {
            arr.push(<Question key={i} />);
        }

        return arr;
    }

    handleNameChange(newName) {
        this.setState({ name: newName });
    }

    handleNumQuestionsChange(i) {
        this.setState({ questions: this.changeQuestionsList(i)});
        this.setState({ numQuestions: i });
        document.getElementById('number-of-questions').disabled = true;
        this.render();
    }

    render() {
        return (
            <div className={classes.root}>
                <Grid container spacing={3} alignItems='center'>
                    <Grid item xs={12} /><Grid item xs={12} />
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <Typography variant="h2"> {this.state.name} </Typography>
                    </Grid>

                     <Grid item xs={10}>
                        <TextField
                            label='Quiz Name'
                            fullWidth
                            variant='outlined'
                            onChange={e => this.handleNameChange(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id='number-of-questions'
                            label='# of Questions'
                            variant='outlined'
                            disabled={false}
                            onChange={e => this.handleNumQuestionsChange(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} /><Grid item xs={12} />

                    {this.state.questions}
                </Grid>
            </div>
        );
    }
}

export default Quiz;