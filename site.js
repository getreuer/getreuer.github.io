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

function updateThemeUI(theme) {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = icons[theme] || 'brightness_6';
  }
  const menuItems = document.querySelectorAll('.theme-menu-item');
  menuItems.forEach(item => {
    const isSelected = item.getAttribute('data-theme-value') === theme;
    item.setAttribute('aria-checked', isSelected ? 'true' : 'false');
  });
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
  updateThemeUI(theme);
}

function initThemeMenu() {
  const button = document.getElementById('theme-toggle');
  const menu = document.getElementById('theme-menu');
  if (!button || !menu) return;

  const items = Array.from(menu.querySelectorAll('.theme-menu-item'));

  const openMenu = (focusTarget) => {
    menu.removeAttribute('hidden');
    button.setAttribute('aria-expanded', 'true');
    if (focusTarget) {
      focusTarget.focus();
    } else {
      const current = getTheme();
      const activeItem = items.find(it => it.getAttribute('data-theme-value') === current) || items[0];
      if (activeItem) activeItem.focus();
    }
  };

  const closeMenu = (restoreFocus = false) => {
    if (menu.hasAttribute('hidden')) return;
    menu.setAttribute('hidden', '');
    button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      button.focus();
    }
  };

  const toggleMenu = () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  button.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMenu(items[0]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      openMenu(items[items.length - 1]);
    }
  });

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = item.getAttribute('data-theme-value');
      if (val) setTheme(val);
      closeMenu(true);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(index + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(true);
      } else if (e.key === 'Tab') {
        closeMenu(false);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== button) {
      closeMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });
}

// Heading anchor links for sections with an id.
function initHeadingAnchors() {
  const headings = document.querySelectorAll(
    '#content h1[id], #content h2[id], #content h3[id], #content h4[id], #content h5[id], #content h6[id]'
  );
  headings.forEach(heading => {
    // Exclude header title/author, table of contents, and dialogs.
    if (heading.closest('#header, #TOC, dialog, .dialog') || heading.querySelector('.heading-anchor')) {
      return;
    }

    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = '#' + heading.id;

    // Get clean heading text for accessibility label.
    const clone = heading.cloneNode(true);
    clone.querySelectorAll('.material-symbols-outlined, .heading-anchor').forEach(el => el.remove());
    const cleanText = (clone.textContent || '').trim().replace(/\s+/g, ' ');
    if (cleanText) {
      anchor.setAttribute('aria-label', `Link to section: ${cleanText}`);
    } else {
      anchor.setAttribute('aria-label', 'Link to this section');
    }
    anchor.title = 'Link to this section';

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = 'link';
    anchor.appendChild(icon);

    heading.appendChild(anchor);
  });
}

// Setup event listener on load.
document.addEventListener('DOMContentLoaded', () => {
  updateThemeUI(getTheme());
  initThemeMenu();
  initHeadingAnchors();
});

