import React, {Component} from "react";

class BidDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { bidAmount, firstName, lastName, email, phone } = this.props.bid;
        return(
            <div>
                <table style={{width: "100%"}}>
                    <tr>
                        <td>{bidAmount}</td>
                        <td>{firstName} {lastName}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default BidDetails;
