## React 是什么

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
  + Vnode 的好处也显而易见，DOM 操作作为浏览器中消耗资源最大的东西，去 频繁操作 或 diff 可真的太恶心人了，为了让性能更好，React 也使用了 Vnode，它能使用一个较为简单的对象去描述 DOM。
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



### 注意事项

+ JSX 并不是 html，也不是字符串，它的编写有以下注意事项
  1. 标签名全部都要小写
  2. 组件名首字母大写
  3. 它可以配合 JavaScript 表达式一起使用
  4. JSX 中有些属性编写时有特殊写法。例如：class、style
  5. 所有标签必须要闭合，哪怕是单标签
  6. JSX 中必须有一个顶层包含容器
     - 如果不想输出这个包含容器，可以使用 `<Fragment>` 或 `<></>`
     - 它们表示文档碎片，将不会在真实 DOM 输出
  7. 列表渲染时，必须有 key 值
+ 下面我们会挑一些出来说说，或再找到什么需要注意的时候再补充



### 插值表达式

+ 与 Vue 的插值表达略有不同，以 `{}` 表示，接收的是一个 js 表达式
+ js 表达式：运行之后有一个值的运算就叫做表达式；变量、运算、函数调用

```javascript
let title = 'hello React';
let header = (
  <header id="header" className="header">
    <h1>{title}</h1>
    <p>这是副标题</p>
  </header>
)
```

+ 如果是想在 `attributes` 中使用插值表达，则省略 `""`

```javascript
let classname = 'header';
let header = (
  <header id="header" className={classname}></header>
)
```

+ 注意：
  + JSX内 `class` 需要写成 `className` - 这是为了避免与 类 冲突
  + style 必须以对象的形式表示

```javascript
let classname = 'header';
let _style = {
  width: 100,
  borderBottom: '1px solid #000',
  color: '#999'
}

let header = (
  <header id="header" className={classname} style={_style}></header>
)

// 或者你想偷懒也可以这么写
let header2 = (
  <header id="header" className={classname} style={{
    width: 100,
    borderBottom: '1px solid #000',
    color: '#999'
  }}></header>
)
```



### 条件渲染

+ 在 JSX 内容中，不同类型的插值表现

  1. 简单类型

  	- 字符串、数字：原样输出
  	- 布尔值、空、未定义 会被忽略
  2. 复杂类型：
     - 数组: 忽略掉，后拼接输出
     - 对象：不能再内容中输出（报错）
+ 条件渲染
  + `||` 、 `&&` 、 `?`
+ 注释：通过 `{/*  */}` 表示

```javascript
// let title = 'hello React';
// let title = [1, 2, 3];
let title = {
  val: 'hello React'
}

let header = (
  <header id="header" className="header">
    {/* {<h1>{true && title}</h1>} */}
    {/* {<h1>{false || title}</h1>} */}
    {<h1>{true ? '标题' : title.val}</h1>}
    <p>这是副标题</p>
  </header>
)
```



### 列表渲染

+ React 没有类似 Vue 的 `v-for` 语法糖，它实际上就是通过原生 js 遍历返回
+ 先看看简单的吧~

```javascript
let dataList = [
  <li>列表项1</li>,
  <li>列表项2</li>,
  <li>列表项3</li>
]

let ul = <ul>{dataList}</ul>
```

+ 像上面的例子，有没有觉得恶心至极，这不就是把数组直接塞进去吗？而且报错是怎么回事？
+ 跟 Vue 一样，循环渲染必须有一个唯一标识的 `key` ，它们的作用都是一样的，为了 `diff` 的时候能找到对应项从而降低消耗，`diff` 的具体我们以后有空再说~
+ 当然我们实际工作中是不会像上面的例子这么去操作的，再看看下面的例子~

```javascript
let data = [{
  id: 1,
  val: '列表项1'
}, {
  id: 2,
  val: '列表项2'
}, {
  id: 3,
  val: '列表项3'
}];

let ul = (
  <ul>
    {data.map(item => <li key={item.id}>{item.val}</li>)}
  </ul>
)
```

+ 我们可以看到，React 真的不会做别的事情，这只是 js 的原生遍历而已



### 函数渲染

+ 在我们的数据复杂，需要提前处理逻辑等的时候我们就不能简单的遍历出来了
+ 这个时候我们可以借助函数帮助
+ 下面的例子需求：两个数据一起渲染，按照 id 从大到小的顺序，只渲染单数的列表项

```javascript
let data = [{
  id: 1,
  val: '列表项1'
}, {
  id: 2,
  val: '列表项2'
}, {
  id: 3,
  val: '列表项3'
}];

let data2 = [{
  id: 4,
  val: '列表项A'
}, {
  id: 5,
  val: '列表项B'
}, {
  id: 6,
  val: '列表项C'
}];

function setInner() {
  let newData = [...data, ...data2];
  newData = newData.filter(item => item.id % 2);
  newData.sort((a, b) => b.id - a.id);

  return newData.map(item => <li key={item.id}>{item.val}</li>)
}

let ul = (
  <ul>
    {setInner()}
  </ul>
)
```

## 受控组件
+ 当想要获取表单的一些内部状态时，就可以将表单的内部状态和组件的状态进行绑定，这样形成受控组件
    - 受控组件：让 **表单控件** 的内部状态 和 组件内 **state** 保持一致
    - 非受控组件：不需要同步状态
+ 熟悉 Vue 的朋友这个时候肯定很容易的想到 `v-model` 进行双绑，但 React 并没有这种语法糖，我们只能手动的通过事件实现
+ 注意如果一个 `<input>` 如果未受控的情况，React 将会抛出错误，如果你并不想让组件受控，那么应该使用 `defaultValue` 或 `defaultChecked`
```javascript
class App extends Component {
    state = {
        val: '',
        bol: true
    }
    render() {
        let { val, bol } = this.state;
        return (
            <div>
                <input value={val} onChange={({ target }) => {
                    this.setState({
                        val: target.value
                    })
                }} />
                <input defaultValue={val} />
                <p>{val}</p>

                <input type="checkBox" checked={bol} onChange={({ target }) => {
                    this.setState({
                        bol: target.checked
                    })
                }} />
                <input type="checkBox" defaultChecked="true" />
                <p>{bol + ''}</p>
            </div>
        )
    }
}
```



## end

+ React 的入门和 JSX 就差不多是这么多辣\~相信大家都会觉得挺简单的吧\~
+ 加油\~ 越努力越幸运\~