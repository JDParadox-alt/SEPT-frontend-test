import React, { Component } from 'react';

export default class BusinessServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            found: "loading",
            id: 0,
            name: "",
            business: {},
            description: "",
            workingHours: [],
            serviceDays: [],
            startHour: "",
            startMin: "",
            endHour: "",
            endMin: "",
            employees: [],
            bookings: []
        }
    }

    getBusinessServiceDetails() {
        console.log(this.props.match.params.id)
        fetch(`http://localhost:8080/api/businessServices/${this.props.match.params.id}`)
            .then(res => {
                if (res.ok) {
                    this.setState({ found: "found" })
                    return res.json()
                }
                else {
                    console.log(res.ok + " | Shite. It's fucked. Check your URL params?")
                    this.setState({ found: "notFound" })
                }
            })
            .then(json => {
                if (this.state.found === "found") {
                    console.log(json)
                    this.setState({ id: json.id })
                    this.setState({ name: json.name })
                    this.setState({ business: json.business })
                    this.setState({ description: json.description })
                    this.setState({ workingHours: json.workingHours })
                    this.setState({ serviceDays: json.workingHours.days })
                    this.setState({ startHour: json.workingHours[0].startTime.slice(0, 2) })
                    this.setState({ startMin: json.workingHours[0].startTime.slice(3, 5) })
                    this.setState({ endHour: json.workingHours[0].endTime.slice(0, 2) })
                    this.setState({ endMin: json.workingHours[0].endTime.slice(3, 5) })
                    this.setState({ employees: json.employees })
                    this.setState({ bookings: json.bookings })
                    console.log(this.state)
                }
            })
    }
    componentDidMount() {
        this.getBusinessServiceDetails()
    }
    render() {
        const render_businessService = () => {
            if (this.state.found === "loading") {
                return (
                    <div className="container emp-profile" style={{ textAlign: 'center' }}>
                        <h3>The page is still loading.</h3>
                    </div>
                )
            }
            else if (this.state.found === "notFound") {
                return (
                    <div className="container emp-profile" style={{ textAlign: 'center' }}>
                        <h3>An error occured while loading the page. Please try again.</h3>
                    </div>
                )
            }
            else {
                return (
                    <div className="container-fluid profile-container-bg py-3">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div className="card my-3">
                                    <h3 className="mt-3 ml-3">{this.state.business.name} - {this.state.name}</h3>
                                    {/* <h4 className="ml-3">{this.state.name}</h4> */}
                                    <div className="card-body">
                                        <div className="card my-3">
                                            <div className="card-body">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">ID/BusinessID</th>
                                                            <th scope="col">From</th>
                                                            <th scope="col">To</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{this.state.name}</td>
                                                            <td>{this.state.description}</td>
                                                            <td>{this.state.id}/{this.state.business.id}</td>
                                                            <td>{this.state.workingHours.startTime}</td>
                                                            <td>{this.state.workingHours.endTime}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <h5>Available On</h5>
                                                {/* <div className="row mb-3">{this.state.workingHours.days.length > 0 && this.state.workingHours.days.map((d, v) => {
                                                    return (
                                                        <div className="col-2 text-left" key={v}>{d}</div>
                                                    )
                                                })}</div> */}
                                                <h5>Available Staff</h5>
                                                <div className="row mb-3">
                                                    {this.state.employees.length > 0 && this.state.employees.map((e, n) => {
                                                        return (
                                                            <div className="col-2" key={n}>{e}</div>
                                                        )
                                                    })}
                                                </div>
                                                {/* <h5>Booked Appointments</h5>
                                                <div className="row">
                                                    {this.state.bookings.length > 0 && this.state.bookings.map((b, m) => {
                                                        return (
                                                            <div className="col-1" key={m}>{b.id}</div>
                                                        )
                                                    })}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div className="card my-3">
                                    <h3 className="mt-3 ml-3"> {this.state.name}'s Booked Appointments List</h3>
                                    <div className="card-body">
                                        {this.state.bookings.map((booking, i) => {
                                            return (
                                                <div key={i} className="card my-3">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Id</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.id}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Start Date Time</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.startDateTime}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>End Date Time</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.endDateTime}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Customer</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.customer}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Notes</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.notes}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Notify?</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.notify}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Status</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <p>{booking.status}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                )
            }
        }

        return (
            <div>
                {this.props.auth.isAuthenticated && this.props.auth.user ? <div className="container-fluid profile-container-bg py-3">
                    {render_businessService()}
                </div> : null}
            </div>
        )
    }

}