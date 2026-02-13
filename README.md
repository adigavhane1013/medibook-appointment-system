# 🏥 Hospital Appointment Booking System

A full-stack web application for managing hospital appointments with real-time availability checking, automated email confirmations, and intelligent slot recommendations.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **Multi-step Booking Form**: User-friendly 3-step appointment booking process
- **Real-time Availability**: Checks actual database availability before booking
- **Smart Alternatives**: Suggests available time slots when requested slot is booked
- **Email Confirmations**: Automated HTML email notifications via Gmail
- **Doctor Management**: Multiple doctors across 9+ specializations
- **Data Validation**: Frontend and backend validation for all inputs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive UI with modern design patterns

### Backend
- **n8n** - Workflow automation platform
- **MySQL** - Database for appointment storage
- **Gmail API** - Email notifications

### Key Technologies
- REST API (n8n webhooks)
- SQL queries with parameterized inputs
- JavaScript async/await patterns

## 📋 Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)
- n8n (latest version)
- Gmail account with App Password enabled

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/hospital-appointment-system.git
cd hospital-appointment-system
