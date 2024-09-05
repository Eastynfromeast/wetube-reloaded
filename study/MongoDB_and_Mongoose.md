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

### GET and POST

- GET : default method, using for search
- POST : when changing the data of database
