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
