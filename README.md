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
│
├── database/
│ └── schema.sql # MySQL database schema
│
├── frontend/
│ ├── config/
│ │ └── config.js # n8n webhook URL configuration
│ │
│ ├── css/
│ │ ├── appointment.css # Appointment form styles
│ │ └── style.css # Homepage styles
│ │
│ ├── js/
│ │ ├── appointment.js # Booking form logic
│ │ └── main.js # Homepage JavaScript
│ │
│ ├── appointment.html # Booking page
│ └── index.html # Homepage
│
├── n8n-workflow/
│ └── appointment-workflow.json # n8n workflow export
│
├── screenshots/
│ ├── booking-form.png
│ ├── homepage.png
│ ├── n8n-workflow.png
│ └── success-message.png
│
├── .gitignore
└── README.md
## Quick Start

### Prerequisites

- Node.js v14+
- MySQL v5.7+
- n8n (latest)
- Gmail account with App Password

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/adigavhane1013/medibook-appointment-system.git
cd medibook-appointment-system
2. Setup Database

bash
mysql -u root -p < database/schema.sql
3. Configure n8n

Install: npm install n8n -g

Start: n8n start

Import workflow from n8n-workflow/appointment-workflow.json

Add MySQL and Gmail credentials

4. Start Frontend

bash
cd frontend
python -m http.server 8000
Open http://localhost:8000 in browser

Workflow Architecture
The system uses n8n to orchestrate the entire booking process:

Receives appointment data via webhook

Validates and formats input data

Checks MySQL for slot availability

If available: Inserts appointment → Sends email → Returns success

If booked: Calculates alternatives → Returns error with suggestions

API Response Format
Success:

json
{
  "success": true,
  "message": "Appointment booked successfully!",
  "appointmentId": "12345"
}
Slot Already Booked:

json
{
  "success": false,
  "message": "This slot is already booked!",
  "alternatives": [
    {"date": "2026-02-20", "time": "10:30 AM"},
    {"date": "2026-02-20", "time": "11:00 AM"}
  ]
}
Database Schema
The system uses a single appointments table with the following key fields:

Patient information (name, phone, email, age)

Medical details (specialization, disease description)

Appointment details (doctor, date, time, status)

Timestamps for record keeping

Indexes are added on doctor_id + appointment_date for fast availability checks.

Features Implemented
✅ Form validation (frontend & backend)
✅ Real-time slot availability checking
✅ Dynamic alternative slot calculation
✅ HTML email notifications
✅ MySQL data persistence
✅ Error handling & user feedback
✅ Responsive mobile design

Future Enhancements
SMS notifications via Twilio

Patient dashboard (view/cancel bookings)

Doctor dashboard with daily schedule

Admin panel with analytics

Payment gateway integration

Video consultation links

Testing
Test successful booking:

Fill form with valid data

Select available slot

Verify success modal and email delivery

Test double booking:

Book a specific slot

Try booking same slot again

Verify error modal shows alternative slots

Test validation:

Submit form with invalid data

Verify appropriate error messages appear

Contributing
Contributions are welcome! Feel free to:

Fork the repository

Create a feature branch

Submit a pull request

License
MIT License - feel free to use this project for learning or portfolio purposes.

Author
Aditya Gavhane

GitHub: @adigavhane1013

Acknowledgments
Built with n8n workflow automation, MySQL database, and Gmail API.

⭐ Star this repo if you find it helpful!

