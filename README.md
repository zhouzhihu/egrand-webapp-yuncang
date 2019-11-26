# egrand-webapp-yuncang

> 云仓前端界面

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


For detailed explanation on how things work, checkout the [guide](http://hdpfe.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)
```
其他说明
```
1、所有组件样式写在styles文件夹,最后在all.scss文件统一引入，all.scss文件已经在入口引入
2、mock文件夹看快速模拟json数据
3、使用ajax的mock模拟数据，使用this.ajax({}),在请求地址前面添加mock
4、confin=>index.js 配置前端请求拦截时候，请自行替换项目aip前缀
5、router-config.js文件是配置路由的之前的项目是import引入组件，现在是直接在require写组件的    路径
6、mock数据放在static下面的mock文件夹里面，否则build打包的时候文件打的路径报错
7、main.js已经引入的饿了么主题，如需修改主题，则更换theme文件里面的css文件,element官网主题主题颜色的，可以去下载
8、如果需要修改element本身的样式，可以在当前页面修改，在当前页面修改，千万不要直接拷贝element的样式累直接修改，否则会影响其他页面
9、全新的httpclient集成的多代理tager的方法,在main.js引入的时候只需要动态传入对应的参数，动态挂载的vue全局上(具体看文档)
10、之前的authjs文件的方法已经集成到httpclient上，并且已经挂载到vue全局 ,具体使用方法（具体看文档）
11、添加同步请求的发布，方便处理请求1，请求2的返回结果依赖到请求3的参数params，之前是互相嵌套的。现在使用 同步的            httpclient方法（具体看文档第7点）
12、文档地址：https://shimo.im/docs/fyt50L0o1C4YWNjt
```
项目执行npm install 后面运行时如果报错
```

Vue packages version mismatch:

- vue@2.5.6
- vue-template-compiler@2.5.16

This may cause things to work incorrectly. Make sure to use the same version for both.
If you are using vue-loader@>=10.0, simply update vue-template-compiler.
If you are using vue-loader@<10.0 or vueify, re-installing vue-loader/vueify should bump vue-template-compiler to the latest.

 @ ./src/router-config.js 18:8-38

```
执行npm install vue@2.5.16
