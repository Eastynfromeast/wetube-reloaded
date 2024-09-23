# 11 Video Player

## 11.0 Player Setup

- we can add diffrent entries
  ```
  entry: {
  	main: "./src/client/js/main.js",
  	videoPlayer: "./src/client/js/videoPlayer.js",
  }
  ```
- and we can create each js files on the entries

  ```
  output: {
  	filename: "js/[name].js",
  	path: path.resolve(__dirname, "assets"),
  	clean: true,
  },
  ```

- create block to add scripts inside `layout.pug` : `block scripts`

- how to make comment in Pug world

  - adding `// // `
  - `//-` : Nobody in the frontend cannot see this comment!

### attributes of HTMLMediaElement aka video

[HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

- loadedmetadata : The loadedmetadata event is fired when the metadata has been loaded.

  - metadata : everything apart from the video

- duration : A read-only double-precision floating-point value indicating the total duration of the media in seconds. If no media data is available, the returned value is NaN
- timeupdate : Fired when the time indicated by the currentTime property has been updated.

- Use a trick to format time => `new Date(seconds * 1000).toISOString().substring(14, 14 + 5);`
