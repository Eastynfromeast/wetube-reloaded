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
