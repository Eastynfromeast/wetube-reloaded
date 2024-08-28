# A03 Middlewares

## Tasks

- URL Logger: 이 미들웨어는 방문 중인 URL을 기록(log) 해야 합니다.
- Time Logger: 이 미들웨어는 요청(request)의 년, 월, 일을 기록해야 합니다.
- Security Logger: 이 미들웨어는 프로토콜이 https이면 secure이라고 기록하고, 그 외의 경우 insecure라고 기록해야 합니다.
- Protector Middleware: 이 미들웨어는 사용자가 /protected로 이동하려고 할 경우 이동하지 못하도록 해야 합니다.

## Example

console 창에 이와 같이 기록

```
Path:  /
Time: 2021.4.25
Insecure
```
