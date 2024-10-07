# 7 User Authentication

## 7.0-2 Create Account

- VSCode 멀티 커서 방법
  - option + 클릭
  - Option + command + 방향키 위/ 아래

### Hashing Password

- Hashing is one way fn, so you cannot go back

  - You cannot get the input by output
  - With same input, the output will be always same === deterministic function

- Install bcrypt
  - `npm i bcrypt`
  - bcrypt will protect us from rainbow table attack
  ```
     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
  ```

## 7.3 Form Validation

- We need to validate the form before post the data
- DB error is the last line to defense

- [`$or`](https://www.mongodb.com/docs/manual/reference/operator/query/or/) : The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
  - `const hasUser = await User.exists({ $or: [{ username }, { email }] });`

## 7.4 Status Code

- We need to send right status code to the browser to keeps the history of the only websites which the user visited safely without errors

  - 200 : Ok
  - 400 : Bad Request
    - with 4xx errors, the browser will not keep the history of the website

- How to send status on `render()` : just write `status()` before `render()`
  ```
  	return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken" });
  ```

## 7.5-6 Login

- How to compare password from the login form and the password from DB

  ```
  // Load hash from your password DB.
  bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
      // result == true
  });
  ```

- How to update data in MongoDB via terminal
  ```
   db.users.updateOne({email:"nulnu@gmail.com"},{$set:{"username":"nulnu"}})
  ```

## 7.7-8 Sessions and Cookies

- Backend can do nothing after the user logged in
  - Happens once and dies === stateless
  - When user logged in, we will give something to the user to let the user send us the piece to keep the connection with the server

### express-session

- Allow us to create a session middleware with express.
- Intialize express-session "before" router

  ```
  app.use(
    session({
      secret: "wetube-reloaded",
      resave: true,
      saveUninitialized: true,
    })
  );
  ```

- Everytime when the user visits the website, the browser gives an ID on every request

- How express-session creates session and works

  1. A user enters the page
  2. express-session creates a session id automatically
  3. express-session gives the session id to the browser
  4. The brower saves the session id on their cookies
  5. Express will save the session id on session db
  6. Everytime the brower sends requests to any URL inside the domain, the browser will send the session id with the request

- How to use express-session

  ```
  // postLogin fn
  ...
  req.session.loggedIn = true;
  req.session.user = user;
  ```

- How to send the session to pug templates?

  - pug can access to res.locals
  - you can send variables to your templates globally **using local object**
  - by creating Middleware

    ```
    export const localsMiddlware = (req, res, next) => {
      res.locals.siteName = "Nultube";
      res.locals.loggedIn = Boolean(req.session.loggedIn);
      console.log(res.locals);
      next();
    };

    ```

## 7.12 Mongo Store

### Cookie !== session

- Cookie is the way of transporting, sending and receiving the information

  - and it happened automatically

- Session IDs are saved on the COOKIE

  - Cookies are used to deliver the session ID
  - The backend keeps the record of all the sessions ever created

- The cookie,which contains the session ID, is on the browser. The session ID is on the backend

  - http is **stateless** === Connection is not forever there! It can be easily disconnecte
  - when there is POST request, it will be disconnected
  - There is no connection alive between the browser and the backend
  - => So we give the **session ID**

- Session Store is where we store the sessions
  - When the server is restarted, the session is restarted too!

```
app.use(
	session({
		secret: "Wetube reloaded",
		resave: true,
		saveUninitialized: true,
	})
);
```

- Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side. [express-session](https://www.npmjs.com/package/express-session)
- The default server-side session storage, MemoryStore, is purposely not designed for a production environment. => We need to use **session store**

### [connect-mongo](https://www.npmjs.com/package/connect-mongo)

MongoDB session store for Connect and Express written in Typescript.

- How the session is created? When the browser visits our backend!
- How to save the sessions on our database, not in the server memory with `connect-mongo`

```
app.use(
	session({
		//...
		store: MongoStore.create({ mongoUrl: URL }),
	})
);
```

## 7.13 Uninitialized Sessions

It is better to save the sessions that belongs to only logged in users
=> I am not going to give the cookies to everyone

- "saveUninitialized" === when the session is new but not modified

  - choosing `false` is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie
  - `saveUninitialized: false`는 백엔드가 로그인한 유저에게만 쿠키를 주는 것으로 설정했다는 것
  - 언제 session이 초기화 되는가? user가 로그인 했을 때 (우리 코드에서는)

- resave === 모든 리퀘스트마다 세션의 변경사항이 있든 없든 세션을 다시 저장

```
app.use(
	session({
		secret: "XXX",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: URL }),
	})
);
```

## 7.14 Expiration and Secrets

### cookie의 구성 요소?

- Secrets: a string of text that we use to sign the cookie
  - to check whether our backend gave the cookie or not (to avoid session hijack)
- Domain: 브라우저는 도메인에 따라 쿠키를 저장 => 쿠키가 적용되어야 하는 호스트 지정
- Expires : HTTP 타임스템프로 기록된 쿠키의 최대 생존 시간(수명).
- Max-Age : 쿠키가 만료될 때 까지의 시간 (1/1000초 === 밀리세컨드)

```
cookie: {
  maxAge: 20000,
},
```

### 7.15 Environment Variables

- How to use .env string

  1. create .env file
  2. add .env file on .gitignore : we don't want to upload it on our github
  3. replace any secret strings with `process.env.{VARIABLE_NAME}`

  - `process.env` means "enviroment of NodeJS process"

- [dotenv](https://www.npmjs.com/package/dotenv)
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- It should be used as early as possible, because we need to load env asap

```
// require를 사용하면 사용하려는 모든 파일의 가장 위에 적어줘야 함 -> 귀찮음
require("dotenv").config();

// 가장 먼저 로드되는 init.js 의 최상단에 적어주면 모든 파일에서 사용 가능해진다! (권장됨)
import "dotenv/config"
```
