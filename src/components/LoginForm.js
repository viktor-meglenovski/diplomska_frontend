import * as React from 'react';
import classNames from "classnames";
import {request, setAuthHeader} from "../helpers/axios_helper";

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value});
    };


    onSubmitLogin = (e) => {
        e.preventDefault();
        setAuthHeader('')
        request("POST", "/login", {login: this.state.login, password: this.state.password})
            .then((response) => {
                setAuthHeader(response.data.token)
                window.location.replace('/productClusters')
                //TODO: Here redirect to /productClusters
            }).catch((error) => {
                //TODO: Show login error
            }
        );
    };

    onSubmitRegister = (e) => {
        e.preventDefault();
        request("POST", "/register", {firstName: this.state.firstName, lastName: this.state.lastName, login: this.state.login, password: this.state.password})
            .then((response) => {
                setAuthHeader(response.data.token)
                //TODO: Here redirect to /productClusters
            }).catch((error) => {
                this.setState({componentToShow: "welcome"});
                //TODO: Show login error
            }
        );
    };

    render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-4">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                                    onClick={() => this.setState({active: "login"})}>Login</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                                    onClick={() => this.setState({active: "register"})}>Register</button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                            <form onSubmit={this.onSubmitLogin}>

                                <div className="form-outline mb-4">
                                    <input type="login" id="loginName" name= "login" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginName">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                            </form>
                        </div>
                        <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                            <form onSubmit={this.onSubmitRegister}>

                                <div className="form-outline mb-4">
                                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="firstName">First name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="lastName">Last name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="login" name="login" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="login">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}