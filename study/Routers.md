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
