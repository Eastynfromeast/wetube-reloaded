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

## 2.2 Understanding Dependencies

### `npm install`

- npm은 굉장히 똑똑해서 package.json의 dependencies를 보고 필요한 모듈들을 알아서 설치함
- node_modules은 무거우니까 깃에 올릴 필요 X, package.json만 올리면 원하는 걸 설치 가능
  : 모든 정보는 package.json에 있으니까

### package-lock.json

- basically locked
- 다른 환경에서도 package-lock.json이 있다면 완벽하게 똑같은 버전의 dependencies들을 다운 받을 것!

### dependencies

- 프로젝트를 구동시키는데 필요한 모듈들!

## 2.3 The Tower of Babel

### Babel is a JavaScript complier

- Bable은 우리가 작성한 최신 자바스크립트를 nodeJS가 이해할 수 있도록 컴파일 하기 위해 사용

### devDependencies

- devDependencies ? 개발자에게 필요한 dependencies

- `npm install --save-dev @babel/core`
- package.json은 그냥 텍스트 파일이라 옮겨주고 싶으면 잘라서 붙여넣거나 하면 됨

- presets : 최신 JS구문을 사용하도록 해줌

  ```
  {
    "presets": ["@babel/preset-env"]
  }
  ```
