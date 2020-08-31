import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    itemStyles: {
        backgroundColor: "#81b214",
        display: "table",
        padding: "2px 5px",
        margin: "1px 10px 5px 0",
        borderRadius: "5px",
        maxWidth: "55vw"
    }
});

function Message(props) {
    const classes = useStyles();

    return (
        <Grid container justify={props.positioning} alignItems={props.positioning}>
            <Grid item className={classes.itemStyles}>
                <Typography varinat="subtitle1" style={{color: "#206a5d"}}>
                    <strong>{props.name}</strong>
                </Typography>
                <Typography variant="h6">
                    {props.message}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Message;