// Theme toggle logic.
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

function updateButton(theme) {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = icons[theme];
  }
}

function cycleTheme() {
  const current = getTheme();
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  localStorage.setItem('theme', next);
  applyTheme(next);
  updateButton(next);
}

// Setup event listener on load.
document.addEventListener('DOMContentLoaded', () => {
  updateButton(getTheme());
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', cycleTheme);
  }
});
