import axios from "axios";
import React, { Component } from "react";
import ProductDetails from "./ProductDetails";
import BidDetails from "./BidDetails";

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
                console.log(response);
                this.setState({
                    bidRows: response.data
                })
             })
             .catch(error => {
                console.log(error)
             })
    }

    
    render() {
        var bidJA = [];
        const { bidRows } = this.state;
        let productExist = bidRows.length > 0 ? true: false;
        if(productExist) {
            bidRows.map(row => bidJA.push(row.bid))
        }
        //console.log('Value of bidJA is '+JSON.stringify(bidJA));
        return(
            <div>
                <br></br><br></br>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label id="productIdLabel">Product ID </label>&nbsp;
                        <input type="text" value={this.state.productId} onChange={this.handleProductIdChange}/>&nbsp;&nbsp;
                        <button type="submit">Get All Bids</button>
                    </div>
                </form>
                <br></br>
                {
                    bidRows.length ? <ProductDetails {...bidRows[0].product} /> : null
                }
                <br></br><br></br>
                {
                    bidRows.length ? 
                    <table id="tbl">
                        <tbody>
                            <tr>
                                <th>Bid Amount</th>
                                <th>Name </th>
                                <th>Email </th>
                                <th>Phone </th>
                            </tr>
                            {bidJA.map((item, index) => (
                            <tr key={index}>
                                <td><input type="text" value={item.bidAmount}/></td>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table> : null
                    
                }
                
            </div>
        )
    }
}

export default GetBidDetails;
