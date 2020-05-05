import * as React from 'react';
import { Grid, Paper, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button } from '@material-ui/core';

interface QuestionProps {
    number: number;
    updateParentForm: Function;
}

const Question: React.FC<QuestionProps> = (props) => {
    const [questionInfo, setQuestionInfo] = React.useState<QuestionInfo>(
        {
            questionName: null,
            questionNumber: props.number,
            answer1: null,
            answer2: null,
            answer3: null,
            answer4: null,
            correctAnswer: -1,
        }
    );

    const handleAnswerChange = (newAnswer: string, answerNumber: number) => {
        switch (answerNumber) {
            case 1:
                setQuestionInfo({ ...questionInfo, answer1: newAnswer });
                break;
            case 2:
                setQuestionInfo({ ...questionInfo, answer2: newAnswer });
                break;
            case 3:
                setQuestionInfo({ ...questionInfo, answer3: newAnswer });
                break;
            case 4:
                setQuestionInfo({ ...questionInfo, answer4: newAnswer });
                break;
            default:
                throw new Error("Invalid answer number");
        }
    }

    const genQuestionLabel = (number: number) => {
        var q = 'Question ';
        return q.concat(number.toString());
    }

    React.useEffect(() => {
        props.updateParentForm(props.number, questionInfo);
    }, [questionInfo]);

    return (
        <React.Fragment>
                <Grid container alignItems='center'>
                    <Grid item xs={12}>
                    <Paper>
                        <TextField
                            inputProps={ {'data-testid': genQuestionLabel(props.number)} }
                            label={genQuestionLabel(props.number)}
                            fullWidth
                            variant='outlined'
                            onChange={e => setQuestionInfo({ ...questionInfo, questionName: e.target.value })}
                        />
                    </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Paper>
                        <TextField
                            inputProps={ {'data-testid': genQuestionLabel(props.number)+'a1'} }
                            label='Answer Choice 1'
                            fullWidth
                            variant='outlined'
                            onChange={(e) => handleAnswerChange(e.target.value, 1)}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Paper>
                        <TextField
                            inputProps={ {'data-testid': genQuestionLabel(props.number)+'a2'} }
                            label='Answer Choice 2'
                            fullWidth
                            variant='outlined'
                            onChange={(e) => handleAnswerChange(e.target.value, 2)}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Paper>
                        <TextField
                            inputProps={ {'data-testid': genQuestionLabel(props.number)+'a3'} }
                            label='Answer Choice 3'
                            fullWidth
                            variant='outlined'
                            onChange={(e) => handleAnswerChange(e.target.value, 3)}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Paper>
                        <TextField
                            inputProps={ {'data-testid': genQuestionLabel(props.number)+'a4'} }
                            label='Answer Choice 4'
                            fullWidth
                            variant='outlined'
                            onChange={(e) => handleAnswerChange(e.target.value, 4)}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <FormControl variant='outlined' fullWidth>
                            <RadioGroup
                                row
                                value={questionInfo.correctAnswer}
                            >
                                <FormControlLabel
                                    data-testid={genQuestionLabel(props.number)+'c1'}
                                    value={1}
                                    control={<Radio color='primary' />}
                                    label='1'
                                    labelPlacement="start"
                                    onChange={() => setQuestionInfo({ ...questionInfo, correctAnswer: 1 })}
                                />
                                <FormControlLabel
                                    data-testid={genQuestionLabel(props.number)+'c2'}
                                    value={2}
                                    control={<Radio color='primary' />}
                                    label='2'
                                    labelPlacement="start"
                                    onChange={() => setQuestionInfo({ ...questionInfo, correctAnswer: 2 })}
                                />
                                <FormControlLabel
                                    data-testid={genQuestionLabel(props.number)+'c3'}
                                    value={3}
                                    control={<Radio color='primary' />}
                                    label='3'
                                    labelPlacement="start"
                                    onChange={() => setQuestionInfo({ ...questionInfo, correctAnswer: 3 })}
                                />
                                <FormControlLabel
                                    data-testid={genQuestionLabel(props.number)+'c4'}
                                    value={4}
                                    control={<Radio color='primary' />}
                                    label='4'
                                    labelPlacement="start"
                                    onChange={() => setQuestionInfo({ ...questionInfo, correctAnswer: 4 })}
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