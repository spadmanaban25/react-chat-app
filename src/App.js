import React, { Component } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import ForgotPass from "./components/ForgotPass";
import { Routes, Route, NavLink, Navigate, Link, BrowserRouter } from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const storeLoggedIn = localStorage.getItem("loggedIn");
    this.state = {
      loggedIn: storeLoggedIn ? JSON.parse(storeLoggedIn) : false,
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //Functions for handling loggedIn state
  handleLogin = () => {
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", true);
  };
  handleLogout = () => {
    this.setState({ loggedIn: false });
    localStorage.setItem("loggedIn", false);
    //Indicates that remember me checkbox was not checked so removing email from localStorage
    let flag = localStorage.getItem("isChecked") === "false";
    if (flag) {
      localStorage.setItem("email", null);
    }
    localStorage.setItem("guestAccess", false);
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              this.state.loggedIn ? 
                <Navigate to="/User"></Navigate>:
                <Login loginF={this.handleLogin}></Login>
                }></Route>
            <Route path="Register" element={<Register />}></Route>
            <Route path="ForgotPassword" element={<ForgotPass />}></Route>
            <Route path="User" element={
              this.state.loggedIn ? 
                <User logout={this.handleLogout}></User>:
                <Navigate to="/"></Navigate>
            }></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
