import * as React from "react";
import {useParams} from "react-router-dom";
import {useState} from "react";
import repository from "../repository/repository";
import Plotly from "react-plotly.js";

export default function ProductPage(props) {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [visualization, setVisualization] = useState("")

    const imageStyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    };

    const fetch_product = (id) => {
        repository
            .fetch_product(id)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const get_visualization = (id) => {
        repository.get_visualization(id)
            .then((response) => response.data)
            .then((data) => setVisualization(data))
            .catch((error) => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        fetch_product(id);
        get_visualization(id)
    }, [id]);

    return (
        product && (
            <div className="row">
                <div className="col-12 row container">
                    <h3 className="">{product.name}</h3>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <img
                                className="product-image border rounded"
                                src={product.image}
                                style={imageStyle}
                                alt={product.name}
                            />
                        </div>
                        <div className="col-6">
                            <div className="col-12 border rounded">
                                <div className="row">
                                    <h5 className="col-8">Link to Store:</h5>
                                    <h5 className="col-4 text-end">
                                        <a href={product.link} style={{textDecoration: 'none', color: '#1a15bd'}} className="fw-bold">{product.store}</a>
                                    </h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Current Price:</h5>
                                    <h5 className="col-4 text-end">{product.currentPrice.price} МКД</h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Last Updated On:</h5>
                                    <h5 className="col-4 text-end">{product.currentPrice.date}</h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Rating:</h5>
                                    <h5 className="col-4 text-end">4.5 (25)</h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Next Prediction:</h5>
                                    <h5 className="col-4 text-end">UP/DOWN by x%</h5>
                                </div>
                            </div>
                            <div className="col-12 border rounded ">
                                <Plotly data={visualization.data} layout={visualization.layout}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
