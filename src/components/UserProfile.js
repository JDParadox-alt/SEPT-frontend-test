import React, { Component, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            import: [],
            import1: [],
            customerProfileExists: false,
            businessProfileExists: false,
            startCreateProfile: false,
            isCustomer: false,
            isBusiness: false,
            customerUsername: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
            customerUpdateId: "",
            customerUsername1: "",
            customerEmail1: "",
            customerPhone1: "",
            customerAddress1: "",
            customerBookings1: [],
            customerProfile: {},
            businessProfile: {},
            customerProfile1: {},
            businessProfile1: {},
            businessName: "",
            businessEmail: "",
            businessDescription: "",
            businessPhone: "",
            businessAddress: "",
            businessUpdateId: "",
            businessName1: "",
            businessEmail1: "",
            businessServices1: [],
            businessDescription1: "",
            businessPhone1: "",
            businessAddress1: "",
            showEditCustomer: false,
            showEditBusiness: false,
            reloader: false,
            carrier: {},
            customerNameError:'',
            customerEmailError:'',
            customerPhoneError:'',
            customerAddressError:''
        }
    }
    getCustomers(){
        fetch(`${API_URL}/customers`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({ import: json}, ()=>{console.log(this.state.import)})
        })
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
                        this.setState({ carrier: new_data[i]}, ()=>{console.log(this.state.carrier) })
                        this.setState({ customerProfile1: new_data[i]}, ()=>{console.log(this.state.customerProfile1) })
                        this.setState({ customerUpdateId: new_data[i].id }, ()=>{console.log(this.state.customerUpdateId)})
                        this.setState({ customerUsername1: new_data[i].username }, ()=>{console.log(this.state.customerUsername1)})
                        this.setState({ customerEmail1: new_data[i].email }, ()=>{console.log(this.state.customerEmail1)})
                        this.setState({ customerPhone1: new_data[i].phone }, ()=>{console.log(this.state.customerPhone1)})
                        this.setState({ customerAddress1: new_data[i].address }, ()=>{console.log(this.state.customerAddress1)})
                        this.setState({ customerBookings1: new_data[i].bookings }, ()=>{console.log(this.state.customerBookings1)})
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
                        this.setState({ businessProfile1: new_data[i]}, ()=>{console.log(this.state.businessProfile1) })
                        this.setState({ businessUpdateId: new_data[i].id}, ()=>{console.log(this.state.businessUpdateId) })
                        this.setState({ businessName1: new_data[i].name}, ()=>{console.log(this.state.businessName1) })
                        this.setState({ businessEmail1: new_data[i].email}, ()=>{console.log(this.state.businessEmail1) })
                        this.setState({ businessServices1: new_data[i].businessServices}, ()=>{console.log(this.state.businessServices1) })
                        this.setState({ businessDescription1: new_data[i].description}, ()=>{console.log(this.state.businessDescription1) })
                        this.setState({ businessPhone1: new_data[i].phone}, ()=>{console.log(this.state.businessPhone1) })
                        this.setState({ businessAddress1: new_data[i].address}, ()=>{console.log(this.state.businessAddress1) })
                    }
                }
            }
        })
    }
    setCreateProfile(){
        this.setState({ startCreateProfile:true })
    }
    setIsCustomer(){
        this.setState({ isCustomer:true })
    }
    setIsBusiness(){
        this.setState({ isBusiness:true })
    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    handleOpenEditCustomer(){
        this.setState({showEditCustomer: true});
    }
    handleCloseEditCustomer(){
        this.setState({showEditCustomer: false});
    }
    handleOpenEditBusiness(){
        this.setState({showEditBusiness: true});
    }
    handleCloseEditBusiness(){
        this.setState({showEditBusiness: false});
    }

    reloadPage(){
        // this.setState({ reloader: !this.state.reloader}, ()=>{
        //     console.log(this.state.reloader)
        //     this.checkCustomerProfile()
        //     this.checkBusinessProfile()
        // })
        this.props.history.push('/userprofile')
    }

    submitCustomerProfile(event){
        // var checkValidSum=0
        // // if(this.state.customerUsername){
        // //     checkValidSum++
        // // }
        // // if(this.state.customerEmail){
        // //     checkValidSum++
        // // }
        // if(this.state.customerPhone){
        //     checkValidSum++
        // }
        // if(this.state.customerAddress){
        //     checkValidSum++
        // }
        // if(checkValidSum!==2){
        //     alert("Some inputs are missing or wrongly entered. Please re-fill the form with all required inputs. ("+(2-checkValidSum)+" errors)")
        //     event.preventDefault();
        // } 
        // else {
            var new_obj = {
                username: this.props.auth.user.username,
                email: this.props.auth.user.attributes.email,
                phone: this.state.customerPhone,
                address: this.state.customerAddress,
                bookings: []
            }
            console.log(new_obj)
            fetch(`${API_URL}/customers`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify(new_obj)
            })
            alert("Your profile is created.")
            // event.preventDefault();
        // }
        this.reloadPage()
    }
    submitBusinessProfile(event){
        // var checkValidSum=0
        // if(this.state.businessName){
        //     checkValidSum++
        // }
        // // if(this.state.businessEmail){
        // //     checkValidSum++
        // // }
        // if(this.state.businessDescription){
        //     checkValidSum++
        // }
        // if(this.state.businessPhone){
        //     checkValidSum++
        // }
        // if(this.state.businessAddress){
        //     checkValidSum++
        // }
        // if(checkValidSum!==4){
        //     alert("Some inputs are missing or wrongly entered. Please re-fill the form with all required inputs. ("+(4-checkValidSum)+" errors)")
        //     event.preventDefault();
        // } else {
            var new_obj = {
                name: this.state.businessName,
                email: this.props.auth.user.attributes.email,
                description: this.state.businessDescription,
                phone: this.state.businessPhone,
                address: this.state.businessAddress,
                businessServices: []
            }
            console.log(new_obj)
            fetch(`${API_URL}/businesses`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify(new_obj)
            })
            alert("Your profile is created.")
            // event.preventDefault();
        // }
        this.reloadPage()
    }
    editCustomerProfile(event){
        // var checkValidSum=0
        // if(this.state.customerUsername1){
        //     checkValidSum++
        // }
        // if(this.state.customerEmail1){
        //     checkValidSum++
        // }
        // if(this.state.customerPhone1){
        //     checkValidSum++
        // }
        // if(this.state.customerAddress1){
        //     checkValidSum++
        // }
        // if(checkValidSum!==4){
        //     alert("Some inputs are missing or wrongly entered. Please re-fill the form with all required inputs. ("+(4-checkValidSum)+" errors)")
        //     event.preventDefault();
        // } else {
            var new_obj = {
                id: this.state.customerUpdateId,
                username: this.state.customerUsername1,
                email: this.state.customerEmail1,
                phone: this.state.customerPhone1,
                address: this.state.customerAddress1,
                bookings: this.state.customerBookings1
            }
            console.log(new_obj)
            fetch(`${API_URL}/customers`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "PUT",
             body: JSON.stringify(new_obj)
            })
            alert("Your profile is updated.")
            // event.preventDefault();
        // }
        this.reloadPage()
    }
    editBusinessProfile(event){
        // var checkValidSum=0
        // if(this.state.businessName1){
        //     checkValidSum++
        // }
        // if(this.state.businessEmail1){
        //     checkValidSum++
        // }
        // if(this.state.businessDescription1){
        //     checkValidSum++
        // }
        // if(this.state.businessPhone1){
        //     checkValidSum++
        // }
        // if(this.state.businessAddress1){
        //     checkValidSum++
        // }
        // if(checkValidSum!==5){
        //     alert("Some inputs are missing or wrongly entered. Please re-fill the form with all required inputs. ("+(5-checkValidSum)+" errors)")
        //     event.preventDefault();
        // } else {
            var new_obj = {
                id: this.state.businessUpdateId,
                name: this.state.businessName1,
                email: this.state.businessEmail1,
                description: this.state.businessDescription1,
                phone: this.state.businessPhone1,
                address: this.state.businessAddress1,
                businessServices: this.state.businessServices1
            }
            console.log(new_obj)
            fetch(`${API_URL}/businesses`, {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             method: "PUT",
             body: JSON.stringify(new_obj)
            })
            alert("Your profile is updated.")
            // event.preventDefault();
        // }
        this.reloadPage()
    }
    deleteCustomerProfile(){
        fetch(`${API_URL}/customers/` + this.state.customerUpdateId, {
            method: 'DELETE',
        })
        alert("Your profile is deleted.")
        this.reloadPage()
    }
    deleteBusinessProfile(){
        fetch(`${API_URL}/businesses/` + this.state.businessUpdateId, {
            method: 'DELETE',
        })
        alert("Your profile is deleted.")
        this.reloadPage()
    }
    
    deleteBooking(id){
        fetch(`${API_URL}/bookings/` + id, {
            method: 'DELETE',
        })
        alert("Your booking is deleted.")
        this.reloadPage()
    }

    componentDidMount() {
        this.getCustomers()
        this.checkCustomerProfile()
        this.checkBusinessProfile()
    }

    render() {
        let {customerProfileExists, businessProfileExists, startCreateProfile} = this.state;

        const render_submitCustomerForm = () => {
            return (
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.submitCustomerProfile.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="exampleInput13">Username</label>
                                <input name='customerUsername' value={this.props.auth.user.username} readOnly onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput13" aria-describedby="usernameHelp"  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput23">Email Address</label>
                                <input name='customerEmail' readOnly value={this.props.auth.user.attributes.email} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput23" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput43">Phone Number</label>
                                <input minLength='5' maxLength='15' required name='customerPhone' type="text" value={this.state.customerPhone} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput43" placeholder="Enter phone number" />
                                <small className='text-danger'>{this.state.customerPhoneError}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput53">Address</label>
                                <input maxLength='256' required name='customerAddress' type="text" value={this.state.customerAddress} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput53" placeholder="Enter address" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            )
        }

        const render_submitBusinessForm = () => {
            return (
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.submitBusinessProfile.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="exampleInput14">Name</label>
                                <input minLength='3' maxLength='64' required name='businessName' value={this.state.businessName} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput14" placeholder="Enter the name of your business" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput24">Email Address</label>
                                <input required name='businessEmail' readOnly defaultValue={this.props.auth.user.attributes.email} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput24" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput64">Description</label>
                                <textarea maxLength='256' required name='businessDescription' type="text" value={this.state.businessDescription} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput64" placeholder="Enter description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput44">Phone Number</label>
                                <input minLength='5' maxLength='15' required name='businessPhone' type="text" value={this.state.businessPhone} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput44" placeholder="Enter phone number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput54">Address</label>
                                <input maxLength='256' required name='businessAddress' type="text" value={this.state.businessAddress} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput54" placeholder="Enter address" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            )
        }

        const render_EditCustomerModal = () => {
            return (
                <Modal show={this.state.showEditCustomer} onHide={this.handleCloseEditCustomer.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.editCustomerProfile.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="exampleInput1">Username</label>
                                <input required name='customerUsername1' readOnly value={this.state.customerUsername1} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput1" aria-describedby="usernameHelp" placeholder="Enter username" readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput2">Email Address</label>
                                <input required name='customerEmail1' readOnly value={this.state.customerEmail1} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput2" aria-describedby="emailHelp" placeholder="Enter email" readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput4">Phone Number</label>
                                <input minLength='5' maxLength='15' required name='customerPhone1' type="text" value={this.state.customerPhone1} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput4" placeholder="Enter phone number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput5">Address</label>
                                <input maxLength='256' required name='customerAddress1' type="text" value={this.state.customerAddress1} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput5" placeholder="Enter address" />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>                                                     
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseEditCustomer.bind(this)}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        const render_EditBusinessModal = () => {
            return (
                <Modal show={this.state.showEditBusiness} onHide={this.handleCloseEditBusiness.bind(this)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.editBusinessProfile.bind(this)}>
                            <div className="form-group">
                                <label minLength='3' maxLength='64' max htmlFor="exampleInput10">Name</label>
                                <input name='businessName1' value={this.state.businessName1} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput10" placeholder="Enter the name of your business" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput20">Email Address</label>
                                <input name='businessEmail1' readOnly value={this.state.businessEmail1} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="exampleInput20" aria-describedby="emailHelp" placeholder="Enter email" readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput60">Description</label>
                                <textarea maxLength='256' name='businessDescription1' type="text" value={this.state.businessDescription1} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput60" placeholder="Enter description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput40">Phone Number</label>
                                <input minLength='5' maxLength='15' name='businessPhone1' type="text" value={this.state.businessPhone1} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput40" placeholder="Enter phone number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInput50">Address</label>
                                <input maxLength='256' name='businessAddress1' type="text" value={this.state.businessAddress1} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInput50" placeholder="Enter address" />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>                                                     
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseEditBusiness.bind(this)}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        const render_customerProfile = () => {
            return (
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                            <h5>
                                {this.state.customerProfile.username}
                            </h5>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                <a data-tip data-for="customerBookTip" className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Schedule</a>
                                <ReactTooltip id="customerBookTip" place="top" effect="solid">
                                    Click here to view your booked appointments
                                </ReactTooltip>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="dropdown ml-5">
                                <button data-tip data-for="moreOptions1" className="btn btn-white btn-sm ml-5 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Icon className="fa fa-cog" style={{ fontSize: 20, color: "dark" }}/>
                                    <ReactTooltip id="moreOptions1" place="top" effect="solid">
                                        More Options
                                    </ReactTooltip>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">
                                        <Button variant="white" onClick={this.handleOpenEditCustomer.bind(this)}>
                                            Edit
                                        </Button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <Button variant="white" onClick={this.deleteCustomerProfile.bind(this)}>
                                            Delete
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Username</label>
                                </div>
                                <div className="col-md-6">
                                    <p data-tip data-for="customerNameTip">{this.props.auth.user.username} - {this.state.customerProfile.username}</p>
                                    <ReactTooltip id="customerNameTip" place="top" effect="solid">
                                        Session Username - Profile Username
                                    </ReactTooltip>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.customerProfile.email}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.customerProfile.phone}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.customerProfile.address}</p>
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                Put schedule calender later here.
                                <div className="card">
                                {this.state.customerProfile.bookings && <div className="card-body">
                                    {this.state.customerProfile.bookings.map((b, r)=>{
                                        return(
                                            <div className="card" key={r}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <h5>BookingID/ServiceID</h5>
                                                            <p>{b.id}/{b.businessService&&b.businessService.id}</p>
                                                            <h5>Date/Time</h5>
                                                            <p>From: {b.startDateTime}</p>
                                                            <p>To: {b.endDateTime}</p>
                                                            <h5>Notes</h5>
                                                            <p>{b.notes}</p>
                                                            <h5>Set Reminder</h5>
                                                            <p>{b.notify}</p>
                                                            <h5>Status</h5>
                                                            <p>{b.status}</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="dropdown">
                                                                <button data-tip data-for="moreOptions2" className="btn btn-white btn-sm dropdown-toggle ml-5" type="button" id="dropdownMenuButton1a" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <Icon className="fa fa-cog" style={{ fontSize: 20, color: "dark" }}/>
                                                                    <ReactTooltip id="moreOptions2" place="top" effect="solid">
                                                                        More Options
                                                                    </ReactTooltip>
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1a">
                                                                    <a className="dropdown-item" href="#">
                                                                        {/* <button className="btn btn-white">View In Calendar</button> */}
                                                                        <Link className="btn btn-white" 
                                                                            to={{pathname:`/booking/${b.id}`
                                                                            // , state: {carrier: this.state.carrier}
                                                                            }}>
                                                                            View Details
                                                                        </Link>
                                                                    </a>
                                                                    <a className="dropdown-item" href="#">
                                                                        {/* <button className="btn btn-white">View In Calendar</button> */}
                                                                        <Link className="btn btn-white" 
                                                                            to={{pathname:'/mycalendar'
                                                                            // , state: {carrier: this.state.carrier}
                                                                            }}>
                                                                            View In Calendar
                                                                        </Link>
                                                                    </a>
                                                                    <a className="dropdown-item" href="#">
                                                                        <button className="btn btn-white" onClick={()=>this.deleteBooking(b.id)}>Cancel Booking</button>
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
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            )
        }

        const render_BusinessProfile = () => {
            return (
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                            <h5>
                                {this.state.businessProfile.name}
                            </h5>
                            <ul className="nav nav-tabs" id="myTab1" role="tablist">
                                <li className="nav-item">
                                <a className="nav-link active" id="home-tab1" data-toggle="tab" href="#home1" role="tab" aria-controls="home1" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" id="profile-tab1" data-toggle="tab" href="#profile1" role="tab" aria-controls="profile1" aria-selected="false">Schedule</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="dropdown ml-5">
                                <button data-tip data-for="moreOptions3" className="btn btn-white btn-sm ml-5 dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Icon className="fa fa-cog" style={{ fontSize: 20, color: "dark" }}/>
                                    <ReactTooltip id="moreOptions3" place="top" effect="solid">
                                        More Options
                                    </ReactTooltip>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <a className="dropdown-item" href="#">
                                        <Button variant="white" onClick={this.handleOpenEditBusiness.bind(this)}>
                                            Edit
                                        </Button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <Button variant="white" onClick={this.deleteBusinessProfile.bind(this)}>
                                            Delete
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent1">
                            <div className="tab-pane fade show active" id="home1" role="tabpanel" aria-labelledby="home-tab1">
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.businessProfile.name}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.businessProfile.email}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Description</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.businessProfile.description}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.businessProfile.phone}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{this.state.businessProfile.address}</p>
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab1">
                                Put schedule calender later here.
                            </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            )
        }

        const render_main = ()=>{
            if(customerProfileExists===true && businessProfileExists===true && startCreateProfile===false){
                return (
                    <div>
                        {render_customerProfile()}
                        {render_BusinessProfile()}
                    </div>
                )
            } else if(customerProfileExists===true && businessProfileExists===false && startCreateProfile===false){
                return (
                    <div>
                        {this.state.isBusiness===true ? <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                {render_submitBusinessForm()}
                            </div>
                            <div className="col-3"></div>
                        </div> : <div>
                            {render_customerProfile()}
                            <h6 className="text-center text-white">Are you a business man? Let's create a profile for your business.</h6> 
                            <div className="text-center mt-2">
                                <button className="btn" onClick={this.setIsBusiness.bind(this)}><Icon className="fa fa-plus-circle" style={{ fontSize: 30, color: "white" }}/></button>
                            </div>
                        </div>}       
                    </div>
                )
            } else if(customerProfileExists===false && businessProfileExists===true && startCreateProfile===false){
                return (
                    <div>
                        {this.state.isCustomer===true ? <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                {render_submitCustomerForm()}
                            </div>
                            <div className="col-3"></div>
                        </div> : <div>
                            {render_BusinessProfile()}
                            <h6 className="text-center text-white">Are you also a customer? Let's create a customer profile for you.</h6> 
                            <div className="text-center mt-2">
                                <button className="btn" onClick={this.setIsCustomer.bind(this)}><Icon className="fa fa-plus-circle" style={{ fontSize: 30, color: "white" }}/></button>
                            </div>
                        </div>}
                    </div>
                )
            } else if(customerProfileExists===false && businessProfileExists===false){
                return (
                    <div className="container-fluid profile-container-bg py-3">
                    {this.state.startCreateProfile===false ? <div>
                        <div className="my-3">
                        <h6 className="text-center text-white">You don't have a user profile. Let's create one.</h6> 
                        <div className="text-center mt-2">
                            <button className="btn" onClick={this.setCreateProfile.bind(this)}><Icon className="fa fa-plus-circle" style={{ fontSize: 30, color: "white" }}/></button>
                        </div>
                    </div>
                    </div> : null}
                    {this.state.startCreateProfile===true ? <div>
                        {this.state.isCustomer===false && this.state.isBusiness===false ? <div>
                            <h6 className="text-center text-white">Choose an account type.</h6>
                            <div className="row justify-content-center">
                                {/* <div className="col-5"></div> */}
                                {/* <div className="col"> */}
                                    <button data-tip data-for="createCustomer" type="button" className="btn btn-light m-1" onClick={this.setIsCustomer.bind(this)}>Customer</button>
                                    <ReactTooltip id="createCustomer" place="bottom" effect="solid">
                                        A customer profile can be used to book appointments on available services
                                    </ReactTooltip>
                                {/* </div> */}
                                {/* <div className="col"> */}
                                    <button data-tip data-for="createBusiness" type="button" className="btn btn-light m-1" onClick={this.setIsBusiness.bind(this)}>Business</button>
                                    <ReactTooltip id="createBusiness" place="bottom" effect="solid">
                                        A business profile can be used to create new services and manage appointments
                                    </ReactTooltip>
                                {/* </div> */}
                                {/* <div className="col-5"></div> */}
                            </div>
                        </div> : null}
                        {this.state.isCustomer===true && this.state.isBusiness===false ? <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                {render_submitCustomerForm()}
                            </div>
                            <div className="col-3"></div>
                        </div> : null}
                        {this.state.isCustomer===false && this.state.isBusiness===true ? <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                {render_submitBusinessForm()}
                            </div>
                            <div className="col-3"></div>
                        </div> : null}
                    </div> : null}
                </div>
                )
            }
        }
        return (
            <div className="container-fluid profile-container-bg py-3">
                    {this.props.auth.isAuthenticated && this.props.auth.user ? 
                        <div>
                            {render_main()}
                            {render_EditCustomerModal()}
                            {render_EditBusinessModal()}
                        </div> : 
                        <div>
                            <h4>Hold on, you're not authenticated. Please log in and try again.</h4>
                        </div>
                    }
            </div>
        )
    }
}