import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
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
            bookings: [],
            listView: true
        }
    }

    getBusinessServiceDetails() {
        console.log(this.props.match.params.id)
        fetch(`${API_URL}/businessServices/${this.props.match.params.id}`)
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
                    this.setState({ workingHours: json.workingHours[0] })
                    this.setState({ serviceDays: json.workingHours[0].days })
                    this.setState({ startHour: json.workingHours[0].startTime.slice(0, 2) })
                    this.setState({ startMin: json.workingHours[0].startTime.slice(3, 5) })
                    this.setState({ endHour: json.workingHours[0].endTime.slice(0, 2) })
                    this.setState({ endMin: json.workingHours[0].endTime.slice(3, 5) })
                    this.setState({ employees: json.employees })
                    this.setState({ bookings: json.bookings })
                    console.log(json.workingHours[0])
                    console.log(json.workingHours[0].days)
                    console.log(this.state)
                }
            })
    }
    componentDidMount() {
        this.getBusinessServiceDetails()
    }

    redirectToBooking(id) {
        this.props.history.push(`/booking/${id}`)
    }

    toggleView() {
        this.setState({listView: !this.state.listView})
    }

    render() {
        const render_bookingsList = () => {
            return (
                <div>
                    {this.state.bookings.map(booking => {
                        return (
                            <div key={booking.id} className="card my-3">
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
                                            <p>{booking.customer.id} | {booking.customer.username}</p>
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
            )
        }

        const render_calendar = () => {

            const serviceBookings = []
            this.state.bookings.forEach((booking) => {
                let bookStart = (new Date(booking.startDateTime))
                let bookEnd = (new Date(booking.endDateTime))
                let bookTitle = 'By ' + booking.customer.username + ' | Notes: ' + booking.notes + ' | Status: ' + booking.status
                
                serviceBookings.push({ id: booking.id, title: bookTitle, start: bookStart, end: bookEnd, color: '#1E90FF', resource: 'false', type: 'appointment', allDay: false })
            })

            return (
                <div>
                    <Calendar
                        style={{height: '70vh'}}
                        localizer={localizer}
                        events={serviceBookings}
                        defaultDate={moment().toDate()}
                        defaultView="week"
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={event => this.redirectToBooking(event.id)}
                        // eventPropGetter={event => {
                        //     const eventData = holidays.find(ot => ot.id === event.id);
                        //     const backgroundColor = eventData && eventData.color;
                        //     return { style: { backgroundColor } };
                        // }}
                    />
                </div>
            )
        }

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
                                                <div className="row mb-3">{this.state.serviceDays.length > 0 && this.state.serviceDays.map((d, v) => {
                                                    return (
                                                        <div className="col-2 text-left" key={v}>{d}</div>
                                                    )
                                                })}</div>
                                                <h5>Available Staff</h5>
                                                <div className="row mb-3">
                                                    {this.state.employees.length > 0 && this.state.employees.map((e, n) => {
                                                        return (
                                                            <div className="col-2" key={n}>{e}</div>
                                                        )
                                                    })}
                                                </div>
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
                                    <h3 className="mt-3 ml-3"> {this.state.name}'s Booked Appointments</h3>
                                    <div className="card-body">
                                        {this.state.listView? 
                                            <div class="btn-group btn-group-toggle mb-2">
                                                <button onClick={this.toggleView.bind(this)} className="btn btn-primary active">List View</button>
                                                <button onClick={this.toggleView.bind(this)} className="btn btn-outline-primary">Calendar View</button>
                                            </div>
                                        : 
                                            <div class="btn-group btn-group-toggle mb-2">
                                                <button onClick={this.toggleView.bind(this)} className="btn btn-outline-primary">List View</button>
                                                <button onClick={this.toggleView.bind(this)} className="btn btn-primary active">Calendar View</button>
                                            </div>
                                        }
                                        {this.state.listView?
                                            <div>{render_bookingsList()}</div> 
                                        :
                                            <div>{render_calendar()}</div>
                                        }
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