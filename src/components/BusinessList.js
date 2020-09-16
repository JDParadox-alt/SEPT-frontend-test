import React, { Component } from 'react'
import { Card, CardContent, Divider, Grid, Paper, makeStyles, Box } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
// import classes from '*.module.css';

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    }
}));

// const BusinessCard = (props) => {
//     const styles = useStyles();
//     return(
//         <Card className={styles.card}>
// <CardContent>
//     <h3></h3>
// </CardContent>
//         </Card>
//     )
// }


export default class BusinessList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: []
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/businesses/`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({ businesses: json })
                console.log(this.state)
            })
    }

    render() {
        var { businesses } = this.state;

        return (
            <div className="container-fluid profile-container-bg py-3"> 
                <div className="container emp-profile">

                <h1 style={{ textAlign: "center" }}> Business List</h1>
                        <div className="card my-3">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {businesses.map(business => (
                                        <tr key={business.id}>
                                            <td>{business.name}</td>
                                            <td>{business.description}</td>
                                            <td>{business.id}</td>
                                            <td>
                                                <NavLink to={'business/' + business.id}>
                                                    View Details
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
            </div>
            </div>
        )
    }
}
