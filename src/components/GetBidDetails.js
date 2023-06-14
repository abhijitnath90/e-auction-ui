    import React, { Component } from "react";
    import ProductDetails from "./ProductDetails";
    import BidDetails from "./BidDetails";
    import axios from "axios";

    class GetBidDetails extends Component {

        constructor(props) {
            super(props)
            this.state = {
                productId: '',
                bidRows: [],
                errMsg: '',
                successMsg: ''
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
                    bidRows: response.data,
                    errMsg: ''
                })
             })
             .catch(error => {
                console.log(error);
                this.setState({
                    errMsg: 'The product has not been found.'
                })
             })
    }

    handleBidAmountChange = (e, id) => {
        let bidRows1 = [...this.state.bidRows];
        bidRows1[id]['bid'].bidAmount = e.target.value;
        this.setState({
            bidRows: bidRows1
        })

    }

    updateAmount = (e, id) => {
            /*const formData = {
                bidAmount: this.state.bidRows[id]["bid"].bidAmount,
            }*/
            let prodId = this.state.productId;
            let email = this.state.bidRows[id].bid.email;
            let updatedBidAmount = this.state.bidRows[id].bid.bidAmount;
            const url = `http://localhost:8083/e-auction/api/v1/buyer/update-bid/${prodId}/${email}/${updatedBidAmount}`;
            console.log(url);
            axios.put(url)
                 .then((response) => {
                    console.log(response);
                    this.setState({
                        successMsg: 'The bid has been updated successfully',
                        errMsg: ''
                    })
                  })
                 .catch((error) => {
                    console.log(error);
                    this.setState({
                        successMsg: '',
                        errMsg: 'The bid could not be updated'
                    })
                  });
    }

    render() {
        const { bidRows, errMsg, successMsg } = this.state;
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
                                        {bidRows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td><input type="text"
                                                    value={row.bid.bidAmount}
                                                    onChange={(e) => this.handleBidAmountChange(e,rowIndex)}/></td>
                                            <td>{row.bid.firstName} {row.bid.lastName}</td>
                                            <td>{row.bid.email}</td>
                                            <td>{row.bid.phone}</td>
                                            <td><button onClick={(e) => this.updateAmount(e, rowIndex)}>Update Bid</button></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table> : null

                        }
                        {
                            <h2 className="errorMsg">{errMsg}</h2>
                        }
                        {
                            <h2 className="successMsg">{successMsg}</h2>
                        }
                </div>
            )
        }
    }


    export default GetBidDetails;