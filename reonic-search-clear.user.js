// ==UserScript==
// @name         Reonic – Suchfeld leeren (×)
// @namespace    https://github.com/mod42/installateur-userscripts
// @homepageURL  https://github.com/mod42/installateur-userscripts
// @downloadURL  https://raw.githubusercontent.com/mod42/installateur-userscripts/main/reonic-search-clear.user.js
// @updateURL    https://raw.githubusercontent.com/mod42/installateur-userscripts/main/reonic-search-clear.user.js
// @version      1.1
// @description  Fügt Suchfeldern im Reonic-Portal ein kleines × zum Löschen des Suchbegriffs hinzu (zusätzlich: Esc leert das Feld).
// @match        https://portal.reonic.de/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const SELECTOR = 'input[placeholder^="Suche"]';
  const MARK = 'data-clear-x';

  const style = document.createElement('style');
  style.textContent = `
    .rsc-clear {
      position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
      width: 18px; height: 18px; padding: 0; border: 0; border-radius: 50%;
      display: none; align-items: center; justify-content: center;
      background: #d1d5db; color: #fff; font: bold 13px/1 sans-serif;
      cursor: pointer; z-index: 5;
    }
    .rsc-clear:hover { background: #6b7280; }
    .rsc-clear.rsc-visible { display: flex; }
  `;
  document.head.appendChild(style);

  // Wert so setzen, dass React/Vue die Änderung mitbekommt
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  function clearInput(input) {
    nativeSetter.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
  }

  function enhance(input) {
    const parent = input.parentElement;
    if (!parent) return;
    // Button schon vorhanden und noch im DOM?
    if (input[MARK] && input[MARK].isConnected) return;

    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
    input.style.paddingRight = '28px';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rsc-clear';
    btn.title = 'Suche löschen';
    btn.setAttribute('aria-label', 'Suche löschen');
    btn.textContent = '×';
    btn.addEventListener('mousedown', (e) => e.preventDefault()); // Fokus im Feld behalten
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearInput(input);
      sync();
    });
    parent.appendChild(btn);
    input[MARK] = btn;

    const sync = () => btn.classList.toggle('rsc-visible', input.value !== '');
    input.addEventListener('input', sync);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value !== '') {
        e.preventDefault();
        clearInput(input);
        sync();
      }
    });
    sync();
  }

  function scan() {
    document.querySelectorAll(SELECTOR).forEach(enhance);
    // Sichtbarkeit nachziehen, falls die App den Wert ohne Event ändert (z. B. aus der URL)
    document.querySelectorAll(SELECTOR).forEach((i) => {
      if (i[MARK]) i[MARK].classList.toggle('rsc-visible', i.value !== '');
    });
  }

  // Single-Page-App: Felder kommen und gehen beim Navigieren
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  setInterval(scan, 1000);
  scan();
})();
