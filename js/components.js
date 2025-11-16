// Component Rendering Functions

const Components = {
    renderHospitalsGrid() {
        const container = document.getElementById('hospitalsGrid');
        if (!container) return;

        container.innerHTML = DATA.hospitals.map(hospital => `
            <a href="${hospital.link}" style="text-decoration: none; color: inherit; cursor: pointer;">
                <div class="card" style="cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 64px; margin-bottom: 16px;">${hospital.logo}</div>
                    <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">${hospital.name}</h3>
                    <p style="color: #6b7280; margin-bottom: 12px;">${hospital.location}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                        ${hospital.accreditations.map(acc => `
                            <span style="padding: 4px 12px; background-color: #f0fdfa; color: #0d9488; font-size: 12px; font-weight: bold; border-radius: 4px;">
                                ${acc}
                            </span>
                        `).join('')}
                    </div>
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-weight: bold;">
                        <div>⭐ ${hospital.rating}/5.0</div>
                        <div>${hospital.patients} patients</div>
                    </div>
                </div>
            </a>
        `).join('');
    },

    renderHospitalsGrid2() {
        const container = document.getElementById('hospitalsGrid2');
        if (!container) return;

        container.innerHTML = DATA.hospitals.map(hospital => `
            <a href="${hospital.link}" style="text-decoration: none; color: inherit; cursor: pointer;">
                <div class="card" style="cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 64px; margin-bottom: 16px;">${hospital.logo}</div>
                    <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">${hospital.name}</h3>
                    <p style="color: #6b7280; margin-bottom: 12px;">${hospital.location}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                        ${hospital.accreditations.map(acc => `
                            <span style="padding: 4px 12px; background-color: #f0fdfa; color: #0d9488; font-size: 12px; font-weight: bold; border-radius: 4px;">
                                ${acc}
                            </span>
                        `).join('')}
                    </div>
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-weight: bold;">
                        <div>⭐ ${hospital.rating}/5.0</div>
                        <div>${hospital.patients} patients</div>
                    </div>
                </div>
            </a>
        `).join('');
    },

    renderTreatmentsGrid() {
        const container = document.getElementById('treatmentsGrid');
        if (!container) return;

        container.innerHTML = DATA.treatments.map(treatment => `
            <div class="card">
                <div style="font-size: 48px; margin-bottom: 16px;">${treatment.icon}</div>
                <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">${treatment.name}</h3>
                <p style="color: #6b7280; margin-bottom: 16px;">${treatment.description}</p>
                <div style="margin-bottom: 16px;">
                    <h4 style="font-weight: 600; font-size: 14px; color: #374151; margin-bottom: 8px;">Common Procedures:</h4>
                    <ul style="font-size: 14px; color: #6b7280;">
                        ${treatment.procedures.map(proc => `<li>• ${proc}</li>`).join('')}
                    </ul>
                </div>
                <a href="${treatment.link}" class="btn btn-secondary">Learn More</a>
            </div>
        `).join('');
    },

    renderTestimonials() {
        const container = document.getElementById('testimonialsGrid');
        if (!container) return;

        container.innerHTML = DATA.testimonials.map(testimonial => `
            <div class="card">
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 32px; margin-bottom: 12px;">${testimonial.flag}</div>
                    <h3 style="font-weight: bold; font-size: 18px;">${testimonial.name}</h3>
                    <p style="color: #6b7280; font-size: 14px;">${testimonial.country}</p>
                    <p style="color: #0d9488; font-size: 12px; font-weight: bold; margin-top: 8px;">${testimonial.treatment}</p>
                </div>
                <p style="color: #374151; font-style: italic; margin-bottom: 12px;">"${testimonial.quote}"</p>
                <div style="display: flex; gap: 4px;">
                    ${[...Array(testimonial.rating)].map(() => '<span style="color: #fbbf24;">⭐</span>').join('')}
                </div>
            </div>
        `).join('');
    },

    renderTranslators() {
        const container = document.getElementById('translatorsGrid');
        if (!container) return;

        container.innerHTML = DATA.translators.map(translator => `
            <div class="card" style="text-align: center;">
                <div style="font-size: 64px; margin-bottom: 16px;">👤</div>
                <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 4px;">${translator.name}</h3>
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">${translator.experience} experience</p>
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: center; gap: 4px; margin-bottom: 4px;">
                        ${[...Array(Math.floor(translator.rating))].map(() => '<span style="color: #fbbf24;">⭐</span>').join('')}
                    </div>
                    <p style="color: #374151; font-size: 14px;">${translator.rating}/5.0</p>
                </div>
                <div style="margin-bottom: 12px; padding: 12px; background-color: #f3f4f6; border-radius: 8px;">
                    <p style="font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Languages:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
                        ${translator.languages.map(lang => `
                            <span style="font-size: 12px; background-color: #f0fdfa; color: #0d9488; padding: 4px 8px; border-radius: 4px;">
                                ${lang}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; color: ${translator.status === 'Available' ? '#10b981' : '#f59e0b'};">
                    ${translator.status === 'Available' ? '✓ Available Now' : '⏳ Busy'}
                </div>
                <button class="btn btn-primary" style="width: 100%; font-size: 14px; padding: 10px 16px;">Chat Now</button>
            </div>
        `).join('');
    },

    renderBlog() {
        const container = document.getElementById('blogGrid');
        if (!container) return;

        container.innerHTML = DATA.blog.map(post => `
            <div class="card">
                <div style="width: 100%; height: 160px; background: linear-gradient(to right, #0d9488, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 48px; border-radius: 8px;">
                    📰
                </div>
                <div style="padding: 20px;">
                    <span style="display: inline-block; background-color: #f0fdfa; color: #0d9488; padding: 4px 12px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-bottom: 8px;">
                        ${post.category}
                    </span>
                    <p style="font-size: 12px; color: #9ca3af; margin-bottom: 8px;">${post.date}</p>
                    <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #111827;">${post.title}</h3>
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">${post.excerpt}</p>
                    <a href="${post.link}" class="btn btn-primary" style="width: 100%;">Learn More</a>
                </div>
            </div>
        `).join('');
    },

    renderFAQ() {
        const container = document.getElementById('faqContainer');
        if (!container) return;

        container.innerHTML = DATA.faq.map((category, catIndex) => `
            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">${category.category}</h3>
                <div style="display: grid; gap: 12px;">
                    ${category.questions.map((qa, qaIndex) => {
            const id = `faq-${catIndex}-${qaIndex}`;
            return `
                            <div class="faq-item">
                                <button class="faq-question" onclick="Components.toggleFAQ('${id}')">
                                    <span>${qa.q}</span>
                                    <span class="faq-toggle">▼</span>
                                </button>
                                <div class="faq-answer" id="${id}">
                                    <p>${qa.a}</p>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `).join('');
    },

    renderTimeline() {
        const container = document.getElementById('timeline');
        if (!container) return;

        container.innerHTML = DATA.timeline.map((item, index) => {
            const nodeClass = `timeline-node ${item.status}`;
            const nodeIcon = item.status === 'completed' ? '✓' : (item.status === 'in-progress' ? '⏳' : '○');

            return `
                <div class="timeline-item">
                    <div class="${nodeClass}">${nodeIcon}</div>
                    <div class="timeline-content">
                        <h3>${item.milestone}</h3>
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-description">${item.description}</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleFAQ(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('active');
            const toggle = element.previousElementSibling.querySelector('.faq-toggle');
            if (toggle) {
                toggle.classList.toggle('active');
            }
        }
    }
};
