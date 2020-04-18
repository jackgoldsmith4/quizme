import * as React from 'react';
import { Grid, Paper, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button } from '@material-ui/core';

interface QuestionProps {
    number: number;
    handleQuestionChange: Function;
}

interface QuestionState {
    questionName: string;
    number: number;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

class Question extends React.Component<QuestionProps, QuestionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            questionName: '',
            number: this.props.number,
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: 0,
        }
        this.handleQuestionSubmit=this.handleQuestionSubmit.bind(this);
    }

    handleQuestionNameChange(newQuestion: string) {
        this.setState({questionName: newQuestion})
    }

    handleAnswerChange(newAnswer: string, answerNumber: number) {
        switch (answerNumber) {
            case 1:
                this.setState({answer1: newAnswer});
                break;
            case 2:
                this.setState({answer2: newAnswer});
                break;
            case 3:
                this.setState({answer3: newAnswer});
                break;
            case 4:
                this.setState({answer4: newAnswer});
                break;
            default:
                throw new Error("Invalid correct answer choice");
        }
    }

    handleRadioChange(correctAnswerNum: number, next: Function) {
        //TODO what is the difference between these lines?
        //first one logs correct answer below, second one keeps the button checked correctly
        //this.state.correctAnswer = correctAnswerNum;
        this.setState({correctAnswer: correctAnswerNum});
        //console.log(this.state.correctAnswer);
        next();
    }

    // add the number of the question to the question's label
    genQuestionLabel(number: number) {
        var q = 'Question ';
        return q.concat(number.toString());
    }

    // update the parent component with information about this question
    handleQuestionSubmit() {
        this.props.handleQuestionChange(this.state.questionName,
                                        this.state.answer1,
                                        this.state.answer2,
                                        this.state.answer3,
                                        this.state.answer4,
                                        this.state.correctAnswer,
                                        this.props.number
        );
    }

    render() {
        return (
            <React.Fragment>
                 <Grid container alignItems='center'>
                     <Grid item xs={12}>
                        <Paper>
                            <TextField
                                label={this.genQuestionLabel(this.state.number)}
                                fullWidth
                                variant='outlined'
                                //required={true}
                                onChange={e => this.handleQuestionNameChange(e.target.value)}
                            />
                        </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <TextField
                                label='Answer Choice 1'
                                fullWidth
                                variant='outlined'
                                //required={true}
                                onChange={(e) => this.handleAnswerChange(e.target.value, 1)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <TextField
                                label='Answer Choice 2'
                                fullWidth
                                variant='outlined'
                                //required={true}
                                onChange={(e) => this.handleAnswerChange(e.target.value, 2)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <TextField
                                label='Answer Choice 3'
                                fullWidth
                                variant='outlined'
                                //required={true}
                                onChange={(e) => this.handleAnswerChange(e.target.value, 3)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={6} sm={6}>
                         <Paper>
                            <TextField
                                label='Answer Choice 4'
                                fullWidth
                                variant='outlined'
                                //required={true}
                                onChange={(e) => this.handleAnswerChange(e.target.value, 4)}
                            />
                         </Paper>
                     </Grid>
                     <Grid item xs={12}>
                         <Paper>
                             <FormControl variant='outlined' fullWidth /*required={true}*/>
                                <RadioGroup
                                    row
                                    value={this.state.correctAnswer}
                                >
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio color='primary' />}
                                        label='1'
                                        labelPlacement="start"
                                        onChange={() => this.handleRadioChange(1, this.handleQuestionSubmit)}
                                    />
                                    <FormControlLabel
                                         value={2}
                                         control={<Radio color='primary' />}
                                         label='2'
                                         labelPlacement="start"
                                         onChange={() => this.handleRadioChange(2, this.handleQuestionSubmit)}
                                    />
                                    <FormControlLabel
                                         value={3}
                                         control={<Radio color='primary' />}
                                         label='3'
                                         labelPlacement="start"
                                         onChange={() => this.handleRadioChange(3, this.handleQuestionSubmit)}
                                    />
                                    <FormControlLabel
                                         value={4}
                                         control={<Radio color='primary' />}
                                         label='4'
                                         labelPlacement="start"
                                         onChange={() => this.handleRadioChange(4, this.handleQuestionSubmit)}
                                    />
                                </RadioGroup>
                             </FormControl>
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