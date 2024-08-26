# 2. Set up

## 2.0 Your First NodeJS Project

- package.json
  - the first file you have to create when you start your nodeJS project
  - `npm init` : create package.json

## 2.1 Installing Express

- `scripts` : something you want to run

```
{
  // ...
	"scripts": {
		"start": "node index.js"
	},
}
```

- 이렇게 작성한 script를 어떻게 쓰나요? => `npm run start`

### `npm i express`

- express는 다른 패키지들이 필요하다!
- node_modules/express 도 package.json을 가지고 있다
- dependencies? nodeJS 프로젝트가 실행되려면 필요한 패키지들
  - `npm install <package name>`으로 패키지를 다운받으면 그에 따른 dependencies도 같이 다운 받는 것
  - devDependencies는 다운받아 지지 않음

### what is node_modules?

- npm으로 설치한 모든 패키지가 저장될 곳
- npm이 자동으로 만들어 준다
