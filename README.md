## 特性

- ⚡️ [Vite 4](https://cn.vitejs.dev) - 构建工具（就是快！）
- 🖖 [Vue 3](https://cn.vuejs.org) - 渐进式 JavaScript 框架
- 🚦 [Vue Router](https://router.vuejs.org/zh) - 官方路由管理器
- 📦 [Pinia](https://pinia.vuejs.org/zh) - 值得你喜欢的 Vue Store
- 💻 [Naive UI](https://www.naiveui.com/zh-CN) - Naive UI 尤雨溪推荐使用的 Vue3 组件库
- 🎨 [Less](https://less.bootcss.com/) - CSS 预处理器
- 🔗 [Axios](https://axios-http.com/zh/) - 一个基于 promise 的网络请求库，可以用于浏览器和 node.js
- 🧰 [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) - Git Hook 工具
- 🛡️ [EditorConfig](http://editorconfig.org) + [ESLint](http://eslint.cn) + [Prettier](https://prettier.cn) + [Stylelint](https://stylelint.cn) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation) - 代码规范
- 🔨 [Commitizen](https://cz-git.qbb.sh/zh) + [Commitlint](https://commitlint.js.org) - 提交规范

## 目录结构

```
├── dist/
└── src/
    ├── api/                       // 接口请求目录
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
        ├── modules/               // 路由模块
        ├── index.js               // 路由配置文件
    ├── store/                     // 状态管理目录
        ├── modules/               // 仓库模块
        ├── index.js               // 仓库配置文件
    ├── style/                     // 通用样式目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.js
├── tests/                         // 单元测试目录
├── index.html
├── jsconfig.json                  // JavaScript 配置文件
├── vite.config.js                 // Vite 配置文件
└── package.json
```

##
