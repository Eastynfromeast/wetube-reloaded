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
