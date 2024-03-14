import React, { useState, useEffect } from "react";
import Message from "../services/Message";
import Username from "../services/Username";
import DisplayMessage from "./DisplayMessage";

const SendMessage = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const handleChange = (event) => {
        const value = event.target.value;
        setMessage(value);
    }
    useEffect(() => {
        Username.getAll().on("child_added", (snapshot) => {
            const data = snapshot.val();
            if (data.email === localStorage.getItem("email")) {
                setUsername(data.username);
            }
        })
    }, [username]);

    const storeMessage = async (e) => {
        e.preventDefault();
        //User enters an empty message
        if (message.trim() === "") {
            alert("Please enter a message");
            return;
        }
        //Storing the date, time, sender's info, and the text to database
        let date = new Date();
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let name = month[date.getMonth()];
        let time = name + " " + date.getDate() + ", " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        const messageToStore = {
            text: message,
            sender: username,
            time: time,
        }
        Message.create(messageToStore)
            .then(() => {
                setMessage("");
            })
            .catch((e) => {
                alert(e);
            })
    }
    return (
        <div id="textContainer">
            <DisplayMessage id="textScreen" />
            <form onSubmit={storeMessage} className="send-message">
                <div class="messageContainer">
                    <input
                        id="messageInput"
                        name="messageInput"
                        type="text"
                        value={message}
                        onChange={handleChange}
                        className="form__input"
                        placeholder="Type message..."
                    />
                    <button id="sendBtn" type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};
export default SendMessage;