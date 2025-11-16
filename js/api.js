// API and Form Handling

const API = {
    submitQuote(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const ticketId = Utils.generateTicketId();
                console.log('Quote submitted:', { ...formData, ticketId });
                resolve({ ticketId });
            }, 2000);
        });
    },

    submitContact(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Contact form submitted:', formData);
                resolve({ success: true });
            }, 1000);
        });
    }
};

// Form Validation
const FormValidator = {
    validateQuoteStep1(formData) {
        const errors = {};

        if (!formData.fullName.trim()) errors.fullName = 'Name is required';
        if (!formData.country) errors.country = 'Country is required';
        if (!formData.phone.trim()) errors.phone = 'Phone is required';
        else if (!Utils.validatePhone(formData.phone)) errors.phone = 'Invalid phone number';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!Utils.validateEmail(formData.email)) errors.email = 'Invalid email';

        return errors;
    },

    validateQuoteStep2(formData) {
        const errors = {};
        if (!formData.treatmentType) errors.treatmentType = 'Treatment type is required';
        return errors;
    },

    showErrors(errors, form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.textContent = '');

        Object.keys(errors).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.classList.add('error');
                const errorEl = input.parentElement.querySelector('.error-message');
                if (errorEl) errorEl.textContent = errors[key];
            }
        });
    },

    clearErrors(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.classList.remove('error'));
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.textContent = '');
    }
};
