import axios from "axios";
import React, { Component } from "react";

class GetBidDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productId: '',
            bidRows: []
        }
    }

    handleProductIdChange = event => {
        this.setState({
            productId: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.get(`http://localhost:8082/e-auction/api/v1/seller/show-bids/${this.state.productId}`)
             .then(response => {
                console.log(response)
                this.setState({
                    bidRows: response.data
                })
             })
             .catch(error => {
                console.log(error)
             })
    }

    render() {
        const { bidRows } = this.state;
        if(bidRows.length > 0) {
            var prod = bidRows[0].product;
            console.log(prod);
            var { productName, shortDescription, detailedDescription, category, startingPrice, bidEndDate } = prod;
        }
        
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Product ID: </label>
                        <input type="text" value={this.state.productId} onChange={this.handleProductIdChange}/>
                        <button type="submit">Get All Bids</button>
                    </div>
                </form>
                {
                    bidRows.length ? 
                    <div>
                        <div>
                            <label>Product Name </label>{productName}
                        </div>
                        <div>
                            <label>Short Description </label>{shortDescription}
                        </div>
                        <div>
                            <label>Detailed Description </label>{detailedDescription}
                        </div>
                        <div>
                            <label>Category </label>{category}
                        </div>
                        <div>
                            <label>Starting Price </label>{startingPrice}
                        </div>
                        <div>
                            <label>Bid End Date </label>{bidEndDate}
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}

export default GetBidDetails;
