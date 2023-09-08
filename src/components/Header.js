import React, { useState } from 'react';
import {getAuthToken, removeToken} from "../helpers/axios_helper";

export default function Header(){
    const [authHeader, setAuthHeader] = useState(getAuthToken()!=='');

    function logout() {
        removeToken()
        setAuthHeader(false)
        window.location.replace('/login')
    }

    return (
        <header className="row bg-dark">
            <div className="col-10">
                <h3 className="m-3"><a href="/home" style={{textDecoration:'none'}} className="text-white fw-bold">Will It Go Up?</a></h3>
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">
                {authHeader && <span className="align-middle pe-2"><a href="/login" className="btn bg-white rounded-pill fw-bold">Login</a></span>}
                {authHeader && <span className="align-middle pe-2"><button className="btn bg-white rounded-pill fw-bold" onClick={logout}>Logout</button></span>}
            </div>
        </header>
    );
}