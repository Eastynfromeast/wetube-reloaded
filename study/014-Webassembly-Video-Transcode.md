# 14 WebAssembly Video Transcode

- Convert out video from webm to mp4 with FFmpeg

## FFmpeg

[FFmpeg](https://www.ffmpeg.org/)

- FFmpeg is a free and open-source software project consisting of a suite of libraries and programs for handling video, audio, and other multimedia files and streams.
- Written in C
- Can do whatever you want with your videos by FFmpeg
- Can use it in almost any programming langauges
- Can be installed in our console

- This should learn on a computer, the backend
  - Youtube is doing those works with expensive servers, but we can't
  - So we are going to use [WebAssembly](#ffmpegwasm)

## WebAssembly

[Offical Website](https://webassembly.org/)

- WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.
- WebAssembly (Wasm) defines a portable binary-code format and a corresponding text format for executable programs[2] as well as software interfaces for facilitating communication between such programs and their host environment. - Wikipedia

- WebAssembly allows us to run very fast code on the frontend without using JavaScript
  - We can run energy-consuming, computing-consuming programs thanks to WebAssembly

## ffmpeg.wasm

[github](https://github.com/ffmpegwasm/ffmpeg.wasm)

- ffmpeg.wasm is a pure Webassembly / Javascript port of FFmpeg. It enables video & audio record, convert and stream right inside browsers.
- We are going to use the processing power of user's browser

- Q. Why do we need to convert video files from webm to mp4?
  - A. Not all devices can understand WebM

## 14.1 Transcode Video

- How to use the latest ffmpeg
  - we have to use **await** since the user is using other software on our website

```
import { fetchFile } from '@ffmpeg/util';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg();
await ffmpeg.load();

ffmpeg.on('log', ({ type, message }) => console.log(message));

// ffmpeg 세상에 file을 만들어줌!
ffmpeg.writeFile(`${fileName}.webm`, await fetchFile(videoFile));

// run ffmpeg
await ffmpeg.exec(["-i", `${fileName}.webm`, "-r", "60", `${fileName}.mp4`]);
```

## 14.2 Download Transcoded Video

- Read a mp4 file created by ffmpeg

```
	const mp4File = await ffmpeg.readFile(`${fileName}.mp4`);

	console.log(mp4File); // Uint8Array(286313)
	console.log("The buffer is ", mp4File.buffer); // ArrayBuffer
```

- Blob : a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.

- Uint8Array : The Uint8Array typed array represents an array of 8-bit unsigned integers. The contents are initialized to 0 unless initialization data is explicitly provided. Once established, you can reference elements in the array using the object's methods, or using standard array index syntax (that is, using bracket notation).

- ArrayBuffer : The ArrayBuffer object is used to represent a generic raw binary data buffer. It is an array of bytes, often referred to in other languages as a "byte array". You cannot directly manipulate the contents of an ArrayBuffer; instead, you create one of the typed array objects or a DataView object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

- We need to create a blob

  - We can make a blob from an ArrayBuffer `mp4File.buffer`
  - To get actual binary data, we need to use **buffer**

    ```
    	const mp4File = await ffmpeg.readFile(`${fileName}.mp4`);

      // Create blob with mp4File.buffer
      const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

      // Create URL to make it downloadable
      const mp4Url = URL.createObjectURL(mp4Blob);

      videoLink.href = mp4Url;
      videoLink.download = `${fileName}.mp4`;
    ```

## 14.3 Thumbnail

- How to get thumbnail with FFmpeg
  - [ref from offical website](https://ffmpeg.org/ffmpeg.html#Video-Options)

```
	await ffmpeg.exec(["-i", `${fileName}.webm`, "-ss", "00:00:01", "-frames:v", "1", `thumbnail_${fileName}.jpg`]);
// Output #0, image2, to 'thumbnail_videoFile_241002_0.jpg':
```
