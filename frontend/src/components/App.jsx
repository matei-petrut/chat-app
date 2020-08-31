import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./Message.jsx";
import JoinMessage from "./JoinMessage";
import { Container, Grid, Input, Typography, Button, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import ScrollToBottom from 'react-scroll-to-bottom';

const { v4: uuidv4 } = require('uuid');

const socket = io.connect("http://localhost:4000");

const useStyles = makeStyles({
    containerStyles: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    chatContainer: {
        backgroundColor: "#fff7f7",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
        padding: "0",
        margin: "0 auto",
        width: "75vw",
        height: "90vh",
        overflow: "auto",
    },
    sendMsgContainer: {
        margin: "0 auto",
        padding: "0",
        width: "75vw",
        height: "10vh",
        flex: "1"
    }
});

function App() {
    const classes = useStyles();
    const name = useSelector(state => state);
    const [message, setMessage] = useState({text: "", user: name, id: uuidv4()});
    const [chat, setChat] = useState([]);

    useEffect( () => {
        socket.on("message", message => {
            receivedMessage(message);
        });

        socket.on("connect", () => {
            console.log("a user connected");
       });
    }, []);

    function receivedMessage(userMessage) {
        setChat(prevChat => [...prevChat, userMessage]);
    }

    const submitMessage = (e) => {
        //PREVENT PAGE FROM RELOADING
        e.preventDefault();

        //OBJECT DECOMPOSITION
        
        //WE CHECK IF THE MESSAGE IS EMPTY
        if (message.text.length > 0) 
            socket.emit("message-send", message);


        setMessage({...message, text: ""});
    };

    const handleChange = (e) => {
        setMessage({...message, text: e.target.value});
    }

    const handleKeyPressed = (e) => {
        if (e.keyCode === 13 && !e.shiftKey)
            submitMessage(e);
    }

    function joinMessage() {
        return (
            <JoinMessage />
        );
    }

   

    return (
        <div className={classes.containerStyles}>
            <Container className={classes.chatContainer} justify="center" alignItems="center" direction="column" spacing={4}>
                <ScrollToBottom mode="top">
                    {chat.map((item, index) => {
                            return (
                                <div>
                                    <Message
                                        positioning={item.id === message.id ? "flex-end" : "flex-start"}
                                        name={item.user}
                                        message={item.text}
                                        key={index}
                                    />
                                    {item.text.length > 3 && <JoinMessage />}
                                </div>
                            );
                    })}
                </ScrollToBottom>
            </Container>
            <form >
                <Container className={classes.sendMsgContainer}>
                    <Grid container justify="flex-start" alignItems="center" direction="row">
                        <Grid item xs={11}>
                            <textarea
                                maxLength="1000"
                                style={{display: "table-cell", width: "100%", margin: "0", height: "9vh", resize: "none", padding: "0"}}
                                value={message.text}
                                onChange={handleChange}
                                placeholder="Type your message..."
                                onKeyDown={handleKeyPressed}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                size="large"
                                onClick={submitMessage}
                                style={{margin: "0 20%", backgroundColor: "blue"}}
                            ><strong style={{color: "white"}}>SEND</strong></Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </div>
    );
}

export default App;