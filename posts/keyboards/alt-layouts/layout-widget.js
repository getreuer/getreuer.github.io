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

  const widgets = [];
  let configDialog = null;

  class LayoutTableWidget {
    constructor(container) {
      this.container = container;
      this.mode = container.dataset.mode || pageState.mode;
      this.thumbOnly = container.dataset.thumb === 'true';
      this.standardOnly = container.dataset.thumb === 'false';
      this.sortKey = 'year';
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

      const defaultBtn = document.createElement('button');
      defaultBtn.type = 'button';
      defaultBtn.className = 'btn-utility metrics-btn-default';
      defaultBtn.title = 'Reset to default metrics and sort order';
      defaultBtn.setAttribute('aria-label', 'Reset to default metrics and sort order');
      defaultBtn.innerHTML = '<span class="material-symbols-outlined">reset_settings</span>';
      defaultBtn.addEventListener('click', () => {
        resetToDefault();
      });
      this.controlsContainer.appendChild(defaultBtn);

      const customizeBtn = document.createElement('button');
      customizeBtn.type = 'button';
      customizeBtn.className = 'btn-utility metrics-btn-customize';
      customizeBtn.title = 'Customize metrics';
      customizeBtn.setAttribute('aria-label', 'Customize metrics');
      customizeBtn.innerHTML = '<span class="material-symbols-outlined">tune</span>';
      customizeBtn.addEventListener('click', () => {
        openConfigDialog();
      });
      this.controlsContainer.appendChild(customizeBtn);

      this.container.appendChild(this.controlsContainer);
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

  // Reset metrics and sort order to defaults across all widgets
  function resetToDefault() {
    resetMetricsToDefault();
    updateDialogCheckboxes();
    widgets.forEach(w => {
      w.sortKey = 'year';
      w.sortAsc = true;
      w.renderTable();
    });
  }

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

  function getOrCreateDialog() {
    if (configDialog) return configDialog;

    const dialog = document.createElement('dialog');
    dialog.className = 'dialog';

    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="dialog-header">
          <h3><span class="material-symbols-outlined">tune</span> Customize</h3>
          <button type="button" class="dialog-close-icon" title="Close dialog" aria-label="Close">&times;</button>
        </div>
        <div class="dialog-list"></div>
        <div class="dialog-footer">
          <div class="dialog-presets">
            <button type="button" class="btn-utility metrics-preset-none" title="Select none" aria-label="Select none"><span class="material-symbols-outlined">clear_all</span><span class="dialog-preset-btn-text"> Select none</span></button>
            <button type="button" class="btn-utility metrics-preset-all" title="Select all" aria-label="Select all"><span class="material-symbols-outlined">select_all</span><span class="dialog-preset-btn-text"> Select all</span></button>
          </div>
          <button type="button" class="btn-action dialog-done-btn">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    const listContainer = dialog.querySelector('.dialog-list');
    for (const [key, def] of Object.entries(METRIC_DEFS)) {
      const row = document.createElement('div');
      row.className = 'dialog-row';

      const label = document.createElement('label');
      label.className = 'dialog-label';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = key;
      cb.checked = pageState.selectedMetrics.has(key);
      cb.addEventListener('change', () => {
        if (cb.checked) {
          pageState.selectedMetrics.add(key);
        } else {
          pageState.selectedMetrics.delete(key);
        }
        updateAllWidgets();
      });

      const nameSpan = document.createElement('span');
      nameSpan.className = 'dialog-name';
      nameSpan.textContent = def.title || def.label;

      label.appendChild(cb);
      label.appendChild(nameSpan);
      row.appendChild(label);

      if (def.glossary) {
        const glossaryLink = document.createElement('a');
        glossaryLink.href = def.glossary;
        glossaryLink.target = '_blank';
        glossaryLink.rel = 'noopener noreferrer';
        glossaryLink.className = 'dialog-glossary-link';
        glossaryLink.title = 'Open glossary entry in a new tab';
        glossaryLink.setAttribute('aria-label', 'Open glossary entry in a new tab');
        glossaryLink.textContent = 'Glossary ↗';
        row.appendChild(glossaryLink);
      }

      listContainer.appendChild(row);
    }

    dialog.querySelector('.metrics-preset-none').addEventListener('click', () => {
      pageState.selectedMetrics.clear();
      updateDialogCheckboxes();
      updateAllWidgets();
    });

    dialog.querySelector('.metrics-preset-all').addEventListener('click', () => {
      for (const key of Object.keys(METRIC_DEFS)) {
        pageState.selectedMetrics.add(key);
      }
      updateDialogCheckboxes();
      updateAllWidgets();
    });

    const closeDialog = () => {
      if (dialog.open) {
        dialog.close();
      }
    };

    dialog.querySelector('.dialog-close-icon').addEventListener('click', closeDialog);
    dialog.querySelector('.dialog-done-btn').addEventListener('click', closeDialog);

    // Prevent background page scrolling when dialog is open.
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('dialog-open');
      document.body.classList.remove('dialog-open');
    });

    // Close when clicking outside dialog on backdrop.
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inDialog) {
        dialog.close();
      }
    });

    configDialog = dialog;
    return dialog;
  }

  function updateDialogCheckboxes() {
    if (!configDialog) return;
    const checkboxes = configDialog.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      const isChecked = pageState.selectedMetrics.has(cb.value);
      cb.checked = isChecked;
      if (isChecked) {
        cb.setAttribute('checked', '');
      } else {
        cb.removeAttribute('checked');
      }
    });
  }

  function openConfigDialog() {
    const dialog = getOrCreateDialog();
    updateDialogCheckboxes();
    document.documentElement.classList.add('dialog-open');
    document.body.classList.add('dialog-open');
    dialog.showModal();
  }

  function updateAllWidgets() {
    widgets.forEach(w => {
      w.renderTable();
    });
  }

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
    getOrCreateDialog();
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
