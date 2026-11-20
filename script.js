/*
  script.js — Akshat Bhagwari Personal Portfolio
  ------------------------------------------------
  JavaScript interactions:
    1. Dark / Light mode toggle  (saves preference in localStorage)
    2. Contact form validation   (frontend only — no data is sent)
    3. Mobile hamburger menu
    4. Active nav link highlight on scroll
*/

/* =====================================================
   1. DARK / LIGHT MODE TOGGLE
   ===================================================== */

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon      = document.getElementById('theme-icon');

/**
 * Apply the given theme ('dark' or 'light') to the page.
 * Saves the preference so it persists on next visit.
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☀️';          // Show sun icon in dark mode
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    document.body.classList.remove('dark');
    themeIcon.textContent = '🌙';          // Show moon icon in light mode
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
  localStorage.setItem('theme', theme);  // Save preference
}

// Load saved theme when the page first opens
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle theme when button is clicked
themeToggleBtn.addEventListener('click', function () {
  const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});


/* =====================================================
   2. MOBILE HAMBURGER MENU
   ===================================================== */

const hamburgerBtn = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

// Toggle mobile nav open/close
hamburgerBtn.addEventListener('click', function () {
  const isOpen = navLinksList.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu when any nav link is clicked
navLinksList.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinksList.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});


/* =====================================================
   3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ===================================================== */

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const NAV_HEIGHT = 70; // approximate navbar height in px

/**
 * Find which section is currently visible and mark its
 * corresponding nav link as "active".
 */
function highlightNavLink() {
  const scrollPos = window.scrollY + NAV_HEIGHT + 10;

  sections.forEach(function (section) {
    const sectionTop    = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      const id = section.getAttribute('id');

      navLinks.forEach(function (link) {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + id
        );
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);
highlightNavLink(); // Run once on page load


/* =====================================================
   4. CONTACT FORM VALIDATION
   ===================================================== */

const contactForm    = document.getElementById('contact-form');
const formSuccessMsg = document.getElementById('form-success');

/**
 * Show an error message below a field and mark the field red.
 */
function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('invalid');
  error.textContent = message;
}

/**
 * Clear the error state from a field.
 */
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('invalid');
  error.textContent = '';
}

/**
 * Validate all fields. Returns true if the form is valid.
 */
function validateForm() {
  let isValid = true;

  // --- Name ---
  const name = document.getElementById('name').value.trim();
  clearError('name', 'name-error');
  if (name === '') {
    showError('name', 'name-error', 'Please enter your name.');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'name-error', 'Name must be at least 2 characters.');
    isValid = false;
  }

  // --- Email ---
  const email = document.getElementById('email').value.trim();
  clearError('email', 'email-error');
  // Simple email pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'email-error', 'Please enter your email address.');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError('email', 'email-error', 'Please enter a valid email address.');
    isValid = false;
  }

  // --- Subject ---
  const subject = document.getElementById('subject').value.trim();
  clearError('subject', 'subject-error');
  if (subject === '') {
    showError('subject', 'subject-error', 'Please enter a subject.');
    isValid = false;
  }

  // --- Message ---
  const message = document.getElementById('message').value.trim();
  clearError('message', 'message-error');
  if (message === '') {
    showError('message', 'message-error', 'Please write a message.');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'message-error', 'Message must be at least 10 characters.');
    isValid = false;
  }

  return isValid;
}

// Clear error on each field when the user starts typing/fixing it
['name', 'email', 'subject', 'message'].forEach(function (fieldId) {
  document.getElementById(fieldId).addEventListener('input', function () {
    clearError(fieldId, fieldId + '-error');
    formSuccessMsg.textContent = '';
  });
});

// Handle form submit
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();      // Prevent actual page reload / network request
  formSuccessMsg.textContent = '';

  if (validateForm()) {
    // Form is valid — show a success message
    formSuccessMsg.textContent =
      '✅ Message validated successfully! (This form is for frontend demonstration only — no data was sent.)';
    contactForm.reset();         // Clear all fields
  }
});
