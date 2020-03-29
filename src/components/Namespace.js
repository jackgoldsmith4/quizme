import React from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function Namespace() {
    return (
        <React.Fragment>
            <Grid item xs={10}>
                <TextField id='outlined-full-width' label='Quiz Name' fullWidth variant='outlined' />
            </Grid>
            <Grid item xs={2}>
                <TextField id='outlined-basic' label='Questions' variant='outlined' />
            </Grid>
        </React.Fragment>
    );
}