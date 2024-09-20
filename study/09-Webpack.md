# 9 Webpack

## 9.0 Introduction to Webpack

### webpack

- We want to write sexy JavaScript, CSS => Webpack convert sexy codes that browsers cannot understand to traditional boring codes that the browsers can understand.
- webpack bundle scripts into normal JS and CSS
- We usually use tools which already has webpack inside.
- Gulp is an easy alternative for webpack, but not as powerful as webpack

- webpack은 모던 JavaScript 애플리케이션을 위한 정적 모듈 번들러 입니다.
- webpack이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성하는 디펜던시 그래프를 만듭니다.
- We don't have to configure webpack most of the time, but we need to know the industry standard!

## 9.1-2 Webpack Configuration

### What webpack can do?

- webpack can process almost everything
  - can compress .jpg file
  - turns .js file into old .js file

### Install webpack

- Install webpack and webpack cli

```
npm i webpack webpack-cli -D
```

- `webpack.config.js`

  - this file can only understand very old JS
  - entry : the files that we want to process, our sexy JS === the source code
  - output : where the transformed code goes
    - The output directory as **absolute path** (required).

  ```
  const path = require("path");
  module.exports = {
   	entry: "./src/client/js/main.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "assets", "js"),
    },
  };
  ```

- rules? A Rule can be separated into three parts — Conditions, Results and nested Rules.

  - rules for transformation of certain files
    ```
    module: {
    	rules: [
    		{
    			test: /\.js$/, // transform javascript files
    			use: {
    				loader: "babel-loader", // use babel-loader to transform the JS files
    				options: {
    					presets: ["@babel/preset-env"],
    				},
    			},
    		},
    	],
    },
    ```

- mode : by default, mode is set up as production

  - the codes transformed in "development" mode is much more readable then "production" mode code since it is COMPRESSED LESS

- Let Express know that we have a directory called "assets"
  - static files : tell Express to please allow users to see the folder

```
// server.js
app.use("/static", express.static("assets"));

// layout.pug
 script(src="/static/js/main.js") // this is for the browser, not for node.js
```

## 9.4 SCSS Loader

- SCSS : SassyCSS
- `npm i sass sass-loader -D`
- `npm i style-loader css-loader -D`
- Take SCSS -> sass-loader
  - and turn it into normal css -> css-loader
  - and bring it to the frontend -> style-loader
  - `use:["style-loader","css-loader", "sass-loader"],`
  - the process starts from the end

## 9.5 MiniCssExtractPlugin

- Browsers cannot understand SCSS, of course
- MiniCssExtractPlugin

  - We are not gonna using `style-loader` anymore
  - to have a seperate CSS file, not injecting CSS codes in JS file
  - MiniCssExtractPlugin 플러그인은 CSS 파일을 별도 파일로 추출(extract) 합니다. CSS 코드가 포함된 JS 파일 별로 CSS 파일을 생성합니다

    ```
    npm install --save-dev mini-css-extract-plugin

    // webpack.config.js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module.exports = {
      plugins: [new MiniCssExtractPlugin()],
      module: {
        rules: [
         {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        ],
      },
    }
    ```

## 9.6 Better Developer Experience

- It's annoying to run `npm run assets` everytime there is some changes
- how to delete assets automatically everytime I change sth
- => use `watch`
  ```
  module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    watch: true,
    //
  }
  ```
- Need to run two consoles : **BOTH NEED TO BE RUNNING AT THE SAME TIME**

  - `npm run starts` one for backend
  - `npm run assets` another to watch client files
    - this termianl will not be finished with `watch` option

- `output.clean` : clean the /dist folder before each build, so that only used files will be generated.

- how to stop to restart nodemon everytime we save webpack.config.js

  1. created `nodemon.json` files
  2. add this

  - ref. [nodemon github](https://github.com/remy/nodemon?tab=readme-ov-file#config-file)

  ```
  {
    "ignore": ["webpack.config.js", "src/client/*"],
    "exec": "babel-node src/init.js"
  }

  ```

  3. change the script of nodemon in `package.json`
     - ` "start": "nodemon",` <- from `"start" : nodemon --exec babel-node src/init.js`

---

### Summary

- We use Webpack to transform our frontend code
- Wepback can process CSS files
- entry? The files that we are going to transform
- output? The place where the transformed files should go
- rules in Webpack? the definition of the transformations to apply to our files
- loader? the package that will transform our files
