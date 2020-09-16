import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class CustomerCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerProfileExists: false,
            customerProfile: {},
            customerId: "",
            customerUsername: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
            customerBookings: []
        }
    }

    // getHolidaysList() {
    //     const holidaysList = []
    //     var bookings = this.state.bookings
    //     for (var i = 0; i < bookings.length; i++) {
    //         let color = '#1E90FF'
    //         var event_obj = {
    //             id: bookings[i].id,
    //             businessService_Id: bookings[i].businessService_Id,
    //             startDateTime: bookings[i].startDateTime,
    //             endDateTime: bookings[i].endDateTime,
    //             customer_Id: bookings[i].customer_Id,
    //             notes: bookings[i].notes,
    //             notify: bookings[i].notify,
    //             status: bookings[i].status,
    //             color: color
    //         }
    //         holidaysList.push(event_obj)
    //         this.setState({ holidaysList }, ()=>{ console.log(this.state.holidaysList) })
    //         console.log(new Date(bookings[0].startDateTime))
    //     }
    // }

    checkCustomerProfile(){
        fetch(`${API_URL}/customers`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({ import: json}, ()=>{console.log(this.state.import)})
            var new_data=json
            if(this.props.auth.user!==null && new_data.length>0){
                console.log(this.props.auth.user.username)
                console.log(this.props.auth.user.attributes.email)
                for (var i = 0; i < new_data.length; i++) {
                    if(new_data[i].username===this.props.auth.user.username && new_data[i].email===this.props.auth.user.attributes.email){
                        this.setState({ customerProfileExists: true}, ()=>{console.log(this.state.customerProfileExists) })
                        this.setState({ customerProfile: new_data[i]}, ()=>{console.log(this.state.customerProfile) })
                        // this.setState({ carrier: new_data[i]}, ()=>{console.log(this.state.carrier) })
                        // this.setState({ customerProfile1: new_data[i]}, ()=>{console.log(this.state.customerProfile1) })
                        this.setState({ customerId: new_data[i].id }, ()=>{console.log(this.state.customerId)})
                        this.setState({ customerUsername: new_data[i].username }, ()=>{console.log(this.state.customerUsername)})
                        this.setState({ customerEmail: new_data[i].email }, ()=>{console.log(this.state.customerEmail)})
                        this.setState({ customerPhone: new_data[i].phone }, ()=>{console.log(this.state.customerPhone)})
                        this.setState({ customerAddress: new_data[i].address }, ()=>{console.log(this.state.customerAddress)})
                        this.setState({ customerBookings: new_data[i].bookings }, ()=>{console.log(this.state.customerBookings)})
                    }
                }
            }
        })
    }

    redirectToBooking(id) {
        this.props.history.push(`/booking/${id}`)
    }

    componentDidMount(){
        this.checkCustomerProfile()
        console.log(this.state.customerProfile)
    }

    render() {
        // const holidays = []
        // this.state.holidaysList.forEach((holiday) => {
        //     let start_at = (new Date(holiday.startDateTime))
        //     let end_at = (new Date(holiday.endDateTime))
        //     holidays.push({ id: holiday.id, title: holiday.notes, start: start_at, end: end_at, color: holiday.color, resource: 'false', type: 'holiday', allDay: false })
        // })

        const customerSchedule = []
        if(this.state.customerProfileExists){
            this.state.customerBookings.forEach((booking) => {
                let bookStart = (new Date(booking.startDateTime))
                let bookEnd = (new Date(booking.endDateTime))
                let bookTitle = 'At ' + booking.businessService.name + ' | Notes: ' + booking.notes + ' | Status: ' + booking.status
                
                customerSchedule.push({ id: booking.id, title: bookTitle, start: bookStart, end: bookEnd, color: '#1E90FF', resource: 'false', type: 'appointment', allDay: false })
            })
        }
        return (
            <div className="container-fluid profile-container-bg py-3">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="jumbotron mt-4">
                            <Calendar
                                style={{height: '70vh'}}
                                localizer={localizer}
                                events={customerSchedule}
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
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}