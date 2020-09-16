import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import CalendarDisplay from './components/CalendarDisplay';
import ServicesList from './components/ServicesList';
import BusinessList from './components/BusinessList';
import BusinessDetails from './components/BusinessDetails';
import BusinessServiceDetails from './components/BusinessServiceDetails';
import CustomerCalendar from './components/CustomerCalendar';
import BookingEditForm from './components/BookingEditForm';
import BookingDetail from './components/BookingDetail';
library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      console.log(user)
    }catch(error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirm" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              <Route exact path="/userprofile" render={(props) => <UserProfile {...props} auth={authProps} />} />
              <Route exact path="/calendar" render={(props) => <CalendarDisplay {...props} auth={authProps} />} />
              <Route exact path="/service" render={(props) => <ServicesList {...props} auth={authProps} />} />
              <Route exact path="/business" render={(props) => <BusinessList {...props} auth={authProps} />} />
              <Route exact path="/mycalendar" render={(props) => <CustomerCalendar {...props} auth={authProps} />} />
              <Route exact path="/business/:id" render={(props) => <BusinessDetails {...props} auth={authProps} />} />
              <Route exact path="/service/:id" render={(props) => <BusinessServiceDetails {...props} auth={authProps} /> } />
              <Route exact path="/bookingeditform/:id" render={(props) => <BookingEditForm {...props} auth={authProps} />} />
              <Route exact path="/booking/:id" render={(props) => <BookingDetail {...props} auth={authProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
