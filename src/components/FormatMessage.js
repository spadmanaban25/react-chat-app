import React from "react";
import { useState, useEffect } from "react";
import Username from "../services/Username";

function FormatMessage({ name, message, time }) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (localStorage.getItem("guestAccess") == 'true') {
            setUsername('guest');
        } else {
            Username.getAll().on("child_added", (snapshot) => {
                const data = snapshot.val();
                if (data.email === localStorage.getItem("email")) {
                    setUsername(data.username);
                }
            })
        }
    }, [username]);
    //If the user is sending a message
    // Then the user's message would be blue
    //Otherwise all other messages would be default style
    const headStyle = {
        fontSize: "17px",
        fontWeight: "bold",
    }

    const textStyle = {
        fontSize: "15px",
    }

    if (name == username) {
        return (
            <div id="ownmessage">
                <p style={headStyle}>{name} {time}</p>
                <p style={textStyle}>{message}</p>
            </div>
        )
    } else {
        return (
            <div id="message">
                <p style={headStyle}>{name} {time}</p>
                <p style={textStyle}>{message}</p>
            </div>
        )
    }

}
export default FormatMessage;