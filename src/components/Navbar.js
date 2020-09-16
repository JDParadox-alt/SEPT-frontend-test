import React, { Component, Fragment } from 'react'
import { Auth } from 'aws-amplify';

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL
export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={process.env.PUBLIC_URL + "/app-logo.png"} width="112" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            {/* <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a> */}
            {this.props.auth.isAuthenticated && this.props.auth.user && (
              <Fragment>
                <a href="/business" className="navbar-item">
                  Businesses
                </a>
                <a href="/service" className="navbar-item">
                  Services
                </a>
                <a href="/mycalendar" className="navbar-item">
                  My Calendar
                </a>
              </Fragment>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <a href="/userprofile" className="navbar-item">
                  Hello {this.props.auth.user.username}
                </a>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                  <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
