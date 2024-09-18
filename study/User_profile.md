# 8 User Profile

## 8.6-7 File Uploads

1. Create an input for file

```
label(for="avatar") Avatar
input(type="file", id="avatar", name="avatar", accept="image/*")
```

2. Need to use middleware to help us => [**multer**](https://www.npmjs.com/package/multer)

- Multer will not process any form which is not multipart (multipart/form-data).
- `enctype="multipart/form-data"`=== Our form will encoded in a different way

```
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
```

```
// userRouter
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);

// userController => console.log(file)
{
  fieldname: 'avatar',
  originalname: 'nuri_annoyed_240711.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/',
  filename: 'a5e8138bf6d71b7eb8e4e840944805f5',
  path: 'uploads/a5e8138bf6d71b7eb8e4e840944805f5',
  size: 94494
}
```

- **NEVER EVER SAVE A FILE ON A DATABASE.INSTEAD WE SAVE THE LOCATION OF THE FILE!!!**

- We have to let express know that there is upload directory!

## 8.8 Static Files and Recap

- Static file serving == expose a whole folder to the browser
- express.static(root, [options])
  - Express에 내장된 미들웨어 기능입니다. 정적 파일을 제공하며 serve-static을 기반으로 합니다. root 인수는 static asset을 제공할 root 디렉토리를 지정합니다. 이 함수는 req.url을 제공된 root 디렉토리와 결합하여 제공할 파일을 결정합니다.
  ```
  app.use("/uploads", express.static("uploads"));
  ```
