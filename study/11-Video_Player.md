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
