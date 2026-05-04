// Dynamic FAQ Rendering Logic
function renderFAQs() {
    const container = document.querySelector('.faq-container');
    if (!container || typeof faqs === 'undefined') return;

    container.innerHTML = faqs.map((faq, index) => `
        <div class="faq-item" id="faq-${index}">
            <div class="faq-question" onclick="toggleFAQ(${index}, true)">
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

    // Add Hover Listeners
    const items = container.querySelectorAll('.faq-item');
    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => toggleFAQ(index, false, true));
        item.addEventListener('mouseleave', () => toggleFAQ(index, false, false));
    });
}

// Accordion Logic
function toggleFAQ(index, isClick = false, isHoverOpen = null) {
    const items = document.querySelectorAll('.faq-item');
    const targetItem = document.getElementById(`faq-${index}`);
    if (!targetItem) return;
    
    if (isHoverOpen !== null) {
        // Hover behavior
        if (isHoverOpen) {
            items.forEach((item, i) => {
                if (i === index) item.classList.add('active');
                else item.classList.remove('active');
            });
        } else {
            targetItem.classList.remove('active');
        }
        return;
    }

    // Click behavior
    const isActive = targetItem.classList.contains('active');
    items.forEach((item, i) => {
        if (i === index) {
            if (isActive && isClick) item.classList.remove('active');
            else item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFAQs);
} else {
    renderFAQs();
}
