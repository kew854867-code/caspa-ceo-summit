---
name: Vite cache after React upgrades
description: Diagnosing a browser-only React/React DOM mismatch after a package update.
---

When a workspace catalog update changes React and React DOM, a running Vite preview may keep serving its previously optimized dependency bundle even after the workflow restarts.

**Why:** The installed package graph and production build agreed on matching versions, but the browser still received an older React DOM bundle and showed a version-mismatch overlay. Removing Vite's generated optimizer cache and restarting the web workflow resolved it.

**How to apply:** If a browser-only React version mismatch persists after checking the installed package versions, inspect Vite's served optimizer output before changing dependency versions again. Clear only the generated optimizer cache if it is stale.