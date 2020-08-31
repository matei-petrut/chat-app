import React from "react";
import { Grid, Typography } from "@material-ui/core";

function JoinMessage(props) {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Typography align="right">
                    {props.name} joined the chat
                </Typography>
            </Grid>
        </Grid>
    );
}

export default JoinMessage;