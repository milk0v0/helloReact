## React 是啥

+ 跟 Vue 不同，React 只是一个 js 库，主要用于构建 UI，很多人认为 React 是 MVC 中的 V（视图）
+ 因为它只是一个库，所以它并没有 Vue 这么多的 API，很多东西都是通过 js 去实现的
+ 因为它拥有较高的性能，代码逻辑简单，越来越多人关注使用它，也开发了很多周边衍生产品，随着社区越来越丰富，它也越来越像是一个渐进式框架
+ 特点
  1. **声明式设计** −React采用声明范式，可以轻松描述应用。
  2. **高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互。
  3. **灵活** −React可以与已知的库或框架很好地配合。
  4. **JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
  5. **组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
  6. **单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。



## 简单使用 React

### 通过 `<script>` 标签引入 React

```html
<script src="react.js"></script>
<script src="react-dom.js"></script>
```

+ react.js - 核心代码
+ react-dom.js - React 剥离出的涉及 DOM 操作的部分，它可以帮助我们把一个组件挂载到某一个dom节点上



### render && ReactElement

+ `ReactDOM.render(Vnode, container[, callback])`
  + Vnode：要渲染的内容，可以是数字、字符串 或 ReactNode（虚拟DOM）
  + container: 要挂在的容器（要将内容渲染到哪个元素中）
  + callback 渲染完时的回调
+ `createElement(type, props, children)`
  + 与 Vue 的 `createElement` 和 `snabbdom.js` 非常相似，也是为了创建 Vnode
  + Vnode 的好处也显而易见，DOM 操作作为浏览器中消耗资源最大的东西，去 频繁 或 diff 可真的太恶心人了，为了让性能更好，React 也使用了 Vnode，它能使用一个较为简单的对象去描述 DOM。
  + type: 标签类型
  + props：属性
  + children：子节点 - 可以是数组、字符串、ReactNode

```javascript
let header = React.createElement('header', {
    id: 'header'
}, '头部');

console.log(header);

ReactDOM.render(
    header,
    document.querySelector('#app')
)
```



### React脚手架

+ 这个就不详谈了

```sh
npm install create-react-app -g

create-react-app <projectName>
```



## JSX

+ 像上面的例子，创建一个 Vnode 需要使用 `React.createElement` 函数，但如果我的结构较为复杂，这么写复杂度和阅读性都非常的差。
+ JSX 就可以很好解决这个问题



### JSX是什么

+ JSX 是 JS 的语法扩展，它使得我们可以再 JavaScript 中编写 **XML**。
+ 注意：是 XML，而并非 HTML，更不是字符串，所以它的编写与我们平时写 HTML 是有些区别的

```javascript
let header = (
    <header id="header">
    <h1>这是标题</h1>
    <p>这是副标题</p>
    </header>
)

// 通过 babel 编译后
var header = React.createElement(
    "header",
    { id: "header" },
    React.createElement(
        "h1",
        null,
        "\u8FD9\u662F\u6807\u9898"
    ),
    React.createElement(
        "p",
        null,
        "\u8FD9\u662F\u526F\u6807\u9898"
    )
);
```



