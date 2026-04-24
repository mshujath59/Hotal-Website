// Sticky Navbar Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fas', 'fa-bars');
        icon.classList.add('fas', 'fa-times');
    } else {
        icon.classList.remove('fas', 'fa-times');
        icon.classList.add('fas', 'fa-bars');
    }
});

// Mobile menu CSS fix (Adding dynamically since it's easier to manage)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(26, 26, 26, 0.95);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.5s ease;
            display: flex !important;
            z-index: 999;
        }
        .nav-links.active {
            left: 0;
        }
        .nav-links li {
            margin: 20px 0;
        }
        .nav-links li a {
            font-size: 1.5rem;
        }
        .menu-toggle {
            display: block;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
        }
        nav.sticky .menu-toggle {
            color: var(--secondary-color);
        }
    }
    @media (min-width: 769px) {
        .menu-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fas', 'fa-times');
            icon.classList.add('fas', 'fa-bars');

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Booking Form Logic
const bookingForm = document.getElementById('bookingForm');
const confirmationPopup = document.getElementById('confirmationPopup');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic Validation (Check dates)
        const checkin = new Date(document.getElementById('checkin').value);
        const checkout = new Date(document.getElementById('checkout').value);

        if (checkout <= checkin) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        // Simulate API call and success
        const submitBtn = bookingForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            confirmationPopup.style.display = 'flex';
            bookingForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Close Popup
function closePopup() {
    confirmationPopup.style.display = 'none';
}

// Login Modal Logic
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginContent = document.getElementById('loginContent');
const signupContent = document.getElementById('signupContent');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function toggleAuth(showLogin) {
    if (showLogin) {
        loginContent.style.display = 'block';
        signupContent.style.display = 'none';
    } else {
        loginContent.style.display = 'none';
        signupContent.style.display = 'block';
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});
