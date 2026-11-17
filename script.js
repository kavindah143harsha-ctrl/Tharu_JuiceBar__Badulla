// Theme Management
const themeToggleBtn = document.getElementById('themeToggleBtn');
const storedTheme = localStorage.getItem('tharu_theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('tharu_theme', theme);
}

if (storedTheme) {
  applyTheme(storedTheme);
} else if (prefersDark) {
  applyTheme('dark');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Mobile Review Smooth Scrolling & Input Focus
const mobileReviewNavLink = document.getElementById('mobileReviewNavLink');
if (mobileReviewNavLink) {
  mobileReviewNavLink.addEventListener('click', (e) => {
    const reviewSection = document.getElementById('review-section');
    if (reviewSection) {
      e.preventDefault();
      reviewSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('reviewerName');
        if (input) input.focus();
      }, 450);
    }
  });
}

// Auto-scroll if navigated from external page with #review-section hash
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#review-section') {
    const reviewSection = document.getElementById('review-section');
    if (reviewSection) {
      setTimeout(() => {
        reviewSection.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }
});

// WhatsApp Feedback Handler with Unicode Emojis
function handleWhatsAppReview(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value.trim();
  const ratingValue = document.querySelector('input[name="experienceRating"]:checked')?.value || '5';
  const favoriteItem = document.getElementById('favoriteItem').value.trim();
  const comment = document.getElementById('reviewComment').value.trim();

  if (!name || !comment) {
    alert('Please fill out your name and review.');
    return;
  }

  // Unicode Emojis (Prevents broken  characters regardless of file encoding)
  const sparkEmoji = "\u2728"; // ✨
  const starEmoji = "\u2B50";  // ⭐

  let ratingText = "";
  if (ratingValue === "5") {
    ratingText = starEmoji.repeat(5) + " Excellent (5/5)";
  } else if (ratingValue === "4") {
    ratingText = starEmoji.repeat(4) + " Good (4/5)";
  } else if (ratingValue === "3") {
    ratingText = starEmoji.repeat(3) + " Nice (3/5)";
  } else {
    ratingText = starEmoji.repeat(5) + " Excellent (5/5)";
  }

  let message = `*${sparkEmoji} Customer Review - Tharu Juice Bar*\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Rating:* ${ratingText}\n`;
  if (favoriteItem) message += `*Item:* ${favoriteItem}\n`;
  message += `*Feedback:* ${comment}\n\n`;
  message += `_Sent via Tharu Juice Bar Website_`;

  const whatsappUrl = `https://wa.me/94711259586?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}