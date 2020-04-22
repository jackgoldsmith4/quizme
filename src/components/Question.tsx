import * as React from 'react';
import { Grid, Paper, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button } from '@material-ui/core';

interface QuestionProps {
    number: number;
    handleQuestionChange: Function;
}

const Question: React.FC<QuestionProps> = (props) => {
    const [questionName, setQuestionName] = React.useState<string>('');
    const [answer1, setAnswer1] = React.useState<string>('');
    const [answer2, setAnswer2] = React.useState<string>('');
    const [answer3, setAnswer3] = React.useState<string>('');
    const [answer4, setAnswer4] = React.useState<string>('');
    const [correctAnswer, setCorrectAnswer] = React.useState<number>(0);

    const handleAnswerChange = (newAnswer: string, answerNumber: number) => {
        switch (answerNumber) {
            case 1:
                setAnswer1(newAnswer);
                break;
            case 2:
                setAnswer2(newAnswer);
                break;
            case 3:
                setAnswer3(newAnswer);
                break;
            case 4:
                setAnswer4(newAnswer);
                break;
            default:
                throw new Error("Invalid correct answer choice");
        }
    }

    const handleRadioChange = (correctAnswerNum: number) => {
        setCorrectAnswer(correctAnswerNum);
        props.handleQuestionChange(questionName, answer1, answer2, answer3, answer4, correctAnswer, props.number);
    }

    const genQuestionLabel = (number: number) => {
        var q = 'Question ';
        return q.concat(number.toString());
    }

    return (
        <React.Fragment>
                <Grid container alignItems='center'>
                    <Grid item xs={12}>
                    <Paper>
                        <TextField
                            label={genQuestionLabel(props.number)}
                            fullWidth
                            variant='outlined'
                            //required={true}
                            onChange={e => setQuestionName(e.target.value)}
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
                            onChange={(e) => handleAnswerChange(e.target.value, 1)}
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
                            onChange={(e) => handleAnswerChange(e.target.value, 2)}
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
                            onChange={(e) => handleAnswerChange(e.target.value, 3)}
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
                            onChange={(e) => handleAnswerChange(e.target.value, 4)}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <FormControl variant='outlined' fullWidth /*required={true}*/>
                            <RadioGroup
                                row
                                value={correctAnswer}
                            >
                                <FormControlLabel
                                    value={1}
                                    control={<Radio color='primary' />}
                                    label='1'
                                    labelPlacement="start"
                                    onChange={() => handleRadioChange(1)}
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio color='primary' />}
                                    label='2'
                                    labelPlacement="start"
                                    onChange={() => handleRadioChange(2)}
                                />
                                <FormControlLabel
                                    value={3}
                                    control={<Radio color='primary' />}
                                    label='3'
                                    labelPlacement="start"
                                    onChange={() => handleRadioChange(3)}
                                />
                                <FormControlLabel
                                    value={4}
                                    control={<Radio color='primary' />}
                                    label='4'
                                    labelPlacement="start"
                                    onChange={() => handleRadioChange(4)}
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

export default Question;