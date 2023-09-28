import React from "react";
import {getRole} from "../helpers/axios_helper";

export default function Sidebar(){

    return (
        <nav id="sidebar" className="mb-0 sidebar position-fixed top-0 start-0 bottom-0" style={{width:"15%", paddingTop:"65.6px", backgroundColor:"#333333"}}>
            <a href="/productClusters" className="btn bg-white text-black rounded-pill col-10 offset-1 mt-3 fw-bold">Products</a>
            <a href="/product/expectedUps" className="btn bg-white text-black rounded-pill col-10 offset-1 mt-3 fw-bold">Expected Ups</a>
            <a href="/product/expectedDowns" className="btn bg-white text-black rounded-pill col-10 offset-1 mt-3 fw-bold">Expected Downs</a>
            {getRole() === "ROLE_ADMIN" && <a href="/admin" className="btn bg-white text-black rounded-pill col-10 offset-1 mt-3 fw-bold">Admin Panel</a>}
        </nav>
    );
}

