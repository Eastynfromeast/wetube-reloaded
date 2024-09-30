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
