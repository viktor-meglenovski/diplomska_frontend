import * as React from 'react';

export default function HomePage(props) {
    return (
        <div className="row justify-content-center m-5 p-5 mb-0">
            <div className="col-8 border rounded p-5 bg-white pb-4 text-center">
                <h1 className="text-center">Welcome to <b>Price Prophet</b></h1>
                <hr/>
                <h5 className="fst-italic">Find the best current deals for your favorite products in one place.</h5>
                <h5 className="fst-italic">Search and filter through frequently scraped data from different stores and categories.</h5>
                <div className="row mt-4 text-center justify-content-center">
                    <div className="col-3">
                        <ul className="list-group">
                            <li className="list-group-item text-white fw-bold" style={{backgroundColor:"#333333"}}>Stores</li>
                            <li className="list-group-item list-group-item-action">Neptun</li>
                            <li className="list-group-item list-group-item-action">Setec</li>
                            <li className="list-group-item list-group-item-action">Anhoch</li>
                            <li className="list-group-item list-group-item-action">TehnoMarket</li>
                            <li className="list-group-item list-group-item-action">DDStore</li>
                            <li className="list-group-item list-group-item-action">EKupi</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className="list-group">
                            <li className="list-group-item text-white fw-bold" style={{backgroundColor:"#333333"}}>Categories</li>
                            <li className="list-group-item list-group-item-action">Laptops</li>
                            <li className="list-group-item list-group-item-action">Phones</li>
                            <li className="list-group-item list-group-item-action">TVs</li>
                            <li className="list-group-item list-group-item-action">CPUs</li>
                            <li className="list-group-item list-group-item-action">GPUs</li>
                            <li className="list-group-item list-group-item-action">ACs</li>
                            <li className="list-group-item list-group-item-action">Fridges</li>
                            <li className="list-group-item list-group-item-action">Freezers</li>
                        </ul>
                    </div>
                </div>
                <h5 className="fst-italic mt-3">Find out which products are predicted to have a <b>higher/lower</b> price in the next period.</h5>
                <hr/>
                <a href="/login" className="btn btn-success col-4 fw-bold rounded-pill btn-lg mb-0">Sign Up Now</a>

            </div>
        </div>
    );
}