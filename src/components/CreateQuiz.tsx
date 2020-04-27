import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Question from './Question';
import db from '../base.js';

const CreateQuiz: React.FC = () => {
    let history = useHistory();

    const [name, setName] = React.useState<string>('Create your Quiz');
    const [numQuestions, setNumQuestions] = React.useState<number>(0);
    const [questionComponents, setQuestionComponents] = React.useState<JSX.Element[]>([]);
    const [questions, setQuestions] = React.useState<any[]>([]);

    const handleNumQuestionsChange = (newNum: number) =>  {
        if (newNum >= 1) {
            var arr: JSX.Element[] = questionComponents.slice(0);

            if (newNum > numQuestions) {
                for (var i=numQuestions; i<newNum; i++) {
                    arr.push(<Question key={i+1} number={i+1} handleQuestionChange={handleQuestionChange} />);
                }
            } else if (newNum < numQuestions) {
                for (i=newNum; i<numQuestions; i++) {
                    arr.pop();
                }
            }

            setQuestionComponents(arr);
            setNumQuestions(newNum);
        }
    }

    // retrieves data from a child Question component
    const handleQuestionChange = (q: string, a1: string, a2: string, a3: string, a4: string, c: number, num: number) => {
        var question = {
            questionName: q,
            questionNumber: num,
            answer1: a1,
            answer2: a2,
            answer3: a3,
            answer4: a4,
            correctAnswer: c,
        }

        var arr = questions;
        arr[num-1] = question;
        setQuestions(arr);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // TODO add validation here to make sure necessary fields are filled out correctly

        db.ref('quizzes/' + name).set({
            numQuestions: numQuestions,
        });

        questions.map(q => {
            db.ref('quizzes/' + name + '/questions/' + q.questionNumber).set(q);
        });

        history.push('/');
    }


    return (
        <React.Fragment>
            <Grid item xs={12} /><Grid item xs={12} />
            <Grid container direction='row' justify='center' alignItems='center'>
                <Typography variant="h2"> {name} </Typography>
            </Grid>

            <Grid item xs={10}>
                <TextField
                    label='Quiz Name'
                    fullWidth
                    variant='outlined'
                    onChange={e => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    id='number-of-questions'
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