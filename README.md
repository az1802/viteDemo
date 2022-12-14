### 创建项目
pnpm create vite@leatest vite-test-app


### vite插件使用
@vitejs/plugin-vue  解析vue文件
@vitejs/plugin-vue-jsx 解析 jsx格式的文件
unplugin-auto-import/vite  自动导入第三方库的变量,省略文件模块中的import步骤
unplugin-vue-components/vite   自动导入组件,省略import  HelloWorld.vue的步骤

注意eslintrc.cjs 中引入自动生成的.eslintrc-auto-import.json
```cjs
   extends: [
    ...,
    "./.eslintrc-auto-import.json",
  ],
```
tsconfig.json中引入生成的auto-imports.d.ts,components.d.ts声明文件
```json
   "include": ["auto-imports.d.ts","components.d.ts"],
```
unplugin-vue-define-options  结合setup可以使用defineOptions()声明组件的配置信息,
注意在tsconfig.json中引入类型声明
```json
{
  "compilerOptions": {
    "types": ["unplugin-vue-define-options/macros-global"]
  }
}
```
unplugin-vue-macros  很好的扩充了vue宏和语法糖,在编译时做出优化,针对ref类型的数据可以简写.value形式(已经包含了unplugin-vue-define-options的功能)
[github地址][https://github.com/sxzz/unplugin-vue-macros/blob/HEAD/packages/define-options/README-zh-CN.md]
注意在tsconfig.json中引入类型声明
```json
{
  "compilerOptions": {
    "types": ["unplugin-vue-define-options/macros-global" ,"unplugin-vue-macros/macros-global"]
  }
}
```


### import.meta 元数据的引入和使用
.env.development
.env.production
.env.[mode]  特定模式下加载
只有使用VITE_开头的内容才会被保存,同时需要再env.d.ts中扩展import.meta.env的类型推导
```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

```



### tailwind css的使用




###


script type值
1 text/javascript 当做js来执行
2 application/json 内部的内容当做json格式的数据块来解析.格式错误则会报错

Uncaught SyntaxError: Unexpected token { in JSON at position
通常用在 ssr渲染添加数据.这样不用呗当做js进行解析,只有需要的时候再通过dom元素去获取script标签,解析json数据进行使用
3 module 浏览器可以识别es6 module格式的文件进行解析执行.
要注意, 直接在浏览器中打开文件用的是file协议, 而只有http, data, chrome, chrome-extension, chrome-untrusted, https这几个协议能使用, 需要在本地启动一个服务然后将a-module.js以http的形式请求返回.
```
<script type="module">
    import { funca } from './public/js/a-module.js';

    funca();
  </script>
```

Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。


vite 会将预构建的的包存放在node_modules/.vite中.
如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器，或者手动删除 node_modules/.vite 目录。

解析后的依赖请求会以 HTTP 头 max-age=31536000,immutable 强缓存


静态资源的处理
主要是路径问题
assetsInclude 选项扩展内部列表
assetsInlineLimit 限制资源的大小,过小的资源会被处理为base^4 data URL

异步组件加载的逻辑处理 是否都支持







vite基本配置















esm 与 commonjs 的差异

导出方式的不同
esm  import {}  from module  export {sum}  export default
commonjs   require  module.exports

动态与静态
esm   import 导入的路径不支持表达式,属于静态导入,可以做一些静态分析
commonjs 是动态导入,运行的时候才会知道导入哪些模块

值拷贝与动态映射
import 的值是引用类型更改了会影响到原模块   commonjs 是值拷贝  改变了不会影响到原模块

循环依赖
esm 因为是值引用,所有由开发者保证当导入的值被使用时已经设置好正确的值即可
commonjs  是值拷贝,所以导入的时候需要存在,否则就会是undefined







打包
代码转换  新的语法兼容 ts vue css less sass stylus image 等格式文件的转换
sourcemap  代码便于调试
minify  代码混淆

esbuild 打包node代码也是有好处的
1 转换es module 到commonjs
2 使用ts类型推断
3 转换新的语法到旧的语法 支持特定版本的node
4 打包压缩为更小的体积 加快文件的打开加载



不同打包工具处理不同问题的区形式上和原理上的区别

不同依赖方式的打包形式
第三方库
自定义的公共依赖
单独的文件
循环依赖
除js其它文件如css image less stylus jsx vue react ts  等形式的文件转换处理
