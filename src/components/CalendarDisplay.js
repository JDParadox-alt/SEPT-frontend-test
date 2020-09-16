import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class CalendarDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [
                {
                    id: 1,
                    businessService_Id: 1,
                    startDateTime: "October 13, 2020 11:13:00",
                    endDateTime: "October 13, 2020 12:13:00",
                    customer_Id: 65,
                    notes: "Holiday 1",
                    notify: false,
                    status: "Waiting"
                },
                {
                    id: 2,
                    businessService_Id: 2,
                    startDateTime: "October 10, 2020 11:13:00",
                    endDateTime: "October 15, 2020 12:13:00",
                    customer_Id: 65,
                    notes: "Holiday 2 Fr: October 10, 2020 11:13:00 To: October 15, 2020 12:13:00",
                    notify: false,
                    status: "Waiting"
                }
            ],
            holidaysList: [],
            customerProfile: this.props.location.state?this.props.location.state.carrier:""
        }
    }
    getHolidaysList() {
        const holidaysList = []
        var bookings = this.state.bookings
        for (var i = 0; i < bookings.length; i++) {
            let color = '#1E90FF'
            var event_obj = {
                id: bookings[i].id,
                businessService_Id: bookings[i].businessService_Id,
                startDateTime: bookings[i].startDateTime,
                endDateTime: bookings[i].endDateTime,
                customer_Id: bookings[i].customer_Id,
                notes: bookings[i].notes,
                notify: bookings[i].notify,
                status: bookings[i].status,
                color: color
            }
            holidaysList.push(event_obj)
            this.setState({ holidaysList }, ()=>{ console.log(this.state.holidaysList) })
            console.log(new Date(bookings[0].startDateTime))
        }
    }
    componentDidMount(){
        this.getHolidaysList()
        console.log(this.state.customerProfile)
    }

    redirectToBooking(id) {
        this.props.history.push(`/booking/${id}`)
    }

    render() {
        const holidays = []
        this.state.holidaysList.forEach((holiday) => {
            let start_at = (new Date(holiday.startDateTime))
            let end_at = (new Date(holiday.endDateTime))
            holidays.push({ id: holiday.id, title: holiday.notes, start: start_at, end: end_at, color: holiday.color, resource: 'false', type: 'holiday', allDay: false })
        })
        const customerSchedule = []
        if(this.state.customerProfile){
            this.state.customerProfile.bookings.forEach((booking) => {
                let start_at1 = (new Date(booking.startDateTime))
                let end_at1 = (new Date(booking.endDateTime))
                customerSchedule.push({ id: booking.id, title: booking.notes, start: start_at1, end: end_at1, color: '#1E90FF', resource: 'false', type: 'appointment', allDay: false })
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