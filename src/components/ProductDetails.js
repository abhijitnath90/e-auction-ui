import React, { Component } from "react";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log("Inside ProductDetails Component render method. Value of props is "+this.props);
        const { productName, shortDescription, detailedDescription, category, startingPrice, bidEndDate } = this.props
        return(
            <div>
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
                </table>
            </div>
        )
    }
}

export default ProductDetails;
