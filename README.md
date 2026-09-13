# fishOS Desktop Pet

A tiny static desktop pet experience built for Windows with plain HTML, CSS, and JavaScript.

## Run locally on Windows

1. Open PowerShell in this folder.
2. Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-desktop-pet.ps1
```

The launcher starts a local HTTP server and opens the pet page in your browser.

## Files

- `index.html` — markup for the pet UI.
- `styles.css` — visual styling for the fishOS-themed pet.
- `app.js` — pet behavior, click interactions, and idle movement.
