# 13 Video Recorder

## How to add a Java Script file to webpack

1. Create a `.js` file inside `/src/client/js`
2. Go to `webpack.config.js` and add this inside `module.exports.entry`

```
entry: {
    // other files...
    recorder: "./src/client/js/recorder.js",
  },
```

3. Run `npm run dev:assets`
4. Check the `assets/js` directory if the added file created successfully
5. Go to the pug file where you want to add the JS file
6. Write down like this

```
  script(src="/static/js/recorder.js")
```

7. Check if it works and if it works, SUCCESS!

- `MediaDevices.getUserMedia()`

  - [mdn link](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

- `regeneratorRuntime` was needed to use `async/await` in babel, but we don't have to rn in 2024
