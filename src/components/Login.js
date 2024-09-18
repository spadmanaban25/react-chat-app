import React from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import {
    BrowserRouter,
    NavLink,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

function Login({ loginF }) {
    const auth = firebase.auth();
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        //This means that password was stored in localStorage, implying that 'remember me' was checked
        //prefills textbox with fields of that account
        if (localStorage.getItem("password") != "") {
            setInputs({
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
                checked: true
            });
        }
    }, []);
    const handleClick = (event) => {
        if (event.target.id == 'guest') {
            localStorage.setItem("guestAccess", true);
        } else {
            localStorage.setItem("guestAccess", false);
        }
    }
    const handleChange = (event) => {
        //Changes state of email, password, and checkbox based on user input
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }
    
    const login = (e) => {
        e.preventDefault();
        if (localStorage.getItem("guestAccess") == 'true') {
            loginF();
            navigate("/User");
            return;
        } else {
            //signs in with current user data via firebase
            signInWithEmailAndPassword(auth, inputs.email, inputs.password)
                .then((userCredential) => {
                    loginF();
                    //storing email, password, and checkbox state for remembering account
                    localStorage.setItem("email", inputs.email);
                    localStorage.setItem("isChecked", inputs.checked);
                    if (inputs.checked) {
                        localStorage.setItem("password", inputs.password);
                    }
                    navigate("/User");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMess = error.message;
                    if (errorCode == 'auth/invalid-email' || errorCode == 'auth/invalid-credential') {
                        alert("Incorrect Username or Password");
                        setInputs({
                            email: "",
                            password: "",
                            checked: false,
                        })
                    } else if (errorCode == 'auth/user-not-found') {
                        alert("User not found");
                    } else if (errorCode == 'auth/too-many-requests') {
                        alert("You have made too many incorrect login requests. Your account has been temporarily disabled. Please reset your password, or try again later.");
                    }
                    console.log(error);
                });
        }

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
                            <h2>Log In</h2>
                        </div>
                        <div class="row">
                            <form onSubmit={login} control="" class="form-group">
                                <div class="row">
                                    <input type="email" name="email" id="email" value={inputs.email} onChange={handleChange} class="form__input" placeholder="Email" />
                                </div>
                                <div class="row">
                                    <input type="password" name="password" id="password" value={inputs.password} onChange={handleChange} class="form__input" placeholder="Password" />
                                </div>
                                <div class="row">
                                    <input type="checkbox" name="checked" id="remember_me" checked={inputs.checked} onChange={handleChange} class="" />
                                    <label for="remember_me">Remember Me!</label>
                                </div>
                                <div class="row">
                                    <input id="submit" type="submit" value="Submit" class="btn" onClick={handleClick} />
                                    <NavLink id="forgotPass" to="ForgotPassword">Forgot Password</NavLink>
                                </div>
                                <div class="row">
                                    <input id="guest" type="submit" value="Continue As Guest" class="btn" onClick={handleClick} />
                                </div>
                            </form>
                        </div>
                        <div class="row">
                            <center><p>Don't have an account? <NavLink to="Register">Register Here</NavLink></p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Login;