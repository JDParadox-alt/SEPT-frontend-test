import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { get } from 'jquery';

export default class BusinessDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            found: "loading",
            id:0,
            name: "",
            email:"",
            services:[],
            description:"",
            phone:"",
            address:""
        }
    }
    getBusinessDetails(){
        console.log(this.props.match.params.id)
        fetch(`http://localhost:8080/api/businesses/${this.props.match.params.id}`)
        .then(res => {
            if (res.ok){
                this.setState({found : "found"})
                return res.json()
            }
            else {
                console.log(res.ok + " | Shite. It's fucked. Check your URL params?")
                this.setState({found : "notFound"})
            }
        })
        .then(json => {
            if (this.state.found === "found"){
                console.log(json)
                this.setState({id:json.id})
                this.setState({name:json.name})
                this.setState({email:json.email})
                this.setState({services:json.businessServices})
                this.setState({description:json.description})
                this.setState({phone:json.phone})
                this.setState({address:json.address})
                console.log(this.state)
            }
            
        })
    }
    componentDidMount(){
        this.getBusinessDetails()
    }
    render() {
        const render_business = ()=>{
            if (this.state.found === "loading"){
                return (
                    <div className="container emp-profile" style={{textAlign: 'center'}}>
                        <h3>The page is still loading.</h3>
                    </div>
                )
            }
            else if (this.state.found === "notFound") {
                return (
                    <div className="container emp-profile" style={{textAlign: 'center'}}>
                        <h3>An error occured while loading the page. Please try again.</h3>
                    </div>
                )
            }
            else {
                return (
                    <div className="container emp-profile">
                        <div className="row">
                                    <div className="col-md-3">
                                        <div className="profile-img">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                            <div className="file btn btn-lg btn-primary">
                                                Change Photo
                                                <input type="file" name="file" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="profile-head">
                                            <h5>
                                                {this.state.name}
                                            </h5>
                                            {/* <h6>
                                                Web Developer and Designer
                                            </h6> */}
                                            {/* <p className="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Services</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3"/>
                                    <div className="col-md-9">
                                        <div className="tab-content profile-tab" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.email}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Description</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.description}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Phone</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Address</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{this.state.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            {this.state.services.length !== 0?
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.services.map((service) =>
                                                            <tr key={service.id} href={`/services/${service.id}`}>
                                                                <th scope="row">{service.id}</th>
                                                                <td><a href={`/services/${service.id}`}>{service.name? service.name : 'Placeholder'}</a></td>
                                                                <td>{service.description}</td>
                                                            </tr>
                                                        )}
                                                    </tbody> 
                                                </table>:
                                                <h6>This business does not offer any services yet</h6>
                                            }
                                        </div>
                                    </div>
                                </div>
                                </div>
                    </div>
                )
            }
            
        }
        return (
            <div>
                {this.props.auth.isAuthenticated && this.props.auth.user ? <div className="container-fluid profile-container-bg py-3">
                    {render_business()}
                </div> : null}
            </div>
        )
    }
}