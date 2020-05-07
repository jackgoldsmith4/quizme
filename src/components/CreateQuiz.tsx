import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import CreateQuizQuestion from './CreateQuizQuestion';
import db from '../base.js';

const CreateQuiz: React.FC = () => {
    let history = useHistory();

    const [name, setName] = React.useState<string>('Create your Quiz');
    const [numQuestions, setNumQuestions] = React.useState<number>(0);
    const [questionComponents, setQuestionComponents] = React.useState<JSX.Element[]>([]);
    const [questions, setQuestions] = React.useState<QuestionInfo[]>([]);

    const handleNumQuestionsChange = (newNum: number) =>  {
        if (newNum <= 0) {
            newNum = 1;
        }

        var arr: JSX.Element[] = questionComponents.slice(0);

        if (newNum > numQuestions) {
            for (var i=numQuestions; i<newNum; i++) {
                arr.push(
                    <CreateQuizQuestion key={i+1} number={i+1} updateParentState={setQuestionN} />
                );
            }
        } else if (newNum < numQuestions) {
            for (i=newNum; i<numQuestions; i++) {
                arr.pop();
            }
        }

        setQuestionComponents(arr);
        setNumQuestions(newNum);
    }

    // function to be passed to each child question component
    const setQuestionN = (index: number, questionInfo: QuestionInfo) => {
        var tempQuestions = questions;
        tempQuestions[index] = questionInfo;
        setQuestions(tempQuestions);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (name !== 'Create your Quiz' && numQuestions > 0) {
            for (var i=1; i<=numQuestions; i++) {
                var q: QuestionInfo = questions[i];
                if (q.questionName == null || q.answer1 == null || q.answer2 == null || q.answer3 == null || q.answer4 == null || q.correctAnswer == -1) {
                    alert('Please finish filling out question ' + q.questionNumber);
                    return;
                }
            }

            db.collection('quizzes').doc(name).set({
                name: name,
                numQuestions: numQuestions,
                questions: questions.splice(1)
            });
    
            history.push('/');
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} /><Grid item xs={12} />
            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant="h2"> {name} </Typography>
            </Grid>

            <Grid item xs={10}>
                <TextField
                    inputProps={ {'data-testid':'quiz-name-field'} }
                    label='Quiz Name'
                    fullWidth
                    variant='outlined'
                    onChange={e => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    inputProps={ {'data-testid':'number-of-questions-field'} }
                    label='# of Questions'
                    variant='outlined'
                    type='number'
                    defaultValue={0}
                    onChange={e => handleNumQuestionsChange(Number(e.target.value))}
                />
            </Grid>
            <Grid item xs={12} /><Grid item xs={12} />

            {questionComponents}

            <Button
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                onClick={(e) => handleSubmit(e)}
            >
                Submit
            </Button>
            <Grid item xs={12} /><Grid item xs={12} />
        </React.Fragment>
    );
}

export default CreateQuiz;