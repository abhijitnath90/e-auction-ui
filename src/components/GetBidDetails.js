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
                        <label id="productIdLabel">Product ID </label>&nbsp;
                        <input type="text" value={this.state.productId} onChange={this.handleProductIdChange}/>&nbsp;&nbsp;
                        <button type="submit">Get All Bids</button>
                    </div>
                </form>
                <br></br>
                {
                    bidRows.length ? 
                    <table style={{width: "100%"}}>
                        <tr>
                            <td className="productLabels">Product Name </td><td className="productValues">{productName}</td>
                        </tr>
                        <tr>
                            <td className="productLabels">Short Description </td><td className="productValues">{shortDescription}</td>
                        </tr>
                        <tr>
                            <td className="productLabels">Detailed Description </td><td className="productValues">{detailedDescription}</td>
                        </tr>
                        <tr>
                            <td className="productLabels">Category </td><td className="productValues">{category}</td>
                        </tr>
                        <tr>
                            <td className="productLabels">Starting Price </td><td className="productValues">{startingPrice}</td>
                        </tr>
                        <tr>
                            <td className="productLabels">Bid End Date </td><td className="productValues">{bidEndDate}</td>
                        </tr>
                    </table> : null
                }
            </div>
        )
    }
}

export default GetBidDetails;
