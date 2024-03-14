import React from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {
    BrowserRouter,
    NavLink,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import {useState} from "react";
import {firebase} from "../firebase";
import Username from "../services/Username";

function Register() {
    const auth = firebase.auth();
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    //Changing registration data based on user input
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const signUp = (e) => {
        e.preventDefault();
        //signing up user via firebase
        createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        alert("Email Verification Sent!");
                        let userData = {
                            email: inputs.email,
                            username: inputs.username,
                        };
                        //storing user data in database
                        Username.create(userData)
                            .then(() => {
                                alert("Userdata successfully created");
                            })
                            .catch((e) => {
                                const errorCode = e.code;
                                if (errorCode == 'auth/email-already-in-use') {
                                    alert("Email has already been used for a different account.");
                                }
                                console.log(e);
                            })
                        navigate("/");
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                    alert("Password too weak");
                } else {
                    alert(errorMessage);
                }
            })
    }
    return (
        <div class="container-fluid">
            <div class="row main-content bg-success text-center">
                <div class="col-md-4 text-center company__info">
                    <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
                    <img src="https://sportslogohistory.com/wp-content/uploads/2023/09/uc_san_diego_tritons_2018-2021_a.png"></img>
                    <h2>TritonChat</h2>
                </div>
                <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                    <div class="container-fluid">
                        <div class="row">
                            <h2>Register</h2>
                        </div>
                        <div class="row">
                            <form onSubmit={signUp} control="" class="form-group">
                                <div class="row">
                                    <input type="email" name="email" value = {inputs.email} onChange={handleChange} id="email" class="form__input" placeholder="Email" />
                                </div>
                                <div class="row">
                                    <input type="password" name="password" value = {inputs.password} onChange={handleChange} id="password" class="form__input" placeholder="Password" />
                                </div>
                                <div class="row">
                                    <input type="text" name="username" value = {inputs.username} id="username" onChange={handleChange} class="form__input" placeholder="Username" />
                                </div>
                                <div class="row">
                                    <input type="submit" value="Register" class="btn" />
                                    <NavLink id="Register" to="/">Back</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;