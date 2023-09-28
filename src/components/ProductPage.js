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
        height: "900px",
        width: "100%",
        objectFit: "cover",
    };

    const fetch_product = (id) => {
        repository
            .fetch_product(id)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data)
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
                        <div className="col-5">
                            <img
                                className="product-image border rounded"
                                src={product.image}
                                style={imageStyle}
                                alt={product.name}
                            />
                        </div>
                        <div className="col-7">
                            <div className="col-12 border rounded bg-white p-3 mb-3">
                                <div className="row">
                                    <h5 className="col-8">Link to Store:</h5>
                                    <h5 className="col-4 text-end">
                                        <a href={product.link} style={{textDecoration: 'none', color: '#1a15bd'}} className="fw-bold">{product.store}</a>
                                    </h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Current Price:</h5>
                                    <h5 className="col-4 text-end fw-bold">{product.currentPrice.price} МКД</h5>
                                </div>
                                <div className="row">
                                    <h5 className="col-8">Last Updated On:</h5>
                                    <h5 className="col-4 text-end fw-bold">{product.currentPrice.date}</h5>
                                </div>
                                {product.latestPrediction &&
                                    <div className="row">
                                        <h5 className="col-6">Next Prediction:</h5>
                                        {product.latestPrediction.predictionResult === 'SAME' &&
                                            <h5 className="col-6 text-end text-warning fw-bold"> RELATIVELY SAME
                                                PRICE </h5>}
                                        {product.latestPrediction.predictionResult === 'UP' &&
                                            <h5 className="col-6 text-end text-danger fw-bold"> {product.latestPrediction.nextPredictedPrice} МКД,
                                                UP
                                                BY {Math.round(product.latestPrediction.predictedPercentage * 1000) / 10}% </h5>}
                                        {product.latestPrediction.predictionResult === 'DOWN' &&
                                            <h5 className="col-6 text-end text-success fw-bold"> {product.latestPrediction.nextPredictedPrice} МКД,
                                                DOWN
                                                BY {Math.round(product.latestPrediction.predictedPercentage * 1000) / 10}% </h5>}
                                    </div>
                                }
                            </div>
                            <div className="border" style={{height:"80%"}}>
                                <Plotly  data={visualization.data} layout={visualization.layout} config={visualization.config} className="w-100 h-100"/>
                            </div>
                            <div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
