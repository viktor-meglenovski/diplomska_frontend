import * as React from 'react';
import classNames from "classnames";
import {getRole, request, setAuthHeader} from "../helpers/axios_helper";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            repeat_password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister,
            login_error: false,
            login_email_error: false,
            login_required_fields: false,
            register_error: false,
            register_email_error: false,
            register_required_fields: false,
            register_passwords_match:false
        };
    };

    email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };


    onSubmitLogin = (e) => {
        e.preventDefault();
        setAuthHeader('')
        if (this.state.login === '' || this.state.password === ''){
            this.setState({login_required_fields:true})
            this.setState({login_email_error:false})
            this.setState({login_error:false})
            return
        }
        if (!this.email_regex.test(this.state.login)){
            this.setState({login_email_error:true})
            this.setState({login_error:false})
            this.setState({login_required_fields:false})
            return
        }
        request("POST", "/login", {login: this.state.login, password: this.state.password})
            .then((response) => {
                setAuthHeader(response.data.token)
                this.setState({login_error:false})
                this.setState({login_email_error:false})
                this.setState({login_required_fields:false})
                if(getRole() === "ROLE_ADMIN"){
                    window.location.replace('/admin')
                }else{
                    window.location.replace('/productClusters')
                }
            }).catch((error) => {
                this.setState({login_error:true})
                this.setState({login_email_error:false})
                this.setState({login_required_fields:false})
            }
        );
    };

    onSubmitRegister = (e) => {
        e.preventDefault();
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.login === '' || this.state.password === ''){
            this.setState({register_error:false})
            this.setState({register_email_error:false})
            this.setState({register_required_fields:true})
            this.setState({register_passwords_match:false})
            return
        }
        if (!this.email_regex.test(this.state.login)){
            this.setState({register_error:false})
            this.setState({register_email_error:true})
            this.setState({register_required_fields:false})
            this.setState({register_passwords_match:false})
            return
        }
        if(this.state.password !== this.state.repeat_password){
            this.setState({register_error:false})
            this.setState({register_email_error:false})
            this.setState({register_required_fields:false})
            this.setState({register_passwords_match:true})
            return
        }
        request("POST", "/register", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            login: this.state.login,
            password: this.state.password,
            repeat_password: this.state.repeat_password
        })
            .then((response) => {
                window.location.replace('/login')
                // setAuthHeader(response.data.token)
                // if(getRole() === "ROLE_ADMIN"){
                //     window.location.replace('/admin')
                // }else{
                //     window.location.replace('/productClusters')
                // }
            }).catch((error) => {
                this.setState({register_error:true})
                this.setState({register_email_error:false})
                this.setState({register_required_fields:false})
                this.setState({register_passwords_match:false})
            }
        );
    };

    render() {
        return (
            <div className="row justify-content-center m-5 p-5 mb-0">
                <div className="col-5 border rounded p-4 bg-white">
                    {this.state.active === "login" && <h4 className="text-center mb-5 fw-bold">Log into the system</h4>}
                    {this.state.active === "register" &&
                        <h4 className="text-center mb-5 fw-bold">Register into the system</h4>}

                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", "rounded-pill", this.state.active === "login" ? "active" : "")}
                                id="tab-login"
                                onClick={() => this.setState({active: "login", register_error:false, register_email_error:false, register_required_fields:false, register_passwords_match:false})}>Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", "rounded-pill", this.state.active === "register" ? "active" : "")}
                                id="tab-register"
                                onClick={() => this.setState({active: "register", login_error:false, login_email_error:false, login_required_fields:false})}>Register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login">
                            <form onSubmit={this.onSubmitLogin}>

                                <div className="form-outline mb-4">
                                    <input type="login" id="loginName" name="login" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginName">Email</label>
                                </div>

                                <div className="form-outline mb-1">
                                    <input type="password" id="loginPassword" name="password" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>
                                {this.state.login_required_fields && <p className="fst-italic text-danger text-center mb-3">Email and password are required!</p>}
                                {this.state.login_email_error && <p className="fst-italic text-danger text-center mb-3">Invalid email!</p>}
                                {this.state.login_error && <p className="fst-italic text-danger text-center mb-3">Invalid email and password combination!</p>}
                                <div className="row justify-content-center">
                                    <button type="submit"
                                            className="btn btn-success btn-block rounded-pill mb-1 col-4 fw-bold">Log In
                                    </button>
                                </div>

                            </form>
                        </div>
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register">
                            <form onSubmit={this.onSubmitRegister}>

                                <div className="form-outline mb-4">
                                    <input type="text" id="firstName" name="firstName" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="firstName">First name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="lastName" name="lastName" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="lastName">Last name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="login" name="login" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="login">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="registerPassword" name="password"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="registerPasswordRepeat" name="repeat_password"
                                           className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="registerPasswordRepeat">Repeat Password</label>
                                </div>
                                {this.state.register_required_fields && <p className="fst-italic text-danger text-center mb-3">All fields are required!</p>}
                                {this.state.register_email_error && <p className="fst-italic text-danger text-center mb-3">Invalid email!</p>}
                                {this.state.register_error && <p className="fst-italic text-danger text-center mb-3">Account with that email already exists!</p>}
                                {this.state.register_passwords_match && <p className="fst-italic text-danger text-center mb-3">Passwords do not match!</p>}

                                <div className="row justify-content-center">
                                    <button type="submit"
                                            className="btn btn-success btn-block rounded-pill mb-2 col-4 fw-bold">Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}