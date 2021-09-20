# SHST-CAMPUS

将版本库依赖加入`uniapp-cli`构建的`TS`模板项目，例如`https://github.com/SHST-SDUST/SHST-UNI`。

```shell
$ yarn add shst-campus
```

配置`vue.config.js`与`tsconfig.json`。
```javascript
// vue.config.js
const path = require("path");
module.exports = {
  transpileDependencies: ["shst-campus"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
                "@shst-campus": path.join(__dirname, "./node_modules/shst-campus"),
            },
        },
    },
};
```

```javascript
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@shst-campus/*": [
        "./node_modules/shst-campus/*"
      ]
    },
    // ...
}
```

使用组件库，具体请参考`https://github.com/WindrunnerMax/Campus`。

```javascript
// ...
import CCard from "@shst-campus/card/card.vue"
// ...
```