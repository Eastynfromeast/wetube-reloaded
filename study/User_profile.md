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
