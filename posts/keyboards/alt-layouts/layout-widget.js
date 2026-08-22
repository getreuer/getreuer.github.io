// Copyright 2026 Google LLC.
// SPDX-License-Identifier: Apache-2.0
//
// layout-widget.js - Interactive keyboard layout metrics table widget

(() => {
  'use strict';

  if (typeof LAYOUTS_DATA === 'undefined' || typeof METRIC_DEFS === 'undefined') {
    console.error('layout-widget.js: LAYOUTS_DATA or METRIC_DEFS not loaded.');
    return;
  }

  // Active state shared across all widgets on the page.
  const pageState = {
    selectedMetrics: new Set(),
    mode: 'short' // Either 'short' or 'full'.
  };

  // Determine initial mode based on current URL.
  const isStatsPage = window.location.pathname.includes('stats.html');
  pageState.mode = isStatsPage ? 'full' : 'short';

  // Initialize selected metrics based on default mode
  function resetMetricsToDefault() {
    pageState.selectedMetrics.clear();
    for (const [key, def] of Object.entries(METRIC_DEFS)) {
      if (pageState.mode === 'short' && def.defaultShort) {
        pageState.selectedMetrics.add(key);
      } else if (pageState.mode === 'full' && def.defaultStats) {
        pageState.selectedMetrics.add(key);
      }
    }
  }
  resetMetricsToDefault();

  // Color index calculation (0 to 31)
  function getCmapClass(metricKey, value) {
    const limits = (typeof METRIC_LIMITS !== 'undefined' && METRIC_LIMITS[metricKey]) || [0, 100];
    const [vmin, vmax] = limits;
    let v = (value - vmin) / (vmax - vmin);
    v = Math.max(0, Math.min(1, v));
    if (METRIC_DEFS[metricKey].better === 'higher' || metricKey === 'alternation' || metricKey === 'roll_out') {
      v = 1.0 - v; // Higher / higher alternation / higher out-rolls -> cool colors (0)
    }
    const idx = Math.round(v * 31);
    return `cmap${Math.max(0, Math.min(31, idx))}`;
  }

  // Widget instance manager
  const widgets = [];

  function syncAllMenus() {
    widgets.forEach(w => w.syncMenu());
  }

  function updateAllWidgets() {
    widgets.forEach(w => w.renderTable());
  }

  class LayoutTableWidget {
    constructor(container) {
      this.container = container;
      this.mode = container.dataset.mode || pageState.mode;
      this.thumbOnly = container.dataset.thumb === 'true';
      this.standardOnly = container.dataset.thumb === 'false';
      this.sortKey = 'year'; // Initial sort: year ascending
      this.sortAsc = true;

      this.init();
    }

    init() {
      this.container.classList.add('metrics-widget');
      this.renderControls();
      this.tableWrapper = document.createElement('div');
      this.tableWrapper.className = 'metrics-table-wrapper';
      this.container.appendChild(this.tableWrapper);
      this.renderTable();
    }

    renderControls() {
      this.controlsContainer = document.createElement('div');
      this.controlsContainer.className = 'metrics-controls';

      this.menuWrap = document.createElement('div');
      this.menuWrap.className = 'metrics-menu-wrap';

      this.customizeBtn = document.createElement('button');
      this.customizeBtn.type = 'button';
      this.customizeBtn.className = 'btn-utility metrics-btn-customize';
      this.customizeBtn.title = 'Columns';
      this.customizeBtn.setAttribute('aria-label', 'Columns');
      this.customizeBtn.setAttribute('aria-expanded', 'false');
      this.customizeBtn.setAttribute('aria-haspopup', 'menu');
      this.customizeBtn.innerHTML = '<span class="material-symbols-outlined">view_column</span>';

      this.customizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });

      this.customizeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openMenu(true);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.openMenu(true);
          const checkboxes = Array.from(this.menu.querySelectorAll('input[type="checkbox"]'));
          if (checkboxes.length) checkboxes[checkboxes.length - 1].focus();
        }
      });

      this.menu = document.createElement('div');
      this.menu.className = 'metrics-menu';
      this.menu.setAttribute('role', 'menu');
      this.menu.setAttribute('hidden', '');

      // Special "All" tri-state item
      const allLabel = document.createElement('label');
      allLabel.className = 'metrics-menu-item metrics-menu-item-all';

      this.allCheckbox = document.createElement('input');
      this.allCheckbox.type = 'checkbox';
      this.allCheckbox.className = 'metrics-cb-all';

      this.allCheckbox.addEventListener('change', () => {
        if (this.allCheckbox.checked) {
          for (const key of Object.keys(METRIC_DEFS)) {
            pageState.selectedMetrics.add(key);
          }
        } else {
          pageState.selectedMetrics.clear();
        }
        syncAllMenus();
        updateAllWidgets();
      });

      const allText = document.createElement('span');
      allText.className = 'metrics-menu-text';
      allText.style.fontWeight = '600';
      allText.textContent = 'All';

      allLabel.appendChild(this.allCheckbox);
      allLabel.appendChild(allText);
      this.menu.appendChild(allLabel);

      const divider = document.createElement('div');
      divider.className = 'metrics-menu-divider';
      this.menu.appendChild(divider);

      // Metric items
      for (const [key, def] of Object.entries(METRIC_DEFS)) {
        const itemLabel = document.createElement('label');
        itemLabel.className = 'metrics-menu-item';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.dataset.metric = key;
        cb.checked = pageState.selectedMetrics.has(key);

        cb.addEventListener('change', () => {
          if (cb.checked) {
            pageState.selectedMetrics.add(key);
          } else {
            pageState.selectedMetrics.delete(key);
          }
          syncAllMenus();
          updateAllWidgets();
        });

        const textSpan = document.createElement('span');
        textSpan.className = 'metrics-menu-text';
        textSpan.textContent = def.title || def.label;

        itemLabel.appendChild(cb);
        itemLabel.appendChild(textSpan);
        this.menu.appendChild(itemLabel);
      }

      this.menu.addEventListener('keydown', (e) => {
        const checkboxes = Array.from(this.menu.querySelectorAll('input[type="checkbox"]'));
        const currentIndex = checkboxes.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % checkboxes.length : 0;
          checkboxes[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + checkboxes.length) % checkboxes.length : checkboxes.length - 1;
          checkboxes[prevIndex].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          if (checkboxes.length) checkboxes[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          if (checkboxes.length) checkboxes[checkboxes.length - 1].focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.closeMenu(true);
        } else if (e.key === 'Tab') {
          setTimeout(() => {
            if (!this.menuWrap.contains(document.activeElement)) {
              this.closeMenu();
            }
          }, 0);
        }
      });

      this.syncMenu();

      this.menuWrap.appendChild(this.customizeBtn);
      this.menuWrap.appendChild(this.menu);
      this.controlsContainer.appendChild(this.menuWrap);
      this.container.appendChild(this.controlsContainer);
    }

    openMenu(focusFirst = false) {
      widgets.forEach(other => {
        if (other !== this) other.closeMenu();
      });
      this.menu.removeAttribute('hidden');
      this.customizeBtn.setAttribute('aria-expanded', 'true');
      this.syncMenu();
      if (focusFirst) {
        const firstInput = this.menu.querySelector('input[type="checkbox"]');
        if (firstInput) firstInput.focus();
      }
    }

    closeMenu(restoreFocus = false) {
      if (this.menu.hasAttribute('hidden')) return;
      this.menu.setAttribute('hidden', '');
      this.customizeBtn.setAttribute('aria-expanded', 'false');
      if (restoreFocus) {
        this.customizeBtn.focus();
      }
    }

    toggleMenu() {
      if (this.isMenuOpen()) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    isMenuOpen() {
      return this.customizeBtn.getAttribute('aria-expanded') === 'true';
    }

    syncMenu() {
      if (!this.menu) return;
      const metricCbs = this.menu.querySelectorAll('input[data-metric]');
      metricCbs.forEach(cb => {
        cb.checked = pageState.selectedMetrics.has(cb.dataset.metric);
      });
      if (this.allCheckbox) {
        const total = Object.keys(METRIC_DEFS).length;
        const count = pageState.selectedMetrics.size;
        if (count === 0) {
          this.allCheckbox.checked = false;
          this.allCheckbox.indeterminate = false;
        } else if (count === total) {
          this.allCheckbox.checked = true;
          this.allCheckbox.indeterminate = false;
        } else {
          this.allCheckbox.checked = false;
          this.allCheckbox.indeterminate = true;
        }
      }
    }

    getFilteredData() {
      return LAYOUTS_DATA.filter(layout => {
        if (this.mode === 'short' && !layout.short) {
          return false;
        }
        if (this.thumbOnly && !layout.thumb) {
          return false;
        }
        if (this.standardOnly && layout.thumb) {
          return false;
        }
        return true;
      });
    }

    getSortedData() {
      const data = this.getFilteredData();
      const sortKey = this.sortKey || 'year';
      const sortAsc = this.sortAsc;

      return data.slice().sort((a, b) => {
        if (sortKey === 'name' || sortKey === 'year') {
          const ya = parseInt(a.year, 10) || 0;
          const yb = parseInt(b.year, 10) || 0;
          if (ya !== yb) {
            return sortAsc ? ya - yb : yb - ya;
          }
          return a.name.localeCompare(b.name);
        } else if (METRIC_DEFS[sortKey]) {
          const valA = a.metrics[sortKey] ?? 0;
          const valB = b.metrics[sortKey] ?? 0;
          if (valA !== valB) {
            return sortAsc ? valA - valB : valB - valA;
          }
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    }

    handleSort(key) {
      if (this.sortKey === key || (key === 'name' && this.sortKey === 'year')) {
        this.sortAsc = !this.sortAsc;
        this.sortKey = key;
      } else {
        this.sortKey = key;
        // Default direction: year/name -> ascending (chronological), metrics ->
        // lower is better (ascending) or higher is better (descending)
        if (key === 'name' || key === 'year') {
          this.sortAsc = true;
        } else if (METRIC_DEFS[key]) {
          this.sortAsc = (METRIC_DEFS[key].better === 'lower');
        } else {
          this.sortAsc = true;
        }
      }
      this.renderTable();
    }

    renderTable() {
      const data = this.getSortedData();
      const activeKeys = Object.keys(METRIC_DEFS).filter(k => pageState.selectedMetrics.has(k));

      let html = '<table class="metrics">\n<thead>\n<tr>\n';

      // Layout Name Header (sorted by year).
      const nameSortIndicator = (this.sortKey === 'name' || this.sortKey === 'year') ? (this.sortAsc ? ' ▲' : ' ▼') : '';
      html += `<th class="sortable col-layout" title="Click to sort by year">Layout${nameSortIndicator}</th>\n`;

      // Metric Headers (Plain text label + sort indicator, no links).
      for (const key of activeKeys) {
        const def = METRIC_DEFS[key];
        const indicator = this.sortKey === key ? (this.sortAsc ? ' ▲' : ' ▼') : '';
        const betterNote = def.better === 'lower' ? ' (lower is better)' : (def.better === 'higher' ? ' (higher is better)' : '');
        const tooltip = `Click to sort by ${def.label}${betterNote}`;
        html += `<th class="sortable col-metric" data-metric="${key}" title="${tooltip}">`;
        html += `${def.label}${indicator}</th>\n`;
      }
      html += '</tr>\n</thead>\n<tbody>\n';

      // Rows
      for (const layout of data) {
        html += '<tr>\n';
        const yearSpan = layout.year ? ` <span class="wide-only">(${layout.year})</span>` : '';
        html += `<td class="col-layout"><a href="${layout.url}" target="_blank" rel="noopener noreferrer">${layout.name}${yearSpan}</a></td>\n`;

        for (const key of activeKeys) {
          const val = layout.metrics[key];
          if (val !== undefined && val !== null) {
            const cmapClass = getCmapClass(key, val);
            html += `<td class="col-metric ${cmapClass}">${val.toFixed(2)}%</td>\n`;
          } else {
            html += '<td class="col-metric">-</td>\n';
          }
        }
        html += '</tr>\n';
      }

      html += '</tbody>\n</table>';
      this.tableWrapper.innerHTML = html;

      const thLayout = this.tableWrapper.querySelector('th.col-layout');
      if (thLayout) {
        thLayout.addEventListener('click', () => this.handleSort('name'));
      }

      const thMetrics = this.tableWrapper.querySelectorAll('th[data-metric]');
      thMetrics.forEach(th => {
        th.addEventListener('click', () => {
          this.handleSort(th.dataset.metric);
        });
      });
    }
  }

  document.addEventListener('click', (e) => {
    widgets.forEach(w => {
      if (w.menuWrap && !w.menuWrap.contains(e.target)) {
        w.closeMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      widgets.forEach(w => {
        if (w.isMenuOpen()) {
          w.closeMenu(true);
        }
      });
    }
  });

  function initWidgets() {
    const containers = document.querySelectorAll('.layout-metrics-widget');
    containers.forEach(container => {
      widgets.push(new LayoutTableWidget(container));
    });
  }

  let initialized = false;
  function init() {
    if (initialized) return;
    initialized = true;
    initWidgets();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
    if (document.querySelectorAll('.layout-metrics-widget').length > 0) {
      init();
    }
  }
})();

