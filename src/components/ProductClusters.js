import * as React from "react";
import repository from "../repository/repository";
import ProductClusterCard from "./ProductClusterCard";

export default class ProductClusters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productClusters: [],
            paginationInfo:{},
            page: 1,
            filters: {
                category: "",
                store: "",
                lowerPrice: "",
                upperPrice: "",
                search: ""
            },
            categories:[],
            stores:[]
        };
    };

    componentDidMount() {
        this.load_clusters()
        this.fetch_product_clusters_pagination_info()
        this.disable_next_page_button_if_needed()
        this.disable_previous_page_button_if_needed()
        this.fetch_categories()
        this.fetch_stores()
    };

    load_clusters() {
        repository.fetch_filtered_clusters(this.state.page,this.state.filters).then((response) => {
            this.setState({productClusters: response.data})
            this.disable_next_page_button_if_needed()
            this.disable_previous_page_button_if_needed()
        }).catch(error => {
            console.error(error)
        });
    }
    fetch_product_clusters_pagination_info(){
        repository.fetch_product_clusters_pagination_info(this.state.filters).then((response) => {
            this.setState({paginationInfo: response.data})
        }).catch(error => {
            console.error(error)
        });
    }

    load_previous_page = () => {
        if (this.state.page > 1) {
            this.setState({page: this.state.page - 1}, () => {
                this.load_clusters();
            });
        }
    };

    load_next_page = () => {
        this.setState({page: this.state.page + 1}, () => {
            this.load_clusters();
        });
    };

    disable_previous_page_button_if_needed = () => {
        const previousPageButton = document.getElementById("previous-page");
        if(previousPageButton){
            if (this.state.page === 1) {
                previousPageButton.setAttribute("disabled", "disabled");
            } else {
                previousPageButton.removeAttribute("disabled");
            }
        }

    }

    disable_next_page_button_if_needed = () => {
        const nextPageButton = document.getElementById("next-page");
        if(nextPageButton){
            if (this.state.page === this.state.paginationInfo.numberOfPages) {
                nextPageButton.setAttribute("disabled", "disabled");
            } else {
                nextPageButton.removeAttribute("disabled");
            }
        }
    }
    filter_clusters = () => {
        const selected_category = document.getElementById("category-select").value;
        const selected_store = document.getElementById("store-select").value;
        const lower_price_input = document.getElementById("lower-price-input").value;
        const upper_price_input = document.getElementById("upper-price-input").value;
        const search_input = document.getElementById("search-input").value;
        let new_filters={
            category: selected_category,
            store: selected_store,
            lowerPrice: lower_price_input,
            upperPrice: upper_price_input,
            search: search_input
        }
        this.setState({filters: new_filters, page:1}, () => {
            this.load_clusters()
            this.fetch_product_clusters_pagination_info()
        });
    }
    fetch_categories = () =>{
        repository.fetch_categories().then((response) => {
            this.setState({categories: response.data})
        }).catch(error => {
            console.error(error)
        });
    }

    fetch_stores = () =>{
        repository.fetch_stores().then((response) => {
            this.setState({stores: response.data})
        }).catch(error => {
            console.error(error)
        });
    }

    reset_filters = () =>{
        document.getElementById("category-select").value="";
        document.getElementById("store-select").value="";
        document.getElementById("lower-price-input").value="";
        document.getElementById("upper-price-input").value="";
        document.getElementById("search-input").value="";
        let new_filters= {
                category: "",
                store: "",
                lowerPrice: "",
                upperPrice: "",
                search: ""
        }
        this.setState({filters: new_filters, page:1}, () => {
            this.load_clusters()
            this.fetch_product_clusters_pagination_info()
        });
    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col-9 row">
                    {this.state.productClusters && this.state.productClusters.map((line) =>
                        <ProductClusterCard key={line.id} productCluster={line}/>
                    )}
                </div>
                <div className="col-3 border rounded d-flex flex-column">
                    <div>
                        <div className="row">
                            <h2 className="m-3 ms-1 col-8">Filters</h2>
                            <span className="col-3 pt-3 pe-0">
                                <button className="btn btn-danger col-12" id="reset-filters-btn" onClick={this.reset_filters}>Reset</button>
                            </span>

                        </div>

                        <select className="col-12 mb-3 form-select" id="category-select">
                            <option value="">CATEGORY</option>
                            {this.state.categories && this.state.categories.map((line) =>
                                <option value={line}>{line}</option>
                            )}
                        </select>
                        <select className="col-12 mb-3 form-select" id="store-select">
                            <option value="">STORE</option>
                            {this.state.stores && this.state.stores.map((line) =>
                                <option value={line}>{line}</option>
                            )}
                        </select>
                        <input placeholder="Lower Price" className="col-12 mb-3 input-group-text text-start" type="number" id="lower-price-input"/>
                        <input placeholder="Upper Price" className="col-12 mb-3 input-group-text text-start" type="number" id="upper-price-input"/>
                        <input placeholder="Search" className="col-12 mb-3 input-group-text text-start" type="text" id="search-input"/>
                        <button className="col-12 mb-3 btn btn-success" id="filter-btn" onClick={this.filter_clusters}>Filter
                        </button>
                    </div>
                    {this.state.paginationInfo.numberOfResults > 0  && <div className="mt-auto text-center">
                        <h5>{this.state.paginationInfo.numberOfResults} results found</h5>
                        <p>Page {this.state.page} of {this.state.paginationInfo.numberOfPages}</p>
                        <div className="row justify-content-center">
                            <button className="col-5 m-2 btn btn-primary" id="previous-page"
                                    onClick={this.load_previous_page}>Previous
                            </button>
                            <button className="col-5 m-2 btn btn-primary" id="next-page"
                                    onClick={this.load_next_page}>Next
                            </button>
                        </div>
                    </div>}
                    {this.state.paginationInfo.numberOfResults === 0 && <div className="mt-auto text-center">
                        <p className="text-danger">No results for the selected filters!</p>
                    </div>}
                </div>
            </div>
        );
    };
}