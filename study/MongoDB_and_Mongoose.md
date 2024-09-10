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

- Schema : the shape of model

- How to create schema and model

  ```
  const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
    meta: {
      views: Number,
      rating: Number,
    },
  });

  const videoModel = mongoose.model("Video", videoSchema);
  export default videoModel;
  ```

## 6.11 Our First Query

- create `src/init.js` to seperate server.js and init.js

  - `server.js` was created to deal with express and configuration of server, not importing database or models
  - `init.js`is created to import everything needs to be start the server

- How do we use our Video model?
  - callback? way of waiting in JavaScript world

## 6.12 Our First Query part Two

- database는 js 밖에 있기 때문에 코드를 먼저 쓰더라도 비동기로 늦게 출력된다

## 6.13 Async Await

- Promise ? The newest version of callback

  - `await` : javascript is waiting something
  - `await` should be used inside `async` function

  - try and catch
    - catch catched errors
    ```
    try {
      const videos = await Video.find({});
      return res.render("home", { pageTitle: "Home", videos });
    } catch {
      return res.render("server-error");
    }
    ```

## 6.14 Returns and Renders

- why we use `return`? : to execute the function after we render
- you don't have to return, you have to call the function

## 6.15-16 Creating a Video

- Mongoose is helping you validate the data!
  - the reason why we create a Video model
  - Mongoose is protecting us from our stupidity!
- `video.save();` this returns promise
- MongoDB의 collection이름이 Video가 아닌 videos인 이유
  : Mongoose는 자동으로 모델을 찾고, 해당 모델의 이름을 따서 소문자+뒤에 s(복수형)을 붙여 컬렉션을 생성합니다.

## 6.17 Exceptions and Validation

- createdAt의 default 값을 Date.now 로 설정해주는 이유?

  - Date.now()로 쓰면 바로 실행될 것 -> 그렇게 하지 않기 위한 mongoose만의 규칙?

  ```
  const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String }],
    meta: {
      views: Number,
      rating: Number,
    },
  });

  ```

## 6.18 More Schema

- minLength, maxLength : we should make a limit on both side of HTML form and data schema when we are using minLength or maxLength

## 6.19 Video Detail

- `ObjectId` of MongoDB : A 24 character hexadecimal string value for the new ObjectId.
  - regExp : `videoRouter.get("/:id([0-9a-f]{24})", watch);`
- `findById()` : Finds a single document by its \_id field. findById(id) is almost\* equivalent to findOne({ \_id: id }). If you want to query by a document's \_id, use findById() instead of findOne().
  ```
  const video = await Video.findById(id);
  ```

## 6.20-22 Edit Video

- `findOneAndUpdate(conditions, update, options)` : data 찾아서 업데이트 하기

  ```
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: hashtags.split(",").map(word => (!word.trim().startsWith("#") ? `#${word.trim().replaceAll(" ", "_")}` : word.trim().replaceAll(" ", "_"))),
    });
  ```

- `exists({ filter });` : return true or false
  - check before save the data
  - in postEdit, we don't need the video object to be gotten

## 6.23 Middlewares

- mongoose terminal directives

  ```
  시작하기
  mongosh

  db 보기
  show db

  사용할 db 선택
  use dbName

  collection 보기
  show collections

  db collections 안에 documents 보기
  db.collectionName.find()

  db collection 안의 documents 내용 모두 제거하기
  db.collectionName.deleteMany({})
  ```

- middleware **must be created before the model is created**

  ```
  videoSchema.pre("save", async function () {
    this.hashtags = this.hashtags[0]
      .split(",")
      .map(word => (!word.trim().startsWith("#") ? `#${word.trim().replaceAll(" ", "_")}` : word.trim().replaceAll(" ", "_")));
  });

  const videoModel = mongoose.model("Video", videoSchema);
  ```

## 6.24 Statics

- We can build our own functions by statics

  ```
  videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map(word => (!word.trim().startsWith("#") ? `#${word.trim().replaceAll(" ", "_")}` : word.trim().replaceAll(" ", "_")));
  });

  // how to use
  await Video.create({
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  ```

## 6.25 Delete Video

- `findByIdAndDelete({ _id: id })` : delete the data by id
