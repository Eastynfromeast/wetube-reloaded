# 6 Mongo DB and Mongoose

## 6.0-1 Array Database

- How to send data to DB

- we can use backtik with attributes!

  ```
  a(href=`/videos/${info.id}`)=info.title
  ```

- tenary (3항 연산)

  ```
   h3 #{video.views} #{video.views <= 1 ? "view" : "views"}
  ```

- absoulte vs relative URL : start with `/` ? abasolute : relative

## 6.2-3 Edit Video

- action of form : where are we going to send the data? url your server needs to have

### GET and POST method

- method ? form과 back end 사이의 정보 전송 방식
- GET : default method, using for search
  - form에 있는 정보가 url에 들어감
- POST : when changing the data of database

  - Are you going to do something with data? Yes? => POST

- shortcut!

  ```
  videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
  ```

- `express.urlencoded`
  - express app이 form value를 이해하고 자바스크립트 형식으로 변형시켜줌
  - router보다 위에 위치해야 함!
  ```
  app.use(express.urlencoded({ extended: true }));
  ```

## 6.5-6 More Practice

## 6.7 Introduction to MongoDB

### MongoDB

- MongoDB is a general purpose, **document-based**, distributed database built

  - pretty cool with start with
  - document-based ? thinks in **"objects"**, unlike usual DBs which is based in SQL or sth
  - use db with JSON files?

- Installation of MongoDB

  - [MongoDB official docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-osx-prereq)

  ```
  brew tap mongodb/brew
  brew install mongodb-community@7.0

  brew services start mongodb-community@7.0
  ```

## 6.8 Connecting to Mongo

### Mongoose

- Mongoose is our bridge from nodeJS to MongoDB

- **MongoDB Shell Command**

  ```
  // Check whether our MongoDB is working well
  mongod

  // mongodb 실행 -> mongo shell 진입
  mongosh

  //mongo shell 끝내기
  exit
  ```

- Install Mongoose

  ```
  npm install mongoose
  ```

- inside `src/db.js`

  - you have to import this `db` on the top of `server.js` -> `import "./db";`

  ```
  import mongoose from "mongoose";

  mongoose.connect("mongodb://127.0.0.1:27017/wetube");

  const db = mongoose.connection;

  const handleOpen = () => console.log("Connected to DB 💚");
  const handleError = error => console.log("DB error", error);

  // on happens many times
  db.on("error", handleError);

  //once happens only once
  db.once("open", handleOpen);
  ```

## 6.9 CRUD Introduction

- CRUD

  - Create
  - Read
  - Update
  - Delete

- What is model?
  - we need to tell Mongoose how does the data look like => Model
