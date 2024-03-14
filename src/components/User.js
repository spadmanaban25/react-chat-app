import React, { useState, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import Username from "../services/Username";
import SendMessage from "./SendMessage";
import "../index.css";
import DisplayMessage from "./DisplayMessage";

function User({ logout }) {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    //Retrieve Username from database
    useEffect(() => {
        const fetchData = async () => {
            try {
                Username.getAll().on("child_added", (snapshot) => {
                    const data = snapshot.val();
                    if (data.email === localStorage.getItem("email")) {
                        setUsername(data.username);
                    }
                })
                //If 'Remember Me' checkbox wasn't checked, clear password from localStorage
                //Ensures that fields in login will be cleared
                let flag = localStorage.getItem("isChecked") === "false";
                if (flag) {
                    localStorage.setItem("password", "");
                }
                await new Promise((resolve) => setTimeout(resolve, 800))
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return (
            <div class="loader">
            </div>
        )
    } else {
        return (
            <div>
                <h2 id="WelcomeMessage">Welcome {username}</h2>
                <button id="logout" onClick={logout}>Logout</button>
                <SendMessage />
            </div>
        )
    }

}
export default User;