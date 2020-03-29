import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function Title() {
    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
        >
            <Typography variant="h1">
                Create your Quiz
            </Typography>
        </Grid>
    );
}