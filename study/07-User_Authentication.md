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
