import * as React from "react";

export default function ProductClusterCard(props) {
    const cardStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const contentStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Align content to the bottom
    };

    const imageStyle = {
        height: "200px", // Set a fixed height for all images
        objectFit: "cover", // Scale and crop the image to fit the fixed height
    };

    function formatName(name){
        if(name.length<60){
            return name
        }
        return name.substring(0,17)+'...'
    }

    return (
        <div className="col-3 mb-3"> {/* Adjust the grid column width as needed */}
            <div className="border rounded p-2" style={cardStyle}>
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
                        <a href={`/productCluster/${props.productCluster.id}`} style={{textDecoration:'none', color:'#1a15bd'}} className="fw-bold">{formatName(props.productCluster.cheapestProduct.name)}</a>
                    </p>
                    <p className="text-center fst-italic fw-bold">Starting from: {props.productCluster.cheapestProduct.currentPrice.price} МКД</p>
                </div>
            </div>
        </div>
    );
}