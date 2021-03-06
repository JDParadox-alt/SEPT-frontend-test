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
                    <div className="container emp-profile">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                    {/* <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                                <input type="file" name="file" />
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="profile-head">
                                    <h5>{this.state.business.name}</h5>
                                    <h6>{this.state.name}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3" />
                            <div className="col-md-9">

                            </div>
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