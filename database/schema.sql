USE mysql;  -- Wrong DB!
DROP DATABASE IF EXISTS hospital_appointments;

CREATE DATABASE hospital_appointments;
USE hospital_appointments;

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(100),
  phone VARCHAR(15),
  email VARCHAR(100),
  age INT,
  specialization VARCHAR(50),
  disease TEXT,
  doctor_id VARCHAR(20),
  doctor_name VARCHAR(100),
  appointment_date DATE,
  appointment_time VARCHAR(10),
  status VARCHAR(20) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


 SELECT * FROM appointments;
SHOW TABLES;
