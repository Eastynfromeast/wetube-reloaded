# 3. Introduction to Express

## 3.0 Your First Server

- What is server? A computer always online

```
const app = express();
app.listen(4000, ()=>{console.log("Server listening on port 4000")});
```

- callback for `listen()` ? the function will be happen when the sever starts
  - need to tell the server what port server is listening for
  - high number ports are usaually available ex.4000

## 3.1-2 GET Requests

how to make server get request

- Http Method

  - http ? one way of communicating with server
  - GET : "Go get me the page", said the browser.

- Requests & response
  - request : user is asking or you are doing something
  - response

## 3.3 Responses

- `addEventListner` has handler and handler has `(event)`

```
b.addEventListener("click", (event)=>{
  // write something
})
```

- route handler of express has `request` object and `response` object
  ```
  const handleHome = (req, res) => {
    return res.end(); // we just kill the endless request
  };
  ```

## 3.4 Recap

- "Browser" requests something

## 3.5-6 Middlwares

### middleware

- software in the middle
- between the request and the response
- all middlewares are handlers and all handlers are middlewares
- all controllers(controller of MVC model) can be middleware

- every controller has three parameters : req, res, next

```
const gossipMiddleware = (req, res, next) => {
	console.log("I am in the middle!");
	next();
};
const handleHome = (req, res) => {
	return res.send("<h1>Home</h1>");
};

// two handlers, and first one is middleware
app.get("/", gossipMiddleware, handleHome);
```

- `app.use()` : work as global middleware, that works everywhere, every routes!

  - `app.use()`가 `app.get()`보다 먼저 위치해야함!
    ```
    app.use(gossipMiddleware);
    app.get("/", handleHome);
    ```

- middleware becomes controller when the user tries to access to the "/protected"
- middleware needs to call the `next()` to continue the connection

```
const privateMiddleware = (req, res, next) => {
	const url = req.url;
	if (url === "/protected") {
		return res.send("<h1>Not Allowed</h1>");
	}
	console.log("Allowed, you may continue");
	next();
};
```

## 3.11 External Middlewares

### morgan

- HTTP request logger middleware for node.js
- morgan is more sophisticated
- we are gonna use many many different middlewares!
