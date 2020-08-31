import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography, Button, TextField } from "@material-ui/core";
import Footer from "./Footer.jsx";
import { useDispatch} from "react-redux";
import { setName } from "../actions/setName";

const useStyles = makeStyles({
    containerStyles: {
        margin: "200px auto",
        padding: "0",
        height: "80vh",
        flex: "1",
    },
    mainContainer: {
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    }
});

function WelcomeScreen(props) {
    const classes = useStyles();
    const [name, setUserName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    return (
        <div className={classes.mainContainer}>
        <Container fixed className={classes.containerStyles}>
            <Grid container justify="center" alignItems="center" direction="column" spacing={10}>
                <Grid item>
                    <Typography variant="h3" align="center" style={{fontFamily: "Bree Serif"}}>
                        Enter your name and start chating!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={name}
                        onChange={handleChange}
                        fullWidth
                        id="outlined-basic"
                        placeholder="Type your name here"
                    />
                </Grid>
                <Grid item>
                    <Link to="/chat" >
                        <Button
                            onClick={() => {dispatch(setName(name))}}
                            size="large"
                            variant="outlined"
                            disableElevation
                        >Go To Chat</Button>
                    </Link> 
                </Grid>
            </Grid>
        </Container>
        <Footer />
        </div>
    );
}

export default WelcomeScreen;
