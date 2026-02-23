# VaxTrack PWA — GitHub Pages Deployment

## Files in this folder
- `index.html` — main page (loads React + compiles JSX in browser)
- `app.jsx` — the full VaxTrack app
- `manifest.json` — makes it installable as a home screen app
- `sw.js` — service worker (enables offline use)
- `icon-*.png` — app icons (shown on iPhone home screen)

## Steps to deploy on GitHub Pages

### 1. Create a new GitHub repo
- Go to github.com → New repository
- Name it: `vaxtrack` (or anything you like)
- Set it to **Public**
- Don't add README (keep empty)

### 2. Upload the files
- In the new repo, click **"uploading an existing file"**
- Drag and drop **all files** from this folder
- Click **"Commit changes"**

### 3. Enable GitHub Pages
- Go to repo **Settings → Pages**
- Under "Source", select **"Deploy from a branch"**
- Branch: `main`, Folder: `/ (root)`
- Click **Save**

### 4. Wait ~60 seconds, then your URL is:
```
https://YOUR-GITHUB-USERNAME.github.io/vaxtrack/
```

### 5. Send that URL to your wife
On her iPhone:
1. Open the URL in **Safari**
2. Tap the **Share button** (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **Add** → done!

The app will appear on her home screen with the VaxTrack icon and launch fullscreen with no browser UI.

## Notes
- First load requires internet (to download React + Babel ~300KB)
- After first load, works **offline** (service worker caches everything)
- All vaccination data is stored **locally on the phone** (localStorage)
- Data is NOT shared between devices — each phone has its own copy
