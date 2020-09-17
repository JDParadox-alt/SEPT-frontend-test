import React, { Component, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { Link, NavLink } from 'react-router-dom';
import ReactTooltip from "react-tooltip";

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class ServiceList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            import: [],
            import1: [],
            customerProfileExists: false,
            customerProfile: {},
            businessProfileExists: false,
            businessProfile: {},
            serviceName: "",
            serviceBusiness: {},
            serviceDescription: "",
            serviceEmployees: [],
            serviceDays: [],
            serviceHours: [],
            newEmployee: "",
            startHour: "",
            startMin: "",
            endHour: "",
            endMin: "",
            businessServiceExists: false,
            businessService: [],
            reloader: false,
            serviceName1: "",
            serviceBusiness1: {},
            serviceDescription1: "",
            serviceEmployees1: [],
            serviceDays1: [],
            newEmployee1: "",
            startHour1: "",
            startMin1: "",
            endHour1: "",
            endMin1: "",
            serviceBookings1: [],
            businessServiceItem: {},
            updateId: 0,
            show: false,
            show1: 0,
            show2: 0,
            allServices: [],
            //Booking Form
            bookingNotes: "",
            bookingNotify: "false",
            bookingStatus: "",
            moment: moment(),
            date: new Date(),
            date1: new Date()
        }
    }
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
                    }
                }
            }
        })
    }
    checkBusinessProfile(){
        fetch(`${API_URL}/businesses`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({ import1: json}, ()=>{console.log(this.state.import1)})
            var new_data=json
            if(this.props.auth.user!==null && new_data.length>0){
                console.log(this.props.auth.user.username)
                console.log(this.props.auth.user.attributes.email)
                for (var i = 0; i < new_data.length; i++) {
                    if(new_data[i].email===this.props.auth.user.attributes.email){
                        this.setState({ businessProfileExists: true}, ()=>{console.log(this.state.businessProfileExists) })
                        this.setState({ businessProfile: new_data[i]}, ()=>{console.log(this.state.businessProfile) })
                    }
                }
            }
        })
    }
    getCurrentServiceItem(id){
        fetch(`${API_URL}/businessServices/`+id)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            var serviceItem=json
            if(serviceItem){
                this.setState({ businessServiceItem: serviceItem }, ()=>console.log(this.state.businessServiceItem))
                this.setState({ serviceName1: serviceItem.name }, ()=>console.log(this.state.serviceName1))
                this.setState({ serviceBusiness1: serviceItem.business }, ()=>console.log(this.state.serviceBusiness1))
                this.setState({ serviceDescription1: serviceItem.description }, ()=>console.log(this.state.serviceDescription1))
                this.setState({ serviceDays1: serviceItem.workingHours[0].days }, ()=>console.log(this.state.serviceDays1))
                this.setState({ startHour1: serviceItem.workingHours[0].startTime.slice(0,2)}, ()=>console.log(this.state.startHour1))
                this.setState({ startMin1: serviceItem.workingHours[0].startTime.slice(3,5)}, ()=>console.log(this.state.startMin1))
                this.setState({ endHour1: serviceItem.workingHours[0].endTime.slice(0,2)}, ()=>console.log(this.state.endHour1))
                this.setState({ endMin1: serviceItem.workingHours[0].endTime.slice(3,5)}, ()=>console.log(this.state.endMin1))
                this.setState({ serviceEmployees1: serviceItem.employees }, ()=>console.log(this.state.serviceEmployees1))
                this.setState({ serviceBookings1: serviceItem.bookings }, ()=>console.log(this.state.serviceBookings1))
            }
        })
    }
    checkServiceByProfile(){
        fetch(`${API_URL}/businessServices`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            // this.setState({ import1: json}, ()=>{console.log(this.state.import1)})
            var new_data=json
            if(this.state.businessProfileExists && new_data.length>0){
                console.log(this.state.businessProfile)
                console.log(new_data)
                var temp_arr2=[]
                var temp_businessServiceExists=false
                for (var i = 0; i < new_data.length; i++) {
                    if(new_data[i].business){
                        if((new_data[i].business.id)===this.state.businessProfile.id){
                            temp_arr2.push(new_data[i])
                            temp_businessServiceExists=true
                            this.setState({ businessServiceExists: true}, ()=>{
                                console.log(this.state.businessServiceExists)
                                console.log("Check01!!!")
                            })
                        }
                    } 
                }
                this.setState({ businessService: temp_arr2}, ()=>{console.log(this.state.businessService) })
                console.log(temp_arr2)
                console.log(this.state.businessProfile)
                if(typeof this.state.businessProfile.id==="undefined"){
                    alert("Business Profile still not loaded")
                }
                console.log(this.state.businessProfile.id)
                console.log(temp_businessServiceExists)
                // if(temp_businessServiceExists===true){
                //     var temp_arr=[]
                //     for (var i = 0; i < temp_arr2.length; i++) {
                //         if(parseInt(temp_arr2[i].business_Id)===this.state.businessProfile.id){
                //             temp_arr.push(String(temp_arr2[i].id))
                //         }
                //     }
                //     console.log(temp_arr)
                //     var uniq = [...new Set(temp_arr)];
                //     console.log(uniq)
                //     var new_obj = {
                //         id: this.state.businessProfile.id,
                //         name: this.state.businessProfile.name,
                //         email: this.state.businessProfile.email,
                //         password: this.state.businessProfile.password,
                //         description: this.state.businessProfile.description,
                //         phone: this.state.businessProfile.phone,
                //         address: this.state.businessProfile.address,
                //         businessService_Ids: uniq
                //     }
                //     console.log(new_obj)
                //     fetch('http://localhost:8080/businesses1', {
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     method: "PUT",
                //     body: JSON.stringify(new_obj)
                //     })
                // }
            }
        })
    }
    getAllServices(){
        fetch(`${API_URL}/businessServices`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            var new_data=json
            if(new_data.length>0){
                this.setState({ allServices: new_data }, ()=>{console.log(this.state.allServices)})
            }
        })
    }
    handleServiceName(event){
        this.setState({ serviceName: event.target.value})
    }
    handleServiceDescription(event){
        this.setState({ serviceDescription: event.target.value})
    }
    handleNewEmployee(event){
        this.setState({ newEmployee: event.target.value })
    }
    addEmployee(event){
        var arr=this.state.serviceEmployees
        if(this.state.newEmployee!==""){
            arr.push(this.state.newEmployee)
        }
        this.setState({ serviceEmployees: arr }, ()=>console.log(this.state.serviceEmployees))
        event.preventDefault()
    }
    rejectEmployee(index, event){
        var array=this.state.serviceEmployees
        if (index > -1) {
            array.splice(index, 1);
        }
        this.setState({ serviceEmployees: array }, ()=>console.log(this.state.serviceEmployees))
        event.preventDefault()
    }
    onChangeCheckbox(event){
        var arr=this.state.serviceDays
        console.log(event.target.checked, event.target.value);
        if(event.target.checked===true){
            arr.push(event.target.value)
        } else if(event.target.checked===false){
            var index = arr.indexOf(event.target.value)
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
        var uniq = [...new Set(arr)];
        console.log(uniq)
        this.setState({ serviceDays:uniq }, ()=>console.log(this.state.serviceDays))
    }
    handleStartHour(event){
        this.setState({ startHour: event.target.value })
    }
    handleStartMin(event){
        this.setState({ startMin: event.target.value })
    }
    handleEndHour(event){
        this.setState({ endHour: event.target.value })
    }
    handleEndMin(event){
        this.setState({ endMin: event.target.value })
    }
    handleServiceName1(event){
        this.setState({ serviceName1: event.target.value})
    }
    handleServiceDescription1(event){
        this.setState({ serviceDescription1: event.target.value})
    }
    handleNewEmployee1(event){
        this.setState({ newEmployee1: event.target.value })
    }
    addEmployee1(event){
        var arr=this.state.serviceEmployees1
        if(this.state.newEmployee1!==""){
            arr.push(this.state.newEmployee1)
        }
        this.setState({ serviceEmployees1: arr }, ()=>console.log(this.state.serviceEmployees1))
        event.preventDefault()
    }
    rejectEmployee1(index, event){
        var array=this.state.serviceEmployees1
        if (index > -1) {
            array.splice(index, 1);
        }
        this.setState({ serviceEmployees1: array }, ()=>console.log(this.state.serviceEmployees1))
        event.preventDefault()
    }
    onChangeCheckbox1(event){
        var arr=this.state.serviceDays1
        console.log(event.target.checked, event.target.value);
        if(event.target.checked===true){
            arr.push(event.target.value)
        } else if(event.target.checked===false){
            var index = arr.indexOf(event.target.value)
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
        var uniq = [...new Set(arr)];
        console.log(uniq)
        this.setState({ serviceDays1:uniq }, ()=>console.log(this.state.serviceDays1))
    }
    handleStartHour1(event){
        this.setState({ startHour1: event.target.value })
    }
    handleStartMin1(event){
        this.setState({ startMin1: event.target.value })
    }
    handleEndHour1(event){
        this.setState({ endHour1: event.target.value })
    }
    handleEndMin1(event){
        this.setState({ endMin1: event.target.value })
    }
    createService(event){
        var invalid=false
        var errorMsg = ''
        if(!this.state.businessProfileExists){
            invalid = true
            errorMsg = errorMsg + 'You do not even have a business profile. How did you even get here?\n'
        }
        if(!this.state.serviceName){
            invalid = true
            errorMsg = errorMsg + 'Service name cannot be empty\n'
        }
        if(!this.state.serviceDescription){
            invalid = true
            errorMsg = errorMsg + 'Service description cannot be empty\n'
        }
        if(!this.state.serviceEmployees.length>0){
            invalid = true
            errorMsg = errorMsg + 'Employee list cannot be empty\n'
        }
        if(!this.state.serviceDays.length>0){
            invalid = true
            errorMsg = errorMsg + 'At least one working day is required\n'
        }
        if(!this.state.startHour || !this.state.startMin){
            invalid = true
            errorMsg = errorMsg + 'Start time cannot be empty\n'
        }
        if(this.state.startHour < 0) {
            invalid = true
            errorMsg = errorMsg + 'Starting hour cannot be less than 0\n'
        }
        if(this.state.startHour > 23) {
            invalid = true
            errorMsg = errorMsg + 'Starting hour cannot be higher than 24\n'
        }
        if(this.state.endHour < 0) {
            invalid = true
            errorMsg = errorMsg + 'End hour cannot be less than 0\n'
        }
        if(this.state.endHour > 23) {
            invalid = true
            errorMsg = errorMsg + 'End hour cannot be higher than 24\n'
        }
        if(this.state.startMin < 0) {
            invalid = true
            errorMsg = errorMsg + 'Start minute cannot be less than 0\n'
        }
        if(this.state.startMin > 59) {
            invalid = true
            errorMsg = errorMsg + 'Start minute cannot be higher than 59\n'
        }
        if(this.state.endMin < 0) {
            invalid = true
            errorMsg = errorMsg + 'End minute cannot be less than 0\n'
        }
        if(this.state.endMin > 59) {
            invalid = true
            errorMsg = errorMsg + 'End minute cannot be higher than 59\n'
        }
        if(!this.state.endHour || !this.state.endMin){
            invalid = true
            errorMsg = errorMsg + 'End time cannot be empty\n'
        }
        if(this.state.endHour<this.state.startHour){
            invalid = true
            errorMsg = errorMsg + 'End time cannot be earlier than start time\n'
        }
        else if(this.state.startHour===this.state.endHour){
            if((this.state.endMin-this.state.startMin)<0){
                invalid = true
                errorMsg = errorMsg + 'End time cannot be earlier than start time\n'
            }
        }
        if(invalid){
            alert(errorMsg)
            event.preventDefault();
        } else {
            var new_obj_1 = {
                name: this.state.serviceName,
                business: {id: this.state.businessProfile.id},
                description: this.state.serviceDescription,
                workingHours: [{
                    days: this.state.serviceDays,
                    startTime: this.state.startHour+":"+this.state.startMin,
                    endTime: this.state.endHour+":"+this.state.endMin
                }],
                employees: this.state.serviceEmployees,
                bookings: []
            }
            console.log(new_obj_1)
            fetch(`${API_URL}/businessServices`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify(new_obj_1)
            })
            // this.checkCustomerProfile()
            // this.checkBusinessProfile()
            // this.checkServiceByProfile()
            // console.log("Check!!!")
            this.setState({ reloader: !this.state.reloader}, ()=>{
                this.getAllServices()
                this.checkCustomerProfile()
                this.checkBusinessProfile()
                this.checkServiceByProfile()
                console.log("Check!!!")
            })
            alert("Your service is created.")
            // event.preventDefault();
        }
    }
    updateBusinessService(event, id){
        var invalid=false
        var errorMsg = ''
        if(!this.state.serviceName1){
            invalid = true
            errorMsg = errorMsg + 'Service name cannot be empty\n'
        }
        if(!this.state.serviceDescription1){
            invalid = true
            errorMsg = errorMsg + 'Service description cannot be empty\n'
        }
        if(!this.state.serviceEmployees1.length>0){
            invalid = true
            errorMsg = errorMsg + 'Employee list cannot be empty\n'
        }
        if(!this.state.serviceDays1.length>0){
            invalid = true
            errorMsg = errorMsg + 'At least one working day is required\n'
        }
        if(!this.state.startHour1 || !this.state.startMin1){
            invalid = true
            errorMsg = errorMsg + 'Start time cannot be empty\n'
        }
        if(this.state.startHour1 < 0) {
            invalid = true
            errorMsg = errorMsg + 'Starting hour cannot be less than 0\n'
        }
        if(this.state.startHour1 > 23) {
            invalid = true
            errorMsg = errorMsg + 'Starting hour cannot be higher than 24\n'
        }
        if(this.state.endHour1 < 0) {
            invalid = true
            errorMsg = errorMsg + 'End hour cannot be less than 0\n'
        }
        if(this.state.endHour1 > 23) {
            invalid = true
            errorMsg = errorMsg + 'End hour cannot be higher than 24\n'
        }
        if(this.state.startMin1 < 0) {
            invalid = true
            errorMsg = errorMsg + 'Start minute cannot be less than 0\n'
        }
        if(this.state.startMin1 > 59) {
            invalid = true
            errorMsg = errorMsg + 'Start minute cannot be higher than 59\n'
        }
        if(this.state.endMin1 < 0) {
            invalid = true
            errorMsg = errorMsg + 'End minute cannot be less than 0\n'
        }
        if(this.state.endMin1 > 59) {
            invalid = true
            errorMsg = errorMsg + 'End minute cannot be higher than 59\n'
        }
        if(!this.state.endHour1 || !this.state.endMin1){
            invalid = true
            errorMsg = errorMsg + 'End time cannot be empty\n'
        }
        if(this.state.endHour1<this.state.startHour1){
            invalid = true
            errorMsg = errorMsg + 'End time cannot be earlier than start time\n'
        }
        else if(this.state.startHour1===this.state.endHour1){
            if((this.state.endMin1-this.state.startMin1)<0){
                invalid = true
                errorMsg = errorMsg + 'End time cannot be earlier than start time\n'
            }
        }
        if(invalid){
            alert(errorMsg)
            event.preventDefault();
        } else {
            var new_obj_1 = {
                id: id,
                name: this.state.serviceName1,
                business: this.state.serviceBusiness1,
                description: this.state.serviceDescription1,
                workingHours: [{
                    days: this.state.serviceDays1,
                    startTime: this.state.startHour1+":"+this.state.startMin1,
                    endTime: this.state.endHour1+":"+this.state.endMin1
                }],
                employees: this.state.serviceEmployees1,
                bookings: this.state.serviceBookings1
            }
            console.log(new_obj_1)
            fetch(`${API_URL}/businessServices`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "PUT",
             body: JSON.stringify(new_obj_1)
            })
            // this.checkCustomerProfile()
            // this.checkBusinessProfile()
            // this.checkServiceByProfile()
            // console.log("Check!!!")
            this.setState({ reloader: !this.state.reloader}, ()=>{
                this.getAllServices()
                this.checkCustomerProfile()
                this.checkBusinessProfile()
                this.checkServiceByProfile()
                console.log("Check!!!")
            })
            alert("Your service is updated.")
            // event.preventDefault();
        }
    }
    deleteBusinessService(id){
        fetch(`${API_URL}/businessServices/` + id, {
            method: 'DELETE',
        })
        alert("Your service is deleted.")
        this.setState({ reloader: !this.state.reloader }, ()=>{
            console.log(this.state.businessService)
            this.getAllServices()
            this.checkCustomerProfile()
            this.checkBusinessProfile()
            this.checkServiceByProfile()
        })
        // var array1=this.state.businessService
        // console.log(array1)
        // var index=-1
        // for (var i = 0; i < array1.length; i++) {
        //     if(array1[i].id===id){
        //         index=i
        //     }
        // }
        // if (index > -1) {
        //     array1.splice(index, 1);
        // }
        // console.log(array1)

        // var new_data=array1
        // var temp_arr=[]
        // for (var i = 0; i < new_data.length; i++) {
        //     temp_arr.push(new_data[i].id)
        // }
        // console.log(temp_arr)
        // var uniq = [...new Set(temp_arr)];
        // console.log(uniq)
        // var new_obj = {
        //     id: this.state.businessProfile.id,
        //     name: this.state.businessProfile.name,
        //     email: this.state.businessProfile.email,
        //     password: this.state.businessProfile.password,
        //     description: this.state.businessProfile.description,
        //     phone: this.state.businessProfile.phone,
        //     address: this.state.businessProfile.address,
        //     businessService_Ids: uniq
        // }
        // console.log(new_obj)
        // fetch('http://localhost:8080/businesses1', {
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        // method: "PUT",
        // body: JSON.stringify(new_obj)
        // })
        // this.setState({ businessService: array1 }, ()=>{
        //     console.log(this.state.businessService)
        //     this.checkCustomerProfile()
        //     this.checkBusinessProfile()
        //     this.checkServiceByProfile()
        // })
        // this.checkCustomerProfile()
        // this.checkBusinessProfile()
        // this.checkServiceByProfile()
    }
    handleShow(){
        this.setState({ show: true })
    }
    handleClose(){
        this.setState({ show: false })
    }
    handleShow1 = value => {
        this.setState({ show1: value })
    }
    handleClose1 = value => {
        this.setState({ show1: 0 })
    }
    handleShow2 = value => {
        this.setState({ show2: value })
    }
    handleClose2 = value => {
        this.setState({ show2: 0 })
    }
    handleBookingNotes(event){
        this.setState({ bookingNotes: event.target.value })
    }
    onChangeCheckboxNotify(event){
        if(event.target.checked===true){
            this.setState({ bookingNotify:event.target.value })
        }
    }
    onChangeDate=(date)=>{
        this.setState({ date }, ()=>console.log(this.state.date))
    }
    onChangeDate1=(date1)=>{
        this.setState({ date1 }, ()=>console.log(this.state.date1))
    }
    createBooking(event, businessServiceId, target_service){
        var checkValidSum=0
        if(businessServiceId){
            checkValidSum++
            console.log(businessServiceId)
        }
        if(this.state.customerProfileExists){
            checkValidSum++
            console.log(this.state.customerProfile.id)
        }
        if(this.state.bookingNotes){
            checkValidSum++
        }
        if(this.state.date&&this.state.date1&&target_service){
            var today = new Date()
            var startDate = this.state.date;
            var endDate = this.state.date1;
            var str_startDate = String(this.state.date)
            var str_endDate = String(this.state.date1)
            var new_days_arr=[]

            if((endDate-startDate)>0 && Math.ceil(Math.abs(endDate-startDate)/(1000 * 60 * 60 * 24))<=1 && (startDate-today)>0 && Math.ceil(Math.abs(startDate-today)/(1000 * 60 * 60 * 24))<=7){
                checkValidSum++
                console.log(endDate-startDate)
                console.log(Math.ceil(Math.abs(endDate-startDate)/(1000 * 60 * 60 * 24)))
                console.log(startDate-today)
                console.log(Math.ceil(Math.abs(startDate-today)/(1000 * 60 * 60 * 24)))
                //End date is not before start and it is same day, is not today, not further than 7 days
            }

            for (var i = 0; i < target_service.workingHours[0].days.length; i++) {
                new_days_arr.push(target_service.workingHours[0].days[i].slice(0,3))
            }

            for (var i = 0; i < new_days_arr.length; i++) {
                if(str_startDate.slice(0,3)===new_days_arr[i]&&str_endDate.slice(0,3)===new_days_arr[i]){
                    checkValidSum++
                    console.log(checkValidSum)
                }
            }
            //Check if day is in serviceDays

            if(parseInt(str_startDate.slice(16,18))<=parseInt(target_service.workingHours[0].endTime.slice(0,2))&&parseInt(str_startDate.slice(16,18))>=parseInt(target_service.workingHours[0].startTime.slice(0,2))&&parseInt(str_endDate.slice(16,18))<=parseInt(target_service.workingHours[0].endTime.slice(0,2))&&parseInt(str_endDate.slice(16,18))>=parseInt(target_service.workingHours[0].startTime.slice(0,2))){
                //start time is between service hours, end time is between service hours
                if(parseInt(str_startDate.slice(16,18))===parseInt(target_service.workingHours[0].startTime.slice(0,2))){
                    if(parseInt(str_startDate.slice(19,21))>=parseInt(target_service.workingHours[0].startTime.slice(-2))){
                    } else {
                        checkValidSum=checkValidSum-1
                        //if start time = start time, check minutes higher
                    }
                }
                if(parseInt(str_endDate.slice(16,18))===parseInt(target_service.workingHours[0].endTime.slice(0,2))){
                    if(parseInt(str_endDate.slice(19,21))<=parseInt(target_service.workingHours[0].endTime.slice(-2))){
                    } else {
                        checkValidSum=checkValidSum-1
                        //if end time = end time, check minutes lower
                    }
                }
                checkValidSum++//check if hour is within available service working hour
                console.log(checkValidSum)
            }
        }

        if(checkValidSum!==6){
            alert("Some inputs are missing or wrongly entered. Please re-fill the form with all required inputs.")
            event.preventDefault();
        } else {
            var status1="Unseen"
            var new_obj_1 = {
                businessService: {id: businessServiceId},
                startDateTime: String(this.state.date),
                endDateTime: String(this.state.date1),
                customer: {id: this.state.customerProfile.id},
                notes: this.state.bookingNotes,
                notify: this.state.bookingNotify,
                status: status1
            }
            console.log(new_obj_1)
            fetch(`${API_URL}/bookings`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify(new_obj_1)
            })
            // this.checkCustomerProfile()
            // this.checkBusinessProfile()
            // this.checkServiceByProfile()
            // console.log("Check!!!")
            this.setState({ reloader: !this.state.reloader}, ()=>{
                this.getAllServices()
                this.checkCustomerProfile()
                this.checkBusinessProfile()
                this.checkServiceByProfile()
                console.log("Check!!!")
            })
            alert("Your booking is created.")
            event.preventDefault();
        }
    }
    componentDidMount() {
        this.getAllServices()
        this.checkCustomerProfile()
        this.checkBusinessProfile()
        this.checkServiceByProfile()
        console.log("Mounted!!!")
        console.log(this.state.businessServiceExists)
    }
    componentDidUpdate(){
        console.log("Updated!!!")
    }
    render() {

        const render_bookingForm = (sv) => {
            return (
                <Modal show={this.state.show2 === sv.id} onHide={()=>this.handleClose2(sv.id)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event)=>this.createBooking(event, sv.id, sv)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputa1">Notes</label>
                            <input value={this.state.bookingNotes} onChange={this.handleBookingNotes.bind(this)} type="text" className="form-control" id="exampleInputa1" placeholder="Enter notes" />
                        </div>
                        <div className="row">
                            <div className="col-10">
                                <div className="form-group">
                                    <label>Allow Notification</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox10a" onChange={this.onChangeCheckboxNotify.bind(this)} defaultChecked={false} value="true" />
                                            <label className="form-check-label" htmlFor="inlineCheckbox10a">Send you a reminder</label>
                                        </div>                                                                                                                                                           
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>From:</label>
                                    <DateTimePicker
                                        value={this.state.date}
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>To:</label>
                                    <DateTimePicker
                                        value={this.state.date1}
                                        onChange={this.onChangeDate1}
                                    />
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>                                                     
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose2.bind(this)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            )
        }

        return(
            <div className="container-fluid profile-container-bg py-3">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="card my-3">
                            <h3 className="mt-3 ml-3">All Business Services</h3>
                            <div className="card-body">
                                {this.state.allServices.length>0&&<div>
                                    {this.state.allServices.map((sv,j)=>{
                                        return(
                                            <div key={j} className="card my-3">
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
                                                            <td>{sv.name}</td>
                                                            <td>{sv.description}</td>
                                                            <td>{sv.id}/{sv.business.id}</td>
                                                            <td>{sv.workingHours[0].startTime}</td>
                                                            <td>{sv.workingHours[0].endTime}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <h5>Available On</h5>
                                                    <div className="row mb-3">{sv.workingHours[0].days.length>0 && sv.workingHours[0].days.map((d, v)=>{
                                                        return(
                                                            <div className="col-2 text-left" key={v}>{d}</div>
                                                        )
                                                    })}</div>
                                                    <h5>Available Staff</h5>
                                                    <div className="row mb-3">
                                                        {sv.employees.length>0 && sv.employees.map((e, n)=>{
                                                            return(
                                                                <div className="col-2" key={n}>{e}</div>
                                                            )
                                                        })}
                                                    </div>
                                                    <h5>Booked Appointments</h5>
                                                    <div className="row">
                                                        {sv.bookings.length>0 && sv.bookings.map((b, m)=>{
                                                            return(
                                                                <div className="col-1" key={m}>
                                                                    <Link data-tip data-for="detail_1" to={'booking/' + b.id}>
                                                                        {b.id}
                                                                    </Link>
                                                                    <ReactTooltip id="detail_1" place="top" effect="solid">
                                                                        Click here to view this book detail
                                                                    </ReactTooltip>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    {this.state.customerProfileExists&&
                                                    <Fragment>
                                                    <Button data-tip data-for="bookButtonTip" variant="primary float-right" onClick={()=>{
                                                        this.handleShow2(sv.id)
                                                    }}>
                                                        Book
                                                    </Button>
                                                    <ReactTooltip id="bookButtonTip" place="top" effect="solid">
                                                        Click here to make an appointment with service providers
                                                    </ReactTooltip>
                                                    </Fragment>
                                                    }
                                                    {render_bookingForm(sv)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
                {this.props.auth.isAuthenticated && this.props.auth.user && this.state.businessProfileExists===true && <div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="card my-3">
                                <h3 className="mt-3 ml-3">Your Business Services</h3>
                                <div className="card-body">      
                                    {this.state.businessServiceExists && <div>
                                        {this.state.businessService.map((service, i)=>{
                                            return(
                                                <div key={i} className="card my-3">
                                                    <div className="card-body">
                                                    <div className="row">         
                                                        <div className="col-10">
                                                        <h5>Name</h5>
                                                        <p>{service.name}</p>
                                                        <h5>Description</h5>
                                                        <p>{service.description}</p>
                                                        <h5>ID/Business ID</h5>
                                                        <p>{service.id}/{service.business.id}</p>
                                                        {service.workingHours.length>0 && <Fragment>
                                                            <h5>Available On</h5>
                                                            <div className="row">{service.workingHours[0].days.length>0 && service.workingHours[0].days.map((day, y)=>{
                                                                return(
                                                                    <div className="col-2 text-left" key={y}>{day}</div>
                                                                )
                                                            })}</div>
                                                            <div className="row mt-3">
                                                                <div className="col-2 text-left">
                                                                    <p>From: {service.workingHours[0].startTime}</p>
                                                                    <p>To: {service.workingHours[0].endTime}</p>
                                                                </div>
                                                            </div>
                                                        </Fragment>}
                                                        <h5>Available Staff</h5>
                                                        <div className="row mb-3">
                                                            {service.employees.length>0 && service.employees.map((employee, z)=>{
                                                                return(
                                                                    <div className="col-2" key={z}>{employee}</div>
                                                                )
                                                            })}
                                                        </div>
                                                        <h5>Booked Appointments</h5>
                                                        <div className="row">
                                                            {service.bookings.length>0 && service.bookings.map((booking, u)=>{
                                                                return(
                                                                    <div className="col-1" key={u}>
                                                                        <Link data-tip data-for="detail_2" to={'bookingdetail/' + booking.id}>
                                                                            {booking.id}
                                                                        </Link>
                                                                        <ReactTooltip id="detail_2" place="top" effect="solid">
                                                                            Click here to view this book detail 
                                                                        </ReactTooltip>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="dropdown ml-5">
                                                                <button data-tip data-for="bookingMoreTip" className="btn btn-white btn-sm ml-5 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <Icon className="fa fa-cog" style={{ fontSize: 20, color: "dark" }}/>
                                                                    <ReactTooltip id="bookingMoreTip" place="top" effect="solid">
                                                                        More Options
                                                                    </ReactTooltip>
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    {/* <a className="dropdown-item" href="true">Edit</a> */}
                                                                    <a className="dropdown-item" href="#">
                                                                        <Button variant="white" onClick={()=>{
                                                                            this.handleShow1(service.id)
                                                                            this.getCurrentServiceItem(service.id)
                                                                        }}>
                                                                            Edit
                                                                        </Button>
                                                                        <Modal show={this.state.show1 === service.id} onHide={()=>this.handleClose1(service.id)}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Edit Your Service</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                <form onSubmit={(event)=>{this.updateBusinessService(event, service.id)}}>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="exampleInput100st">Name</label>
                                                                                        <input value={this.state.serviceName1} onChange={this.handleServiceName1.bind(this)} type="text" className="form-control" id="exampleInput100st" placeholder="Enter service name" />
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="exampleInput100">Description</label>
                                                                                        <input value={this.state.serviceDescription1} onChange={this.handleServiceDescription1.bind(this)} type="text" className="form-control" id="exampleInput100" placeholder="Enter description" />
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-10">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="exampleInput10">Add Employee</label>
                                                                                                <input value={this.state.newEmployee1} onChange={this.handleNewEmployee1.bind(this)} type="text" className="form-control" id="exampleInput10" aria-describedby="employeeHelp1" placeholder="Name of employee" />
                                                                                                <small id="employeeHelp1" className="form-text text-muted">Click add for each name entered</small>
                                                                                            </div>
                                                                                            {this.state.serviceEmployees1.length>0 && <div>
                                                                                                {this.state.serviceEmployees1.map((employee, i)=>{
                                                                                                    return(
                                                                                                        <div key={i} className="row mb-1">
                                                                                                            <div className="btn-group ml-3">
                                                                                                                <button className="btn btn-success btn-sm text-left">{employee}</button>
                                                                                                            </div>
                                                                                                            <div className="btn-group ml-1">
                                                                                                                <button onClick={(event)=>{this.rejectEmployee1(i,event)}} className="btn btn-success btn-sm float-left">x</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>}
                                                                                            <div className="form-group">
                                                                                                <label>Available On:</label>
                                                                                                <div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox10" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Monday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox10">Monday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox20" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Tuesday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox20">Tuesday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox30" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Wednesday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox30">Wednesday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox40" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Thursday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox40">Thursday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox50" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Friday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox50">Friday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox60" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Saturday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox60">Saturday</label>
                                                                                                    </div>
                                                                                                    <div className="form-check form-check-inline">
                                                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox70" onChange={this.onChangeCheckbox1.bind(this)} defaultChecked={false} value="Sunday" />
                                                                                                        <label className="form-check-label" htmlFor="inlineCheckbox70">Sunday</label>
                                                                                                    </div>
                                                                                                    <div className="row">
                                                                                                        <div className="col-4">
                                                                                                            <p>Selected Days:</p>
                                                                                                        </div>
                                                                                                        <div className="col">
                                                                                                            {this.state.serviceDays1.length>0 && this.state.serviceDays1.map((day1, k)=>{
                                                                                                                return(
                                                                                                                    <span key={k}>{day1} </span>
                                                                                                                )
                                                                                                            })}
                                                                                                        </div>
                                                                                                    </div>                                                                                                                                                            
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group">
                                                                                                <label>From:</label>
                                                                                                <div className="form-row">
                                                                                                    <div className="col-2">
                                                                                                        <input value={this.state.startHour1} onChange={this.handleStartHour1.bind(this)} type="text" className="form-control form-control-sm" placeholder="HH" />
                                                                                                    </div>
                                                                                                    <div className="col-1 text-center">:</div>
                                                                                                    <div className="col-2">
                                                                                                        <input value={this.state.startMin1} onChange={this.handleStartMin1.bind(this)} type="text" className="form-control form-control-sm float-left" placeholder="MM" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group">
                                                                                                <label>To:</label>
                                                                                                <div className="form-row">
                                                                                                    <div className="col-2">
                                                                                                        <input value={this.state.endHour1} onChange={this.handleEndHour1.bind(this)} type="text" className="form-control form-control-sm" placeholder="HH" />
                                                                                                    </div>
                                                                                                    <div className="col-1 text-center">:</div>
                                                                                                    <div className="col-2">
                                                                                                        <input value={this.state.endMin1} onChange={this.handleEndMin1.bind(this)} type="text" className="form-control form-control-sm float-left" placeholder="MM" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-1">
                                                                                            <button onClick={this.addEmployee1.bind(this)} className="btn btn-primary float-left" style={{marginTop: "31.5px"}}>+</button>
                                                                                        </div>
                                                                                        <div className="col-1"></div>
                                                                                    </div>
                                                                                    <button type="submit" className="btn btn-primary float-right">Submit</button>
                                                                                </form>                                                     
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button variant="secondary" onClick={this.handleClose1.bind(this)}>
                                                                                    Close
                                                                                </Button>
                                                                            </Modal.Footer>
                                                                        </Modal>
                                                                    </a>
                                                                    <a className="dropdown-item" href="#">
                                                                        <Button onClick={()=>{this.deleteBusinessService(service.id)}} variant="white">
                                                                            Delete
                                                                        </Button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                    {this.state.businessProfileExists&&<button className="btn btn-white btn-sm ml-5 float-right" data-tip data-for="createServiceTip" type="button" onClick={this.handleShow.bind(this)}>
                                        <Icon className="fa fa-plus" style={{ fontSize: 20, color: "dark" }}/>
                                        <ReactTooltip id="createServiceTip" place="top" effect="solid">
                                            Click here to create a service for your business
                                        </ReactTooltip>
                                    </button>}
                                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Create Your Service</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={this.createService.bind(this)}>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInput1st">Name</label>
                                                    <input value={this.state.serviceName} onChange={this.handleServiceName.bind(this)} type="text" className="form-control" id="exampleInput1st" placeholder="Enter service name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInput">Description</label>
                                                    <input value={this.state.serviceDescription} onChange={this.handleServiceDescription.bind(this)} type="text" className="form-control" id="exampleInput" placeholder="Enter description" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-10">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInput1">Add Employee</label>
                                                            <input value={this.state.newEmployee} onChange={this.handleNewEmployee.bind(this)} type="text" className="form-control" id="exampleInput1" aria-describedby="employeeHelp" placeholder="Name of employee" />
                                                            <small id="employeeHelp" className="form-text text-muted">Click add for each name entered</small>
                                                        </div>
                                                        {this.state.serviceEmployees.length>0 && <div>
                                                            {this.state.serviceEmployees.map((employee, i)=>{
                                                                return(
                                                                    <div key={i} className="row mb-1">
                                                                        <div className="btn-group ml-3">
                                                                            <button className="btn btn-success btn-sm text-left">{employee}</button>
                                                                        </div>
                                                                        <div className="btn-group ml-1">
                                                                            <button onClick={(event)=>{this.rejectEmployee(i,event)}} className="btn btn-success btn-sm float-left">x</button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>}
                                                        <div className="form-group">
                                                            <label>Available On:</label>
                                                            <div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Monday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Monday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Tuesday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Tuesday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Wednesday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox3">Wednesday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Thursday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox4">Thursday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Friday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox5">Friday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox6" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Saturday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox6">Saturday</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox7" onChange={this.onChangeCheckbox.bind(this)} defaultChecked={false} value="Sunday" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox7">Sunday</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>From:</label>
                                                            <div className="form-row">
                                                                <div className="col-2">
                                                                    <input value={this.state.startHour} onChange={this.handleStartHour.bind(this)} type="text" className="form-control form-control-sm" placeholder="HH" />
                                                                </div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-2">
                                                                    <input value={this.state.startMin} onChange={this.handleStartMin.bind(this)} type="text" className="form-control form-control-sm float-left" placeholder="MM" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>To:</label>
                                                            <div className="form-row">
                                                                <div className="col-2">
                                                                    <input value={this.state.endHour} onChange={this.handleEndHour.bind(this)} type="text" className="form-control form-control-sm" placeholder="HH" />
                                                                </div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-2">
                                                                    <input value={this.state.endMin} onChange={this.handleEndMin.bind(this)} type="text" className="form-control form-control-sm float-left" placeholder="MM" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-1">
                                                        <button onClick={this.addEmployee.bind(this)} className="btn btn-primary float-left" style={{marginTop: "31.5px"}}>+</button>
                                                    </div>
                                                    <div className="col-1"></div>
                                                </div>
                                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                                            </form>                                                     
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>}
            </div>
        )
    }
}