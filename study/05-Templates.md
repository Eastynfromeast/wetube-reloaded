# 5. Templates

## 5.0 Returning HTML

- 우리의 HTML은 생각보다 꽤 크다 -> `res.send()`로만 보내주기 힘들다
  => Pug will save us

## 5.1 Configuring Pug

- `app.set("vie enging", "pug");`
- `process.cwd() + '/views'` : express가 view를 찾는 방법
  - cwd()? current working directory

### pug로 html 렌더링 하는 방법

1. /src 아래 /views 디렉토리 생성
2. {name}.pug로 파일 생성
3. 이런 식으로 작성
   ```
   doctype html
   html(lang="ko")
     head
       meta(charset="UTF-8")
       meta(name="viewport", content="width=device-width, initial-scale=1.0")
       title Document
     body
       h1 Welcome to Wetube
       footer &copy; 2024 Wetube
   ```
4. controller의 함수를 `send()`에서 `render()`로 변경
   `export const trending = (req, res) => res.render("home");`

### process.cwd() 에러 발생, 왜?

`Error: Failed to lookup view "home" in views directory "/Users/dongyeonsuh/Documents/study/wetube-reloaded/views"`

- current workin directory? Node.js가 실행되는 곳 (where starts Node)

  - Node.js가 어디에서부터 시작되는가?
    - package.json <- 얘는 어디에 있지? /Users/dongyeonsuh/Documents/study/wetube-reloaded
      - src 안에 있지 않다!

- 해결 방법 : server.js 에 한 줄 추가!
  ```
  app.set("views", process.cwd() + "/src/views");
  ```

## 5.2 Partials

- The best thing about PUG is that we don't need to repeat ourselves
- Pug is just a JavaScript

- How to write JavaScript inline syntax in Pug?

  - JS code will be converted into normal text before the user will see it === RENDERING

  ```
  // #{} 안에 써주면 OK
  #{new Date().getFullYear()}
  ```

- every file should be named as lowercase

### Partials

- Includes allow you to insert the contents of one Pug file into another.
  ```
  include partials/footer.pug
  ```

## 5.3 Extending Templates

### Template Inheritance

[Pug supports template inheritance. Template inheritance works via the block and extends keywords.](https://pugjs.org/language/inheritance.html)

- Block is basically **place** that we can put thing inside

  - layout파일에 block을 만드는 것은 내용을 채워넣을 공간을 마련하는 것

  ```
  // layout.pug
  doctype html
  html(lang="ko")
    head
      meta(charset="UTF-8")
      meta(name="viewport", content="width=device-width, initial-scale=1.0")
      title Wetube
    body
      block content
    include partials/footer.pug


  // edit.pug
  extends layout.pug

  block content
    h1 Edit Video
  ```

## 5.4 Variables to Templates

- `extends` allow us to have base of HTML with some certain parts that we can modify

- we have send "Variables"

  - who is rendering the template? **Controller**

  ```
  // layout.pug
    title #{pageTitle} | Wetube

  // videoController.js
  export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
  ```

## 5.6 MVP Styles

[MVP.css](https://andybrewer.github.io/mvp/)

- When are we gonna do the CSS? very very very later!
- use MVP.css for a temporary solution not to make the most ugly HTML
  ```
  // add this link inside header in the base layout file
    link(rel="stylesheet" href="https://unpkg.com/mvp.css")
  ```

## 5.7 Conditionals

- text가 아니라 variable로 인식하게 하려면? (변수를 단독으로 사용할 때)

```
 h1=pageTitle
```

- Pug에서 if/else 조건문 쓰기
  ```
   if fakeUser.loggedIn
      li
        a(href="/login") Log out
  else
    li
      a(href="/login") Login
  ```

## 5.8 Iteration

- How to use iteration in Pug
  ```
    ul
      each video in videos
        li=video
      else
        li Sorry nothing found
  ```

## 5.9 Mixins

- Mixin? A partials(pre-made HTML block) that receives data

```
// video.pug
mixin video(info)
  div
    h4=info.title
    ul
      li #{info.rating}/5
      li #{info.comments} comments
      li Posted #{info.createdAt}
      li #{info.views} views

// home.pug
include mixins/video

each videoItem in videos
    +video(videoItem)
```
