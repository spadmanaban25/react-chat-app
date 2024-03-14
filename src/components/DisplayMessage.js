import React, { useState, useEffect, useRef } from "react";
import Message from "../services/Message";
import FormatMessage from "./FormatMessage";

const DisplayMessage = () => {
    const [data, setData] = useState([]);
    const [prevLen, setPrevLen] = useState(0);
    const [currLen, setCurrLen] = useState(0);
    const messagesEndRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await Message.getAll().once("value");
                const arr = [];
                //Retrieve all data from database and store into data state
                snapshot.forEach((childSnapshot) => {
                    const itemData = childSnapshot.val();
                    arr.push(itemData);
                });
                setData(arr);
                setPrevLen(currLen);
                setCurrLen(arr.length);
                //This indicates if a new message has been sent then the current length has been updated and
                //Prev length stores the length before the new message was added
                //This scrolls to bottom to view new message
                if (currLen > prevLen) {
                    messagesEndRef.current.scrollIntoView();
                }
            } catch (e) {
                alert(e);
            };
        };
        fetchData();

    }, [data]);

    //format each data into a message box containing name, time, and actual message
    const arr = data.map((obj) => <FormatMessage name={obj.sender} message={obj.text} time={obj.time}></FormatMessage>);

    return (
        <div>
            <div class="messageBox">
                {arr}
                <div ref={messagesEndRef}></div>
            </div >
        </div>

    )

}
export default DisplayMessage;