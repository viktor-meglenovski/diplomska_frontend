import * as React from "react";
import {Link} from 'react-router-dom';

export default function UpsAndDownsListItem(props) {
    const imageStyle = {
        height: "214px",
        width: "100%",
        objectFit: "cover",
    };

    function formatName(name) {
        if (name.length < 30) {
            return name
        }
        return name.substring(0, 30) + '...'
    }

    return (
        <div className="col-4 mb-0" style={{height:"214px"}}>
            <div className={`row me-3 mb-3 rounded-end-5 border ps-0`} style={{backgroundColor:`${props.cheapest ? '#ccfcd0' : '#ffffff'}`}}>
                <div className="col ms-0 ps-0 pe-0 border-end" style={{backgroundColor:"white"}}>
                    <img
                        className="product-image"
                        src={props.product.image}
                        style={imageStyle}
                        alt={props.product.name}
                    />
                </div>
                <div className="col text-start rounded-end-5 ps-3 pt-2">
                    <p className="mb-3" style={{height:"30%"}}><Link to={`/product/${props.product.id}`}
                                              style={{textDecoration: 'none', color: '#1a15bd'}} className="fw-bold">
                        {formatName(props.product.name)}
                    </Link></p>
                    <div className="row text-center mb-3">
                        <span className="rounded-pill bg-black text-white col-6 ms-2">{props.product.store}</span>
                    </div>
                    {props.filterType === "UP" && <p className="fw-bold text-danger mb-1"><span className="text-decoration-line-through">{props.product.currentPrice.price} MKD</span> → {props.product.latestPrediction.nextPredictedPrice} MKD</p>}
                    {props.filterType === "DOWN" && <p className="fw-bold text-success mb-1"><span className="text-decoration-line-through">{props.product.currentPrice.price} MKD</span> → {props.product.latestPrediction.nextPredictedPrice} MKD</p>}
                    {props.product.latestPrediction.predictionResult === 'SAME' && <p className="text-warning fw-bold mb-2">RELATIVELY SAME PRICE</p>}
                    {props.product.latestPrediction.predictionResult === 'UP' && <p className="text-danger fw-bold mb-2">UP BY {Math.round(props.product.latestPrediction.predictedPercentage * 1000)/10}% </p>}
                    {props.product.latestPrediction.predictionResult === 'DOWN' && <p className="text-success fw-bold mb-2">DOWN BY {Math.round(props.product.latestPrediction.predictedPercentage * 1000)/10}% </p>}
                    <p className="fst-italic fw-bold" style={{fontSize:'12px'}}>Updated: {props.product.currentPrice.date}</p>

                </div>
            </div>
        </div>
    );
}