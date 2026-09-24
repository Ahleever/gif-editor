# Loopline

Loopline is a browser-based GIF editor. It lets users search for GIFs, add captions, and set when captions appear.

## Local preview

Open `index.html` in a browser.

## GIF search

The editor works with demo results by default. To enable Klipy search, create a test key at [partner.klipy.com/api-keys](https://partner.klipy.com/api-keys), then set it before loading the page:

```html
<script>
  window.KLIPY_API_KEY = "your-key";
</script>
```

Place the configuration script before the application script in `index.html`. Klipy test keys allow up to 100 requests per hour. Use a restricted key for public hosting and follow Klipy attribution requirements.

## Next steps

- Add a serverless search proxy for production API key protection.
- Decode GIF frames in the browser.
- Render timed captions from source GIF frames.

The current export creates a local GIF from the preview and caption. It uses `gif.js` from a CDN, so the browser does the rendering and no upload is required.
