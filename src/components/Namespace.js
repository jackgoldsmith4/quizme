import React from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function Namespace(props) {
    return (
        <React.Fragment>
            <Grid item xs={10}>
                <TextField
                    id='outlined-full-width'
                    label='Quiz Name'
                    fullWidth
                    variant='outlined'
                    onChange={(event) => props.onChange(event.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField id='outlined-basic' label='Questions' variant='outlined' />
            </Grid>
        </React.Fragment>
    );
}