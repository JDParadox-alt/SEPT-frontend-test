import React, { Component } from 'react';

export default class BusinessServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            found: "loading",
            id:0,
            name: "",
            business: {},
            description: "",
            workingHours: [],
            employees: [],
            bookings: []
        }
    }

    getBusinessServiceDetails(){
        console.log(this.props.match.params.id)
        fetch(`http://localhost:8080/api/businessServices/${this.props.match.params.id}`)
        .then(res => {
            if (res.ok){
                this.setState({found: "found"})
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
                this.setState({business:json.business})
                this.setState({description:json.description})
                this.setState({workingHours:json.workingHours})
                this.setState({employees:json.employees})
                this.setState({bookings:json.bookings})
            }
        })
    }
    componentDidMount(){
        this.getBusinessServiceDetails()
    }
    render(){

    }

}