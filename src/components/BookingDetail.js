import { API } from 'aws-amplify';
import React, { Component, Fragment } from 'react';

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class BookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        }
    }
    fetchDetails(){
        fetch(`${API_URL}/bookings/`+this.props.match.params.id)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            var new_data=json
            this.setState({ details: new_data }, console.log(this.state.details))
        })
    }
    componentDidMount(){
        this.fetchDetails()
    }

    render() {
        return(
            <div className="container-fluid profile-container-bg py-3">
                <div className="container card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Book ID</th>
                                <th scope="col">Service ID</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Service Owner</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                
                                {this.state.details.customer? 
                                <Fragment>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Customer Name</th>
                                </Fragment>
                                : null}
                                
                                <th scope="col">Book Notes</th>
                                <th scope="col">Send Reminder</th>
                                <th scope="col">Book Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.details &&<tr>
                                    <td>{this.state.details.id}</td>
                                    {this.state.details.businessService&&<Fragment>
                                        <td>{this.state.details.businessService.id}</td>
                                        <td>{this.state.details.businessService.name}</td>
                                        <td>{this.state.details.businessService.business.name}</td>
                                    </Fragment>}
                                    <td>{this.state.details.startDateTime}</td>
                                    <td>{this.state.details.endDateTime}</td>
                                    {this.state.details.customer&&<Fragment>
                                        <td>{this.state.details.customer.id} </td>
                                        <td>{this.state.details.customer.username}</td>
                                    </Fragment>}
                                    <td>{this.state.details.notes}</td>
                                    <td>{this.state.details.notify}</td>
                                    <td>{this.state.details.status}</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                        <a href={'/bookingeditform/'+this.state.details.id} className='btn btn-primary float-right'>Edit Booking</a>
                    </div>
                </div>
            </div>
        )
    }
}