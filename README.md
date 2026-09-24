# Loopline

Loopline is a browser-based GIF editor. It lets users search for GIFs, add captions, and set when captions appear.

## Local preview

Open `index.html` in a browser.

## GIF search

The editor works with demo results by default. To enable Tenor search, set a client-side key before loading the page:

```html
<script>
  window.TENOR_API_KEY = "your-key";
</script>
```

Place the configuration script before the application script in `index.html`. Use a restricted key for public hosting.

## Next steps

- Add a serverless search proxy for production API key protection.
- Decode GIF frames in the browser.
- Render timed captions from source GIF frames.

The current export creates a local GIF from the preview and caption. It uses `gif.js` from a CDN, so the browser does the rendering and no upload is required.
