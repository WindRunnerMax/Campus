# SHST-CAMPUS

将版本库依赖加入`uniapp-cli`构建的`TS`模板项目，例如`https://github.com/SHST-SDUST/SHST-UNI`。

```shell
$ yarn add shst-campus-components
```

配置`vue.config.js`与`tsconfig.json`。
```javascript
// vue.config.js
const path = require("path");
module.exports = {
  transpileDependencies: ["shst-campus-components"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
                "@campus": path.join(__dirname, "./node_modules/shst-campus-components"),
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
      "@campus/*": [
        "./node_modules/shst-campus-components/*"
      ]
    },
    // ...
}
```

使用组件库，具体请参考`https://github.com/WindrunnerMax/Campus`。

```javascript
// ...
import CCard from "@campus/c-card/c-card.vue";
// ...
```