// Hybrid Dynamic & Static FAQ Rendering Logic
// This script supports:
// 1. Static HTML FAQs (Great for SEO and editing directly in HTML without JS knowledge)
// 2. Dynamic JS Array FAQs (Maintains 100% backward compatibility for all pages)
function renderFAQs() {
    const container = document.querySelector('.faq-container');
    if (!container) return;

    // Check if container already has static HTML markup for FAQs (.faq-item)
    const hasStaticContent = container.querySelector('.faq-item') !== null;

    // If no static content is present, render from the global JS 'faqs' array
    if (!hasStaticContent && typeof faqs !== 'undefined' && Array.isArray(faqs)) {
        container.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item" id="faq-${index}">
                <div class="faq-question">
                    <h3>Q: ${faq.question}</h3>
                    <span class="faq-arrow"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        A: ${faq.answer}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initialize all FAQ items (both static and dynamically loaded)
    const items = container.querySelectorAll('.faq-item');
    items.forEach((item, index) => {
        // Enforce unique ID for targeting accordion animations
        if (!item.id) {
            item.setAttribute('id', `faq-${index}`);
        }

        const questionEl = item.querySelector('.faq-question');
        if (questionEl) {
            // Remove legacy inline handlers to keep HTML clean and avoid double invocation
            questionEl.removeAttribute('onclick');

            // Attach dynamic click trigger
            questionEl.addEventListener('click', (e) => {
                e.preventDefault();
                toggleFAQ(index, true);
            });

            // Ensure chevron arrow element is present
            if (!questionEl.querySelector('.faq-arrow')) {
                const arrowSpan = document.createElement('span');
                arrowSpan.className = 'faq-arrow';
                arrowSpan.innerHTML = '<i class="fas fa-chevron-down"></i>';
                questionEl.appendChild(arrowSpan);
            }
        }

        // Standardize answer container wrapper for smooth CSS transitions
        const answerEl = item.querySelector('.faq-answer');
        if (answerEl && !answerEl.querySelector('.faq-answer-content')) {
            const innerHTML = answerEl.innerHTML;
            answerEl.innerHTML = `<div class="faq-answer-content">${innerHTML}</div>`;
        }

        // Attach premium hover listeners
        item.addEventListener('mouseenter', () => toggleFAQ(index, false, true));
        item.addEventListener('mouseleave', () => toggleFAQ(index, false, false));
    });
}

// Unified Accordion / Hover Slide Logic
function toggleFAQ(index, isClick = false, isHoverOpen = null) {
    const items = document.querySelectorAll('.faq-item');
    const targetItem = document.getElementById(`faq-${index}`);
    if (!targetItem) return;

    if (isHoverOpen !== null) {
        // Hover Open / Close
        if (isHoverOpen) {
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        } else {
            targetItem.classList.remove('active');
        }
        return;
    }

    // Click Toggle Accordion
    const isActive = targetItem.classList.contains('active');
    items.forEach((item, i) => {
        if (i === index) {
            if (isActive && isClick) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        } else {
            item.classList.remove('active');
        }
    });
}

// Run loader on startup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFAQs);
} else {
    renderFAQs();
}
