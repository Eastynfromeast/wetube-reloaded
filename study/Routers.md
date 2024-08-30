# 4. Routers

## 4.0 What are Routers?

- router allows you to organize your controller and urls in an easier way

## 4.1 Making Our Routers

- Exceptions of creating routes
  - user가 login 하지만 login 루트를 `/users/login` 이라고 하지 않는 이유?
    : 사용자 편의 중심을 위해 global router로 사용 (너무 길어서 마케팅적으로도 좋지 않음)
  - we want to have CUTE URLS

```

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

// 누군가 /users 라는 url에 접근하면 userRouter에 있는 컨트롤러를 찾게 함
app.use("/users", userRouter);
```

## 4.2 Cleaning the code

- 일단 코드를 짜고 그 다음에 코드를 깔끔하게 정리하자!
- Divide and Conquer

- Every file is a module and every file is a bubble in nodeJS

  - everything in a file is completely isolated until it is exported

  ```
  // /src/routers/globalRouter.js
  export default globalRouter;

  // /src/server.js
  // import 할 때 이름 변경 가능 왜냐? default 값을 export 했으니까
  import globalRouter from "./routers/globalRouter";
  ```

## 4.3 Exports

- router is just a beginning of url

- writing controller codes with router is nonsense => create `/src/controllers`
- globalRouter is for beautiful urls

- `export const` 로 export 됐을 경우에는 이름을 그대로 써줘야
