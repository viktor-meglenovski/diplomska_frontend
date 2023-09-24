import * as React from "react";
import {Link} from 'react-router-dom';

export default function ProductListItem(props) {
    const imageStyle = {
        height: "250px",
        width: "100%",
        objectFit: "cover",
    };

    function formatName(name) {
        if (name.length < 40) {
            return name
        }
        return name.substring(0, 40) + '...'
    }

    return (
        <div className="col-4">
            <div className="row me-3 mb-3 rounded-end-5 border ps-0 bg-white">
                <div className="col ms-0 ps-0 pe-0" style={{backgroundColor:"white"}}>
                    <img
                        className="product-image"
                        src={props.product.image}
                        style={imageStyle}
                        alt={props.product.name}
                    />
                </div>
                <div className="col text-start rounded-end-5 ps-3 pt-2">
                    <p className="mb-5"><Link to={`/product/${props.product.id}`}
                             style={{textDecoration: 'none', color: '#1a15bd'}} className="fw-bold">
                        {formatName(props.product.name)}
                    </Link></p>
                    <div className="row text-center mb-3">
                        <span className="rounded-pill bg-black text-white col-6 ms-2">{props.product.store}</span>
                    </div>
                    <p className="fw-bold">{props.product.currentPrice.price} MKD</p>
                    <p className="fst-italic fw-bold" style={{fontSize:'12px'}}>Updated: {props.product.currentPrice.date}</p>
                </div>
            </div>
        </div>
    );
}