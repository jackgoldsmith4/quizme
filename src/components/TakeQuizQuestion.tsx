import * as React from 'react';
import { Grid, Paper, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';

interface TQQuestionProps {
    quizInfo: QuestionInfo,
    updateParentState: (choice: number, correct: number, index: number) => void
}

const TakeQuizQuestion: React.FC<TQQuestionProps> = (props) => {
    const [radioValue, setRadioValue] = React.useState<number>(0);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, correct: number, index: number) => {
        var choice = Number(e.target.value);
        setRadioValue(choice);
        props.updateParentState(choice, correct, index);
    };

    return (
        <Paper>
            <FormControl variant='outlined' fullWidth>
                <RadioGroup
                    value={radioValue}
                    onChange={(e) => handleAnswerChange(e, props.quizInfo.correctAnswer, props.quizInfo.questionNumber-1)}
                >
                    <Grid container justify='center' alignItems='center'>
                        <FormControlLabel
                            data-testid={'q'+props.quizInfo.questionNumber+'a1'}
                            control={<Radio color='primary' />}
                            value={1}
                            label={props.quizInfo.answer1}                          
                        />
                    </Grid>
                    <Grid container justify='center' alignItems='center'>
                        <FormControlLabel
                            data-testid={'q'+props.quizInfo.questionNumber+'a2'}
                            control={<Radio color='primary' />}
                            value={2}
                            label={props.quizInfo.answer2}                          
                        />
                    </Grid>
                    <Grid container justify='center' alignItems='center'>
                        <FormControlLabel
                            data-testid={'q'+props.quizInfo.questionNumber+'a3'}
                            control={<Radio color='primary' />}
                            value={3}
                            label={props.quizInfo.answer3}                          
                        />
                    </Grid>
                    <Grid container justify='center' alignItems='center'>
                        <FormControlLabel
                            data-testid={'q'+props.quizInfo.questionNumber+'a4'}
                            control={<Radio color='primary' />}
                            value={4}
                            label={props.quizInfo.answer4}                          
                        />
                    </Grid>
                </RadioGroup>
            </FormControl>
        </Paper>
    );
}

export default TakeQuizQuestion;