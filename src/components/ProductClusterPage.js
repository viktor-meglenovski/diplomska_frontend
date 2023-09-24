import * as React from "react";
import repository from "../repository/repository";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductListItem from "./ProductListItem";

export default function ProductClusterPage(props) {

    const {id} = useParams()
    const [productCluster, setProductCluster] = useState(null);

    const fetch_cluster = (id) => {
        repository
            .fetch_cluster(id)
            .then((response) => {
                setProductCluster(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        fetch_cluster(id);
    }, [id]);

    return (
        productCluster && (
            <div className="row">
                <div className="col-12 row container">
                    <h3 className="col-10">{productCluster.category} &gt; {productCluster.cheapestProduct.name}</h3>
                    {productCluster.numberOfResults === 1 && <h5 className="col-2 text-end fst-italic">{productCluster.numberOfResults} Result</h5>}
                    {productCluster.numberOfResults > 1 && <h5 className="col-2 text-end fst-italic">{productCluster.numberOfResults} Results</h5>}
                    <hr/>
                    <div className="row ms-4">
                        {productCluster.products && productCluster.products.map((line) =>
                            <ProductListItem key={line.id} product={line}/>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}
