// Configuration - will be loaded from config.js
let N8N_WEBHOOK_URL = '';

// Doctor data by specialization
const doctorsBySpecialization = {
    cardiology: [
        { id: 'dr_rajesh', name: 'Dr. Rajesh Kumar', specialization: 'Cardiologist' },
        { id: 'dr_anita', name: 'Dr. Anita Verma', specialization: 'Cardiologist' }
    ],
    neurology: [
        { id: 'dr_priya', name: 'Dr. Priya Sharma', specialization: 'Neurologist' },
        { id: 'dr_vikram', name: 'Dr. Vikram Singh', specialization: 'Neurologist' }
    ],
    orthopedics: [
        { id: 'dr_amit', name: 'Dr. Amit Patel', specialization: 'Orthopedic Surgeon' },
        { id: 'dr_suresh', name: 'Dr. Suresh Mehta', specialization: 'Orthopedic Surgeon' }
    ],
    pediatrics: [
        { id: 'dr_sneha', name: 'Dr. Sneha Desai', specialization: 'Pediatrician' },
        { id: 'dr_kavita', name: 'Dr. Kavita Reddy', specialization: 'Pediatrician' }
    ],
    dermatology: [
        { id: 'dr_meera', name: 'Dr. Meera Iyer', specialization: 'Dermatologist' }
    ],
    ent: [
        { id: 'dr_rohit', name: 'Dr. Rohit Kapoor', specialization: 'ENT Specialist' }
    ],
    ophthalmology: [
        { id: 'dr_arun', name: 'Dr. Arun Joshi', specialization: 'Ophthalmologist' }
    ],
    dental: [
        { id: 'dr_pooja', name: 'Dr. Pooja Malhotra', specialization: 'Dentist' }
    ],
    general: [
        { id: 'dr_ravi', name: 'Dr. Ravi Shankar', specialization: 'General Physician' },
        { id: 'dr_deepa', name: 'Dr. Deepa Nair', specialization: 'General Physician' }
    ]
};

// Time slots
const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM'
];

// Current step tracker
let currentStep = 1;

// Form validation functions
function validateName(name) {
    return name.trim().length >= 3;
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return age >= 1 && age <= 120;
}

