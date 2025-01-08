// Di awal script.js
console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Particles.js initialization
    if(typeof particlesJS !== 'undefined') {
        // ... particles.js configuration code ...
        console.log('Particles.js initialized');
    } else {
        console.error('Particles.js not loaded');
    }

    // Portfolio popup initialization
    if (!document.querySelector('.portfolio-popup')) {
        const popup = document.createElement('div');
        popup.className = 'portfolio-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <img class="popup-image" src="" alt="Project Preview">
                <h3 class="popup-title"></h3>
            </div>
        `;
        document.body.appendChild(popup);
    }

    const popup = document.querySelector('.portfolio-popup');
    
    // Portfolio card event listeners
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const image = this.querySelector('.portfolio-image').src;
            const title = this.querySelector('.card-title').textContent;
            
            const popupImage = popup.querySelector('.popup-image');
            const popupTitle = popup.querySelector('.popup-title');
            
            popupImage.src = image;
            popupTitle.textContent = title;
            popup.classList.add('active');
        });
    });

    // Close popup handlers
    popup.addEventListener('click', function(e) {
        if (e.target === popup || e.target.classList.contains('close-popup')) {
            popup.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
    });

    // Single typing animation implementation
    const texts = [
        "Ikhsan Fauzan Aziim",
        "I'm a Web Developer",
        "I'm a Mobile Developer",
        "I'm a UI & UX Designer",
        "I'm a Fullstack Developer"
    ];
    const typedTextElement = document.getElementById('typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (!isWaiting) {
            if (!isDeleting) {
                // Typing
                typedTextElement.textContent = currentText.slice(0, charIndex + 1);
                charIndex++;
                
                // Check if typing is complete
                if (charIndex === currentText.length) {
                    isWaiting = true;
                    setTimeout(() => {
                        isDeleting = true;
                        isWaiting = false;
                    }, 1500); // Wait 1.5s before starting to delete
                }
            } else {
                // Deleting
                typedTextElement.textContent = currentText.slice(0, charIndex);
                charIndex--;
                
                // Check if deleting is complete
                if (charIndex === 0) {
                    isWaiting = true;
                    setTimeout(() => {
                        isDeleting = false;
                        isWaiting = false;
                        // Move to next text
                        textIndex = (textIndex + 1) % texts.length;
                    }, 500); // Wait 0.5s before typing next text
                }
            }
        }
        
        // Set the next timeout
        const speed = isDeleting ? 50 : 100; // Deleting is faster than typing
        setTimeout(typeText, speed);
    }

    // Start typing animation
    typeText();
});