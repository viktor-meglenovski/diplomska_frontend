import * as React from "react";
import { Link } from 'react-router-dom';

export default function ProductClusterCard(props) {
    const cardStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const contentStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    };

    const imageStyle = {
        height: "195px",
        objectFit: "cover",
    };

    function formatName(name){
        if(name.length<40){
            return name
        }
        return name.substring(0,40)+'...'
    }

    return (
        <div className="col-3 mb-3">
            <div className="border rounded p-2 bg-white" style={cardStyle}>
                <img
                    className="product-image"
                    src={props.productCluster.cheapestProduct.image}
                    style={imageStyle}
                    alt={props.productCluster.cheapestProduct.name}
                />
                <div style={contentStyle} className="mt-4">
                    <div className="row p-2 ps-3 pe-3">
                        <span className="col-5 badge rounded-pill bg-black text-white">{props.productCluster.category}</span>
                        <span className="offset-2 col-5 badge rounded-pill bg-black text-white">{props.productCluster.cheapestProduct.store}</span>
                    </div>
                    <p style={{height:'70px'}} className="mb-0 text-center mt-2">
                        <Link to={`/productCluster/${props.productCluster.id}`} style={{ textDecoration: 'none', color: '#1a15bd' }} className="fw-bold">
                            {formatName(props.productCluster.cheapestProduct.name)}
                        </Link>
                    </p>
                    <p className="text-center fst-italic fw-bold">Starting from: {props.productCluster.cheapestProduct.currentPrice.price} МКД</p>
                    <div className="row">
                        <span className="fst-italic fw-bold col-7" style={{fontSize:'12px'}}>Updated: {props.productCluster.cheapestProduct.currentPrice.date}</span>
                        <span className="col-4 badge rounded-pill bg-black text-white ms-3">{props.productCluster.numberOfResults} Results</span>
                    </div>
                </div>
            </div>
        </div>
    );
}