import React from "react";

export default function Sidebar(){

    return (
        <nav id="sidebar" className="col-2 mb-0 bg-light sidebar">
            <div className="position-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Products
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Orders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Customers
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Reports
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

