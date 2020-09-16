import React from 'react';

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL

export default function Hero() {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          {/* <img className="bg-hero-img" src={require('./assets/img/bg-masthead.jpg')} /> */}
          <img className="bg-hero-img" src={process.env.PUBLIC_URL + "/bg-masthead.jpg"} alt="Masthead" />
        </div>
      </div>
    </section>
  )
}
