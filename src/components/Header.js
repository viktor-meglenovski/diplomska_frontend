import React, { useState } from 'react';
import {getAuthToken, removeToken} from "../helpers/axios_helper";

export default function Header(){

    function logout() {
        removeToken()
        window.location.replace('/login')
    }

    return (
        <header className="row bg-dark position-fixed top-0 start-0 end-0 z-3" style={{}}>
            <div className="col-10">
                <h3 className="m-3"><a href="/" style={{textDecoration:'none'}} className="text-white fw-bold">Price Prophet</a></h3>
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">
                {!getAuthToken() && <span className="align-middle pe-2"><a href="/login" className="btn bg-white rounded-pill fw-bold col-12">Login</a></span>}
                {getAuthToken() && <span className="align-middle pe-2"><button className="btn bg-white rounded-pill fw-bold col-12" onClick={logout}>Logout</button></span>}
            </div>
        </header>
    );
}