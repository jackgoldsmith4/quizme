import React from 'react';
import { Grid, Paper, Divider, TextField, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  radioGroup: {
      width: 'auto',
      height: 'auto',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
  }
}));

//TODO make question and answers and radio button REQUIRED FIELDS
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

    handleQuestionChange(newQuestion) {
        this.setState({question: newQuestion})
    }

    handleAnswerChange(newAnswer, answerNumber) {
        switch (answerNumber) {
            case 1:
                this.setState({answer1: e.target.value});
                break;
            case 2:
                this.setState({answer2: e.target.value});
                break;
            case 3:
                this.setState({answer3: e.target.value});
                break;
            case 4:
                this.setState({answer4: e.target.value});
                break;
            default:
                throw new Error(); //TODO document
        }
    }

    handleRadioChange(correctAnswerNum) {
        //TODO what is the difference between these lines?
        //first one logs correct answer, second one keeps the button checked
        this.state.correctAnswer = correctAnswerNum;
        this.setState({correctAnswer: correctAnswerNum});
        console.log(this.state.correctAnswer);
    }

    render() {
        return (
            <React.Fragment>
                 <Grid container alignItems='center'>
                     <Grid item xs={12}>
                        <Paper className={styles.paper}>
                            <TextField
                                label='Question:'
                                fullWidth
                                variant='outlined'
                                onChange={e => this.handleQuestionChange(e.target.value)}
                            />
                        </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={styles.paper}>
                            <TextField
                                label='Answer Choice 1:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.handleAnswerChange(e.target.value, 1)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={styles.paper}>
                            <TextField
                                label='Answer Choice 2:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.handleAnswerChange(e.target.value, 2)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={styles.paper}>
                            <TextField
                                label='Answer Choice 3:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.handleAnswerChange(e.target.value, 3)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper className={styles.paper}>
                            <TextField
                                label='Answer Choice 4:'
                                fullWidth
                                variant='outlined'
                                onChange={(e) => this.handleAnswerChange(e.target.value, 4)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={12}>
                         <Paper>
                            <RadioGroup className={styles.radioGroup}>
                                 <Radio
                                    checked={this.state.correctAnswer === 1}
                                    onChange={() => this.handleRadioChange(1)}
                                    value='1'
                                 />
                                 <Radio
                                     checked={this.state.correctAnswer === 2}
                                     onChange={() => this.handleRadioChange(2)}
                                     value='2'
                                 />
                                 <Radio
                                    checked={this.state.correctAnswer === 3}
                                    onChange={() => this.handleRadioChange(3)}
                                    value='3'
                                 />
                                 <Radio
                                    checked={this.state.correctAnswer === 4}
                                    onChange={() => this.handleRadioChange(4)}
                                    value='4'
                                 />
                            </RadioGroup>
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