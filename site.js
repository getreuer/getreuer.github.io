var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  document.getElementById("navbar").style.top = 
      (prevScrollpos > currentScrollPos ? "0" : "-75px");
  prevScrollpos = currentScrollPos;
}

// Theme toggle logic
const themes = ['auto', 'dark', 'light'];
const icons = {
  'auto': 'brightness_6',
  'dark': 'dark_mode',
  'light': 'light_mode'
};

function getTheme() {
  return localStorage.getItem('theme') || 'auto';
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'auto') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
}

// Apply theme immediately to avoid flash
const currentTheme = getTheme();
applyTheme(currentTheme);

function updateButton(theme) {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = icons[theme];
  }
}

function cycleTheme() {
  const currentTheme = getTheme();
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  localStorage.setItem('theme', nextTheme);
  applyTheme(nextTheme);
  updateButton(nextTheme);
}

// Setup event listener on load
document.addEventListener('DOMContentLoaded', () => {
  updateButton(getTheme());
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', cycleTheme);
  }
});
