// Utility Functions

const Utils = {
    generateTicketId() {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return `CBG-${year}-${randomNum}`;
    },

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    showNotification(message, type = 'success') {
        alert(message);
    },

    smoothScroll(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    trackEvent(eventName, params = {}) {
        // Track event for analytics
        if (window.gtag) {
            window.gtag('event', eventName, params);
        }
        if (window.fbq) {
            window.fbq('track', eventName, params);
        }
        console.log('Event tracked:', eventName, params);
    }
};

// Data
const DATA = {
    hospitals: [
        {
            id: '1',
            name: 'Apollo Hospitals',
            location: 'Delhi, Mumbai, Chennai',
            logo: '🏥',
            accreditations: ['JCI Accredited', 'NABH Certified'],
            specialties: ['Cardiology', 'Oncology', 'Transplants'],
            rating: 4.9,
            patients: '15,000+',
            link: 'hospitals/apollo.html'
        },
        {
            id: '2',
            name: 'Fortis Healthcare',
            location: 'Bangalore, Gurgaon, Noida',
            logo: '⚕️',
            accreditations: ['JCI Accredited', 'ISO 9001'],
            specialties: ['Orthopedics', 'Neurology', 'Gastroenterology'],
            rating: 4.8,
            patients: '12,000+',
            link: 'hospitals/fortis.html'
        },
        {
            id: '3',
            name: 'Max Healthcare',
            location: 'Delhi NCR, Mohali',
            logo: '🏨',
            accreditations: ['JCI Accredited', 'NABH Certified'],
            specialties: ['Fertility', 'Oncology', 'Cardiac Care'],
            rating: 4.7,
            patients: '10,000+',
            link: 'hospitals/max.html'
        }
    ],

    treatments: [
        {
            id: '1',
            name: 'Cardiology',
            icon: '❤️',
            description: 'Advanced heart surgeries and cardiac care',
            procedures: ['Bypass Surgery', 'Valve Replacement', 'Angioplasty'],
            link: 'treatments/cardiology.html'
        },
        {
            id: '2',
            name: 'Oncology',
            icon: '🎗️',
            description: 'Comprehensive cancer diagnosis and treatment',
            procedures: ['Chemotherapy', 'Radiation', 'Surgical Oncology'],
            link: 'treatments/oncology.html'
        },
        {
            id: '3',
            name: 'Orthopedics',
            icon: '🦴',
            description: 'Joint replacement and bone surgeries',
            procedures: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery'],
            link: 'treatments/orthopedics.html'
        },
        {
            id: '4',
            name: 'Fertility & IVF',
            icon: '👶',
            description: 'Advanced fertility treatments and IVF',
            procedures: ['IVF', 'ICSI', 'Surrogacy'],
            link: 'treatments/fertility.html'
        },
        {
            id: '5',
            name: 'Transplants',
            icon: '🫀',
            description: 'Organ transplantation services',
            procedures: ['Liver Transplant', 'Kidney Transplant', 'Heart Transplant'],
            link: 'treatments/transplants.html'
        },
        {
            id: '6',
            name: 'Cosmetic Surgery',
            icon: '✨',
            description: 'Aesthetic and reconstructive procedures',
            procedures: ['Hair Transplant', 'Rhinoplasty', 'Liposuction'],
            link: 'treatments/cosmetic.html'
        }
    ],

    testimonials: [
        {
            id: '1',
            name: 'Ahmed Al-Rashid',
            country: 'UAE',
            flag: '🇦🇪',
            quote: 'CareBridge Global made my heart surgery journey seamless. From visa to recovery, everything was perfectly coordinated.',
            rating: 5,
            treatment: 'Heart Surgery'
        },
        {
            id: '2',
            name: 'Fatima Rahman',
            country: 'Bangladesh',
            flag: '🇧🇩',
            quote: 'Excellent care and support throughout my IVF treatment. The translator helped me communicate with doctors effectively.',
            rating: 5,
            treatment: 'IVF Treatment'
        },
        {
            id: '3',
            name: 'John Okonkwo',
            country: 'Nigeria',
            flag: '🇳🇬',
            quote: 'Affordable, world-class cancer treatment with personal attention. I am grateful to CareBridge Global for their support.',
            rating: 5,
            treatment: 'Cancer Treatment'
        }
    ],

    translators: [
        {
            id: '1',
            name: 'Dr. Amira Hassan',
            languages: ['English', 'Arabic', 'Hindi'],
            rating: 4.9,
            status: 'Available',
            experience: '8 years'
        },
        {
            id: '2',
            name: 'Rashid Ahmed',
            languages: ['English', 'Arabic', 'Urdu'],
            rating: 4.8,
            status: 'Available',
            experience: '6 years'
        },
        {
            id: '3',
            name: 'Fatima Khan',
            languages: ['English', 'Bengali', 'Hindi'],
            rating: 4.9,
            status: 'Available',
            experience: '10 years'
        },
        {
            id: '4',
            name: 'Abdul Rahman',
            languages: ['English', 'Arabic', 'French'],
            rating: 4.7,
            status: 'Busy',
            experience: '5 years'
        }
    ],

    faq: [
        {
            category: 'About CareBridge',
            questions: [
                {
                    q: 'What is CareBridge Global?',
                    a: 'CareBridge Global is a medical tourism facilitator that connects international patients with India\'s top hospitals, providing end-to-end care coordination including visa assistance, translator services, accommodation, and travel arrangements.'
                },
                {
                    q: 'Which countries do you serve?',
                    a: 'We primarily serve patients from Arabic-speaking countries, Bangladesh, and African nations, but welcome patients from all countries seeking quality medical care in India.'
                }
            ]
        },
        {
            category: 'Costs & Payments',
            questions: [
                {
                    q: 'How much do your services cost?',
                    a: 'Our coordination services are free for patients. You only pay for medical treatment, travel, and accommodation. We help you get the best prices from our partner hospitals.'
                },
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept international wire transfers, credit cards (Visa, Mastercard), and digital payment platforms. Hospital payments can be made in installments.'
                }
            ]
        },
        {
            category: 'Visa & Travel',
            questions: [
                {
                    q: 'Do you help with medical visa?',
                    a: 'Yes, we provide complete visa assistance including invitation letters from hospitals, documentation support, and guidance through the application process.'
                },
                {
                    q: 'Can I bring a companion?',
                    a: 'Yes, we arrange accommodation and services for one companion at no extra coordination fee.'
                }
            ]
        }
    ],

    blog: [
        {
            id: '1',
            title: 'Top 5 Hospitals in India for Heart Surgery',
            excerpt: 'Discover India\'s leading cardiac care centers offering world-class heart surgery at affordable prices with the latest technology.',
            date: 'Nov 10, 2025',
            category: 'Cardiology',
            link: 'blog/heart-surgery.html'
        },
        {
            id: '2',
            title: 'Medical Visa Guide for International Patients',
            excerpt: 'Step-by-step guide to obtaining a medical visa for treatment in India, including required documents and processing times.',
            date: 'Nov 5, 2025',
            category: 'Travel'
        },
        {
            id: '3',
            title: 'Why Choose India for IVF Treatment',
            excerpt: 'Explore why India has become a top destination for fertility treatment with high success rates and affordable packages.',
            date: 'Oct 28, 2025',
            category: 'Fertility'
        }
    ],

    timeline: [
        {
            milestone: 'Visa Processing',
            status: 'completed',
            date: '2025-11-01',
            description: 'Medical visa approved'
        },
        {
            milestone: 'Flight Booking',
            status: 'completed',
            date: '2025-11-15',
            description: 'Flight confirmed - Emirates EK-512'
        },
        {
            milestone: 'Hotel Booking',
            status: 'completed',
            date: '2025-11-15',
            description: 'Stay confirmed at patient hotel near hospital'
        },
        {
            milestone: 'Hospital Appointment',
            status: 'in-progress',
            date: '2025-11-20',
            description: 'Initial consultation scheduled with Dr. Sharma'
        },
        {
            milestone: 'Medical Procedure',
            status: 'pending',
            date: '2025-11-25',
            description: 'Surgery date (tentative)'
        },
        {
            milestone: 'Follow-up Care',
            status: 'pending',
            date: '2025-12-05',
            description: 'Post-operative check-up'
        }
    ]
};
