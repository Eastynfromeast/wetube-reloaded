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

## 13.1 Video Preview

-`HTMLMediaELement.srcObject` : The srcObject property of the HTMLMediaElement interface sets or returns the object which serves as the source of the media associated with the HTMLMediaElement.

## 13.2 Recording Video

- `MediaRecorder` : The MediaRecorder interface of the MediaStream Recording API provides functionality to easily record media. It is created using the MediaRecorder() constructor.

  - [MediaRecorder in mdn](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

  - `MediaRecorder.stop()` : Stops recording, at which point a dataavailable event containing the final Blob of saved data is fired. No more recording occurs.
    - `dataavailable` : The dataavailable event of the MediaRecorder interface is fired when the MediaRecorder delivers media data to your application for its use. The data is provided in a Blob object that contains the data.

## 13.3 Recording Video part Two

- `URL.createObjectURL` : create an URL only available in the browser memory

## 13.4 Downloading the File

- `a.download` : Prompts the user to save the linked URL instead of navigating to it
  - when we add `download` attribute on `<a>` then the `<a>` will save the file

## 13.5 Recap

- `mediaDevices` : Allows you to access media devices such as microphone, camera and so on.
