// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Render all components
    Components.renderHospitalsGrid();
    Components.renderHospitalsGrid2();
    Components.renderTreatmentsGrid();
    Components.renderTestimonials();
    Components.renderTranslators();
    Components.renderBlog();
    Components.renderFAQ();
    Components.renderTimeline();

    // Setup event listeners
    setupNavigation();
    setupQuoteModal();
    // setupLanguageSwitcher();
    setupContactForm();
    setupMobileMenu();
    setupSmoothScroll();

    // Track page view
    Utils.trackEvent('page_view');
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const href = link.getAttribute('href');
            Utils.smoothScroll(href.substring(1));
        });
    });
}

// Quote Modal
function setupQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const getQuoteBtns = document.querySelectorAll('#getQuoteBtn, #getQuoteNavBtn');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('quoteForm');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    let currentStep = 1;

    // Open modal
    getQuoteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            currentStep = 1;
            updateFormStep(1);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    closeSuccessBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        form.reset();
    });

    // Modal click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        const formData = getFormData();
        let errors = {};

        if (currentStep === 1) {
            errors = FormValidator.validateQuoteStep1(formData);
        } else if (currentStep === 2) {
            errors = FormValidator.validateQuoteStep2(formData);
        }

        if (Object.keys(errors).length === 0) {
            if (currentStep < 3) {
                currentStep++;
                updateFormStep(currentStep);
            } else {
                submitQuote(formData);
            }
        } else {
            FormValidator.showErrors(errors, form);
        }
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormStep(currentStep);
            FormValidator.clearErrors(form);
        }
    });

    // File upload
    setupFileUpload();

    // Language options
    setupLanguageOptions();

    function updateFormStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.step-indicator').forEach(s => s.classList.remove('active'));

        // Show current step
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.step-indicator[data-step="${step}"]`).classList.add('active');

        // Update step label
        document.getElementById('currentStep').textContent = step;

        // Update buttons
        if (step === 1) {
            prevBtn.style.display = 'none';
            nextBtn.textContent = 'Next →';
        } else if (step === 3) {
            prevBtn.style.display = 'block';
            nextBtn.textContent = 'Submit Request';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.textContent = 'Next →';
        }

        // Hide form navigation on success
        if (step === 4) {
            document.querySelector('.form-navigation').style.display = 'none';
        } else {
            document.querySelector('.form-navigation').style.display = 'flex';
        }
    }

    function getFormData() {
        return {
            fullName: form.querySelector('[name="fullName"]').value,
            country: form.querySelector('[name="country"]').value,
            phone: form.querySelector('[name="phone"]').value,
            email: form.querySelector('[name="email"]').value,
            treatmentType: form.querySelector('[name="treatmentType"]').value,
            medicalReport: form.querySelector('[name="medicalReport"]').files || null,
            description: form.querySelector('[name="description"]').value,
            preferredLanguage: form.querySelector('[name="preferredLanguage"]').value,
            contactMethod: form.querySelector('[name="contactMethod"]:checked').value
        };
    }

    async function submitQuote(formData) {
        nextBtn.disabled = true;
        nextBtn.textContent = 'Submitting...';

        try {
            const result = await API.submitQuote(formData);
            
            // Show success screen
            currentStep = 4;
            updateFormStep(currentStep);
            document.getElementById('ticketId').textContent = result.ticketId;
            
            // Track event
            Utils.trackEvent('quote_submitted', {
                treatment_type: formData.treatmentType,
                country: formData.country,
                ticket_id: result.ticketId
            });

        } catch (error) {
            alert('Error submitting quote. Please try again.');
        } finally {
            nextBtn.disabled = false;
            nextBtn.textContent = 'Submit Request';
        }
    }

    function setupFileUpload() {
        const fileInput = form.querySelector('[name="medicalReport"]');
        const fileUpload = form.querySelector('.file-upload');

        fileUpload.addEventListener('click', () => fileInput.click());
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = '#0d9488';
        });
        fileUpload.addEventListener('dragleave', () => {
            fileUpload.style.borderColor = '#d1d5db';
        });
        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = '#d1d5db';
            fileInput.files = e.dataTransfer.files;
            updateFileDisplay();
        });

        fileInput.addEventListener('change', updateFileDisplay);

        function updateFileDisplay() {
            const fileName = form.querySelector('.file-name');
            if (fileInput.files) {
                fileName.textContent = `✓ ${fileInput.files.name}`;
            } else {
                fileName.textContent = '';
            }
        }
    }

    function setupLanguageOptions() {
        const langOptions = form.querySelectorAll('.lang-option');
        const hiddenInput = form.querySelector('[name="preferredLanguage"]');

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                hiddenInput.value = option.textContent.trim().split(' ') || option.textContent.trim();
            });
        });
    }
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.querySelector('input[placeholder*="name"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            message: contactForm.querySelector('textarea').value
        };

        try {
            await API.submitContact(formData);
            alert('Message sent successfully! We will contact you soon.');
            contactForm.reset();
            Utils.trackEvent('contact_form_submitted');
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
    });
}

// Language Switcher
// function setupLanguageSwitcher() {
//     const switcher = document.getElementById('languageSwitcher');
//     if (!switcher) return;

//     const langBtn = switcher.querySelector('.lang-btn');
//     const dropdown = switcher.querySelector('.lang-dropdown');

//     langBtn.addEventListener('click', () => {
//         dropdown.classList.toggle('active');
//     });

//     const langOptions = dropdown.querySelectorAll('button');
//     langOptions.forEach(option => {
//         option.addEventListener('click', () => {
//             const lang = option.getAttribute('data-lang');
//             langBtn.textContent = option.textContent;
//             dropdown.classList.remove('active');
            
//             if (lang === 'ar') {
//                 document.documentElement.lang = 'ar';
//                 document.documentElement.dir = 'rtl';
//             } else {
//                 document.documentElement.lang = lang;
//                 document.documentElement.dir = 'ltr';
//             }

//             alert(`Language changed to ${option.textContent}. Full translation coming soon.`);
//             Utils.trackEvent('language_changed', { language: lang });
//         });
//     });

//     // Close dropdown when clicking outside
//     document.addEventListener('click', (e) => {
//         if (!switcher.contains(e.target)) {
//             dropdown.classList.remove('active');
//         }
//     });
// }

// Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId) {
                Utils.smoothScroll(targetId);
            }
        });
    });
}

// Analytics
// if (window.location.hostname !== 'localhost') {

//     // --- Google Analytics 4 ---
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
//     document.head.appendChild(script);

//     window.dataLayer = window.dataLayer || [];
//     function gtag(){ dataLayer.push(arguments); }
//     gtag('js', new Date());
//     gtag('config', 'G-XXXXXXXXXX');
//     window.gtag = gtag;


//     // --- Facebook Pixel (fixed version) ---
//     !(function(f, b, e, v, n, t, s) {
//         if (f.fbq) return;
//         n = f.fbq = function() {
//             n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//         };
//         if (!f._fbq) f._fbq = n;
//         n.push = n;
//         n.loaded = !0;
//         n.version = "2.0";
//         n.queue = [];

//         t = b.createElement(e);
//         t.async = !0;
//         t.src = v;

//         s = b.getElementsByTagName(e)[0];   // FIXED (your code was missing [0])
//         s.parentNode.insertBefore(t, s);    // FIXED
//     })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

//     fbq("init", "YOUR_PIXEL_ID");
//     fbq("track", "PageView");
//     window.fbq = fbq;
// }