// Step navigation functions
function nextStep(step) {
    if (validateStep(step)) {
        document.getElementById(`step${step}`).classList.remove('active');
        currentStep = step + 1;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgressIndicator();
        document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateProgressIndicator();
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Validate each step
function validateStep(step) {
    let isValid = true;
    
    if (step === 1) {
        const name = document.getElementById('patientName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        if (!validateName(name)) {
            showError('nameError', 'Please enter a valid name (minimum 3 characters)');
            isValid = false;
        } else {
            clearError('nameError');
        }

        if (!validatePhone(phone)) {
            showError('phoneError', 'Please enter a valid 10-digit mobile number');
            isValid = false;
        } else {
            clearError('phoneError');
        }

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('emailError');
        }

        if (!validateAge(age)) {
            showError('ageError', 'Please enter a valid age (1-120)');
            isValid = false;
        } else {
            clearError('ageError');
        }
    } else if (step === 2) {
        const specialization = document.getElementById('specialization').value;
        const disease = document.getElementById('disease').value;
        const doctor = document.getElementById('doctor').value;

        if (!specialization) {
            showError('specializationError', 'Please select a specialization');
            isValid = false;
        } else {
            clearError('specializationError');
        }

        if (disease.trim().length < 10) {
            showError('diseaseError', 'Please provide more details (minimum 10 characters)');
            isValid = false;
        } else {
            clearError('diseaseError');
        }

        if (!doctor) {
            showError('doctorError', 'Please select a doctor');
            isValid = false;
        } else {
            clearError('doctorError');
        }
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.previousElementSibling.classList.add('error');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
    errorElement.previousElementSibling.classList.remove('error');
}

// Populate doctors based on specialization
document.getElementById('specialization').addEventListener('change', function() {
    const specialization = this.value;
    const doctorSelect = document.getElementById('doctor');
    doctorSelect.innerHTML = '<option value="">Select a doctor</option>';
    
    if (specialization && doctorsBySpecialization[specialization]) {
        doctorsBySpecialization[specialization].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} (${doctor.specialization})`;
            doctorSelect.appendChild(option);
        });
        doctorSelect.disabled = false;
    } else {
        doctorSelect.innerHTML = '<option value="">Select specialization first</option>';
        doctorSelect.disabled = true;
    }
});

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('appointmentDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
});

// Populate time slots when date is selected
document.getElementById('appointmentDate').addEventListener('change', function() {
    const timeSelect = document.getElementById('appointmentTime');
    timeSelect.innerHTML = '<option value="">Select a time slot</option>';
    
    if (this.value) {
        timeSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
        timeSelect.disabled = false;
    } else {
        timeSelect.innerHTML = '<option value="">Select date first</option>';
        timeSelect.disabled = true;
    }
    
    // Hide availability message when date changes
    const messageDiv = document.getElementById('availabilityMessage');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
});

// REMOVED FAKE AVAILABILITY CHECK - backend handles this
document.getElementById('appointmentTime').addEventListener('change', function() {
    const messageDiv = document.getElementById('availabilityMessage');
    if (messageDiv) {
        // Show simple message - real check happens on submit
        messageDiv.className = 'availability-message available';
        messageDiv.innerHTML = '✓ Great! This slot is available.';
        messageDiv.style.display = 'block';
    }
});

// Form submission
document.getElementById('appointmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    
    if (!date) {
        showError('dateError', 'Please select an appointment date');
        return;
    }
    clearError('dateError');
    
    if (!time) {
        showError('timeError', 'Please select a time slot');
        return;
    }
    clearError('timeError');
    
    // Collect form data
    const formData = {
        patientName: document.getElementById('patientName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        specialization: document.getElementById('specialization').value,
        disease: document.getElementById('disease').value,
        doctorId: document.getElementById('doctor').value,
        doctorName: document.getElementById('doctor').options[document.getElementById('doctor').selectedIndex].text,
        appointmentDate: date,
        appointmentTime: time,
        submittedAt: new Date().toISOString()
    };
    
    showLoading();
    
    try {
        const webhookUrl = window.N8N_CONFIG?.WEBHOOK_URL || 'http://localhost:5678/webhook/appointment-booking';
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        hideLoading();
        
        if (result.success) {
            showSuccessModal(result, formData);
        } else {
            showErrorModal(result, formData);
        }
        
    } catch (error) {
        hideLoading();
        console.error('Booking error:', error);
        showErrorModal({
            success: false,
            message: 'Unable to process your booking. Please try again.',
            alternatives: []
        }, formData);
    }
});

function showLoading() {
    document.getElementById('loadingSpinner').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.remove('show');
}

function showSuccessModal(result, formData) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    const detailsElement = document.getElementById('appointmentDetails');
    
    messageElement.textContent = result.message || 'Your appointment has been booked successfully!';
    
    const appointmentDate = new Date(formData.appointmentDate);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    
    detailsElement.innerHTML = `
        <p><strong>Appointment ID:</strong> ${result.appointmentId || 'N/A'}</p>
        <p><strong>Patient Name:</strong> ${formData.patientName}</p>
        <p><strong>Doctor:</strong> ${formData.doctorName}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formData.appointmentTime}</p>
    `;
    
    modal.classList.add('show');
}

function showErrorModal(result, formData) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    const alternativesElement = document.getElementById('alternativeSlots');
    
    messageElement.textContent = result.message || 'This slot is already booked!';
    
    if (result.alternatives && result.alternatives.length > 0) {
        alternativesElement.innerHTML = `
            <h4>Available Alternative Slots:</h4>
            ${result.alternatives.map(alt => {
                const altDate = new Date(alt.date);
                const formattedDate = altDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                });
                return `<p><strong>${formattedDate}</strong> at ${alt.time}</p>`;
            }).join('')}
        `;
    } else {
        alternativesElement.innerHTML = '<p>Please try selecting a different date or time.</p>';
    }
    
    modal.classList.add('show');
}

function closeModal() {
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    
    successModal.classList.remove('show');
    errorModal.classList.remove('show');
    
    // Reset form if success modal was closed
    if (document.getElementById('appointmentDetails').innerHTML !== '') {
        setTimeout(() => {
            const form = document.getElementById('appointmentForm');
            form.reset();
            currentStep = 1;
            document.querySelectorAll('.form-step').forEach((step, index) => {
                step.classList.remove('active');
                if (index === 0) step.classList.add('active');
            });
            updateProgressIndicator();
            document.getElementById('doctor').disabled = true;
            document.getElementById('appointmentTime').disabled = true;
            document.getElementById('appointmentDetails').innerHTML = '';
        }, 300);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    if (event.target === successModal || event.target === errorModal) {
        closeModal();
    }
}
