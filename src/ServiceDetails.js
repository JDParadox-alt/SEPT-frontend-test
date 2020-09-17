import React, { Component } from 'react';
import axios from 'axios';

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class ServiceDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id: {},
            service:[],
            businessName: [],
            description: '',
            workingHours: {},
            employees: []
        }
    }
    componentDidMount(){
        this.fetchData();
        console.log("Receive Prop: ", this.state.service);
        window.scrollTo(0,0);
    }
    fetchData(){
        const url=`${API_URL}/businessServices/${this.props.id}`;
        fetch(url)
            .then(res=>res.json())
            .then((json)=>this.setState({service: json}))
    }

    render() {
        return (
            <div>
                <div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content />
  <meta name="author" content />
  <title>Scrolling Nav - Start Bootstrap Template</title>
  {/* Bootstrap core CSS */}
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  {/* Custom styles for this template */}
  <link href="css/scrolling-nav.css" rel="stylesheet" />
  {/* Navigation */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#services">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header className="bg-primary text-white">
    <div className="container text-center">
      <h1>Welcome to -{this.state.service.name}-</h1>
      <p className="lead">Powered by Online Booking System RMIT</p>
    </div>
  </header>
  <section id="about">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2>Responsible individuals</h2>
          <p className="lead">List of employees in charge:</p>
          <ul>
            <li>{this.state.service.employees}</li>
            <li>-Employee2-</li>
            <li>-Employee3-</li>
            <li>-Employee4-</li>
          </ul>
        </div>
      </div>
    </div>  
  </section>
  <section id="services" className="bg-light">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2>About services we offer</h2>
          <p className="lead">{this.state.service.description}</p>
        </div>
      </div>
    </div>
  </section>
  <section id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2>Working Hours</h2>
          <p className="lead">We are happy to see you in below hours:</p>
          <ul>
            <li>{this.state.service.workingHours}</li>
            <li>-Working2-</li>
            <li>-Working3-</li>
            <li>-Working4-</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="py-5 bg-dark">
    <div className="container">
      <p className="m-0 text-center text-white">Copyright © Your Website 2020</p>
    </div>
    {/* /.container */}
  </footer>
  {/* Bootstrap core JavaScript */}
  {/* Plugin JavaScript */}
  {/* Custom JavaScript for this theme */}
</div>

            </div>
        )
    }
}
