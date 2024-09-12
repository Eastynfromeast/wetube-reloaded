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
