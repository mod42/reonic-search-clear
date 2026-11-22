# Reonic – Suchfeld leeren (×)

Userscript (Tampermonkey/Violentmonkey) für das [Reonic-Portal](https://portal.reonic.de/), das Suchfeldern
(Platzhalter „Suche…“) ein kleines **×** zum Löschen des Suchbegriffs hinzufügt.

## Funktionen

- **×** rechts im Suchfeld, sichtbar sobald ein Suchbegriff eingetragen ist
- **Esc** im Suchfeld leert ebenfalls den Suchbegriff
- Das Leeren wird der Seite wie eine normale Eingabe gemeldet, die Liste wird also wirklich zurückgesetzt
- Funktioniert auch nach Seitenwechseln innerhalb des Portals

## Installation

1. [Tampermonkey](https://www.tampermonkey.net/) in Chrome installieren.
2. In neueren Chrome-Versionen unter `chrome://extensions` bei Tampermonkey **„Nutzerscripts zulassen“**
   aktivieren (bzw. den Entwicklermodus).
3. Script öffnen und installieren:
   [reonic-search-clear.user.js](https://raw.githubusercontent.com/mod42/reonic-search-clear/main/reonic-search-clear.user.js)

## Lizenz

MIT
