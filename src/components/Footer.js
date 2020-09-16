import React from 'react'

require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
           Appointment Booking App 2020.
        </p>
      </div>
    </footer>
  )
}
