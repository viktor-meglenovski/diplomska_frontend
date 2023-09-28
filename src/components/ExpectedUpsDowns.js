import * as React from "react";
import repository from "../repository/repository";
import {useEffect, useState} from "react";
import UpsAndDownsListItem from "./UpsAndDownsListItem";

export default function ExpectedUpsDowns(props) {
    const [products, setProducts] = useState(null);

    const fetch_products = () => {
        if (props.filterType === "UP") {
            repository
                .fetch_expected_ups()
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else{
            repository
                .fetch_expected_downs()
                .then((response) => {
                    setProducts(response.data);
                    console.log(products)
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    };

    useEffect(() => {
        fetch_products()
    }, );

    return (
        products && (
            <div className="row">
                <div className="col-12 row container">
                    {props.filterType === "UP" && <h3 className="col-3 text-danger fw-bold">Expected Ups</h3>}
                    {props.filterType === "UP" && <h5 className="col-9 text-end fst-italic text-danger">These products are expected to have a higher price in the next iteration!</h5>}

                    {props.filterType === "DOWN" && <h3 className="col-3 text-success fw-bold">Expected Downs</h3>}
                    {props.filterType === "DOWN" && <h5 className="col-9 text-end fst-italic text-success">These products are expected to have a lower price in the next iteration!</h5>}

                    <hr/>
                    <div className="row ms-4">
                        {products && products.map((line, index) => (
                            <UpsAndDownsListItem
                                filterType={props.filterType}
                                key={line.id}
                                product={line}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    )
}
