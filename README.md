# MediBook Appointment System

A full-stack hospital appointment booking system with real-time availability checking, automated email notifications, and intelligent alternative slot suggestions.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Overview

MediBook streamlines hospital appointment scheduling by providing patients with a seamless booking experience while automatically managing slot availability and sending confirmation emails through workflow automation.

## Key Features

- **Multi-step Form** - 3-step booking process with real-time validation
- **Real-time Availability** - Checks database before confirming appointments
- **Smart Suggestions** - Recommends alternative slots when unavailable
- **Automated Emails** - Instant HTML confirmation via Gmail
- **Responsive Design** - Works seamlessly on all devices

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+)  
**Backend:** n8n Workflow Automation  
**Database:** MySQL  
**Email Service:** Gmail API  

## Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Multi-step Booking Form
![Booking Form](screenshots/booking-form.png)

### Success Confirmation
![Success Message](screenshots/success-message.png)

### n8n Workflow Architecture
![n8n Workflow](screenshots/n8n-workflow.png)

## Project Structure

medibook-appointment-system/
├── database/
│ └── schema.sql
├── frontend/
│ ├── config/
│ │ └── config.js
│ ├── css/
│ │ ├── appointment.css
│ │ └── style.css
│ ├── js/
│ │ ├── appointment.js
│ │ └── main.js
│ ├── appointment.html
│ └── index.html
├── n8n-workflow/
│ └── appointment-workflow.json
├── screenshots/
└── README.md

