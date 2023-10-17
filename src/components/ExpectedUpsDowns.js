import * as React from "react";
import repository from "../repository/repository";
import UpsAndDownsListItem from "./UpsAndDownsListItem";

export default class ExpectedUpsDowns extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            paginationInfo: {},
            page: 0
        };
    };

    componentDidMount() {
        this.load_products()
        this.fetch_pagination_info()
        this.disable_next_page_button_if_needed()
        this.disable_previous_page_button_if_needed()
    };

    load_products() {
        repository.fetch_expected(this.props.filterType, this.state.page).then((response) => {
            this.setState({products: response.data})
            this.disable_next_page_button_if_needed()
            this.disable_previous_page_button_if_needed()
        }).catch(error => {
            console.error(error)
        });
    }

    fetch_pagination_info() {
        repository.fetch_pagination_info_ups_downs(this.props.filterType).then((response) => {
            this.setState({paginationInfo: response.data})
        }).catch(error => {
            console.error(error)
        });
    }

    load_previous_page = () => {
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1}, () => {
                this.load_products();
            });
        }
    };

    load_next_page = () => {
        this.setState({page: this.state.page + 1}, () => {
            this.load_products();
        });
    };

    disable_previous_page_button_if_needed = () => {
        const previousPageButton = document.getElementById("previous-page");
        if (previousPageButton) {
            if (this.state.page === 0) {
                previousPageButton.setAttribute("disabled", "disabled");
            } else {
                previousPageButton.removeAttribute("disabled");
            }
        }

    }

    disable_next_page_button_if_needed = () => {
        const nextPageButton = document.getElementById("next-page");
        if (nextPageButton) {
            if (this.state.page === this.state.paginationInfo.numberOfPages - 1) {
                nextPageButton.setAttribute("disabled", "disabled");
            } else {
                nextPageButton.removeAttribute("disabled");
            }
        }
    }


    render() {
        return (
            <div style={{height: "100%"}}>
                <div className="col-12 row" style={{height: "10%"}}>
                    {this.props.filterType === "UP" && <h3 className="col-3 text-danger fw-bold">Expected Ups</h3>}
                    {this.props.filterType === "UP" &&
                        <h5 className="col-9 text-end fst-italic text-danger">These products are expected to have a
                            higher price in the next iteration!</h5>}

                    {this.props.filterType === "DOWN" &&
                        <h3 className="col-3 text-success fw-bold">Expected Downs</h3>}
                    {this.props.filterType === "DOWN" &&
                        <h5 className="col-9 text-end fst-italic text-success">These products are expected to have a
                            lower price in the next iteration!</h5>}

                    <hr/>
                </div>
                <div className="row ms-4" style={{height: "80%"}}>
                    {this.state.products && this.state.products.map((line, index) => (
                        <UpsAndDownsListItem
                            filterType={this.props.filterType}
                            key={line.id}
                            product={line}/>
                    ))}
                </div>
                {this.state.paginationInfo.numberOfResults > 0 &&
                    <div className="row justify-content-center text-center align-middle" style={{height: "10%"}}>
                        <button className="col-2 btn btn-primary rounded-pill me-0 h-50 mb-0 mt-3"
                                id="previous-page"
                                onClick={this.load_previous_page}>Previous
                        </button>
                        <div className="col-1 ms-4 me-4 p-0 h-100">
                            <h5>{this.state.paginationInfo.numberOfResults} results</h5>
                            <p>Page {this.state.page + 1} of {this.state.paginationInfo.numberOfPages}</p>
                        </div>
                        <button className="col-2 btn btn-primary rounded-pill ms-0 h-50 mb-0 mt-3" id="next-page"
                                onClick={this.load_next_page}>Next
                        </button>
                    </div>}
                {this.state.paginationInfo.numberOfResults === 0 && <div className="mt-auto text-center">
                    <h5 className="text-danger pb-2 fw-bold fst-italic">No results for the selected filters!</h5>
                </div>}
            </div>
        )
    }
}
