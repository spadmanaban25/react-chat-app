import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { firebase } from "../firebase";
import {
    NavLink,
} from 'react-router-dom';

function ForgotPass() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();
    //Changes state of email based on user input
    const handleChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const passReset = (e) => {
        e.preventDefault();
        //resetting password via firebase
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            alert("Password Reset Email Sent!");
            navigate("/");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/invalid-email') {
              alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
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
                            <h2>Reset Password</h2>
                        </div>
                        <div class="row">
                            <form onSubmit={passReset} control="" class="form-group">
                                <div class="row">
                                    <input type="email" name="email" id="email" value = {email} onChange={handleChange} class="form__input" placeholder="Email" />
                                </div>
                                <div class="row">
                                    <input type="submit" value="Submit" class="btn" />
                                    <NavLink id="forgotPass" to="/">Back</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass;