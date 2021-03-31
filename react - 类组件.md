## 前言

+ 我在之前 [Vue组件](https://juejin.cn/post/6901284877547765773) 的时候谈过为什么组件化，何为组件化，这里我就不再赘述了
+ 与 Vue 不同，React 没有 SFC(.vue)，它的组件，只是一个一个 JS 文件。
+ React 的组件有两种，一种是类组件，一种是函数组件，它们都有不同的特点和写法，接下来让我们看看 类组件



## 基本使用

1. 建立静态视图
2. 拆分组件
3. 关联数据
4. 处理状态



### 组件调用

+ 通过 JSX 的形式进行调用，注意组件首字母必须是大写 - 使用大驼峰命名法

```javascript
import App from './App'
ReactDOM.render(
  <App></App>,
  document.querySelector('#root')
)
```



### 组件创建

1. 使用类组件时，必须继承自 `React.Component`
2. 类组件必须有一个 react 方法（引入 React），在 render 的 return 中定义该组件要构建的视图
3. 需对组件导出

```javascript
import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return <div></div>
    }
}
```



### PureComponent

+ React 中有一个被人诟病的性能问题，当一个状态发生变化时，依赖这个状态全部组件都会进行重新的渲染（Vnode），无论多大
  + 可能有的小朋宇就会问啦，他不是改变状态时，diff 会计算出组件 DOM 树的不同，然后找到真正变化的 DOM，再进行部分渲染吗？
  + 这个说法，其实是有问题的，他虽然不会真正改变页面视图，但是他会将依赖到这个状态的所有组件重新生成 Vnode、diff，这样无疑是会增加性能耗费的
  + 另外提一点，在 Vue2 中每一个组件都会都会存在至少一个 Watcher 以观察每一个组件的状态变化，不会渲染整个组件树
+ 那这样我们怎么去优化他呢？我们可以使用 [shouldComponentUpdate](#upDate) 去对他的前后数据进行对比，从而阻止组件继续更新

```javascript
class Child extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // 这里大概写个栗子，具体情况看实际项目
        return !(nextProps === this.props && nextState === this.state)
    }
    render() {
        return <div></div>
    }
}
```

+ 那不过好像全部都这么写很麻烦，有没有简单点的办法呢？使用 `PureComponent` 可以帮助你减少一些工作量
+ `PureComponent` 内部提供了一个对 state 和 props 的浅对比，其他的功能跟 `Component` 一样
+ 值得注意的是，因为 `PureComponent` 有一个前对比，如果数据是复杂类型的情况下，需要返回一个新的引用，否则组件将不会更新，我们可以使用解构语法方便的做到这一点

```javascript
import React, { PureComponent } from 'react'

class Child extends PureComponent {
    render() {
        return <div></div>
    }
}
```



## 组件的视图更新 - state

+ React 的视图更新类似与一种状态机，即：状态是什么的时候显示是怎么样
+ 类组件使用 state 状态管理视图的更新 - 使用 state 存放组件自身的数据
+ 通过 setState 更新状态，会引起组件更新（视图重新渲染）
+ setState 接收两个参数：
  + updater: 更新数据 FUNCTION/OBJECT
  + callback: 更新成功后的回调 FUNCTION
+ setState 有两个特点：
  + 异步：react 通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
  + 浅合并：会进行浅合并，我们只需要修改需要修改的状态 - Objecr.assign()
+ 调用 setState 之后，会触发生命周期，重新渲染组件

```javascript
import React, { Component } from 'react';

class App extends Component {
    state = {
        count: 1,
        name: 'milk'
    }
    render() {
        console.log('准备渲染/更新组件');
        let { count, name } = this.state;
        return (
            <div>
                <p>name: {name}</p>
                <p>count: {count}</p>
                <button onClick={() => {
                    // object
                    this.setState({
                        name: 'newMilk'
                    });
                    // function
                    this.setState(() => {
                        count++
                        return {
                            count
                        }
                    }, () => {
                        console.log('组件更新完成');
                    });
                }}>递增</button>
            </div>
        )
    }
}
```



## 类组件的事件

+ 注意事件名是小驼峰
+ 因为 JSX 内事件实际并不是由该类本身调用，务必会发生 this 的改变，事件处理函数的 this 默认是 undefined
+ 通过绑定 this 解决

```javascript
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        // 使用 bind 改变 this 指向
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        console.log(this);
    }
    render() {
        let { count } = this.state
        return (
            <div>
                <p>{count}</p>
                <button onClick={this.handleClick}>递增</button>
            </div>
        )
    }
}
```

+ 使用箭头函数语法

```javascript
class App extends Component {
    state = {
        count: 1
    }
    handleClick = () => {
        console.log(this);
    }
    render() {
        let { count } = this.state
        return (
            <div>
                <p>{count}</p>
                <button onClick={this.handleClick}>递增</button>
            </div>
        )
    }
}
```



## 组件间通信 - props

+ 组件之间进行信息传递
  + 父传子：
    + 父组件调用子组件时，把数据添加子组件的属性中，然后子组件中从 props 属性中，获取父级传递过来的数据
  + 子传父：
    + 并没有像 Vue 的 $emit 方法
    + 在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息
  + 兄传弟：
    + 将数据托管给父级上，然后分别传给子级
+ 我们可以看的出简单的组件通信，就只通过一个 props ，确实很单纯，也让我们少背很多API
+ 注意：在 React.js 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的
+ 以下示例，Child 是 App 的子组件
+ App

```javascript
class App extends Component {
    state = {
        name: 'milk'
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name } = this.state;
        return (
            <div>
                <Child name={name} setName={this.setName}></Child>
            </div>
        )
    }
}
```

+ Child

```javascript
export default class Child extends Component {
    state = {
        count: 1
    }
    render() {
        let { count } = this.state;
        let { name, setName } = this.props;
        return (
            <div>
                <p>name: {name}</p>
                <p>count: {count}</p>
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    })
                }}>递增</button>
                <button onClick={() => {
                    setName('牛奶')
                }}>中文名</button>
            </div>
        )
    }
}
```



## 跨组件通信 context

+ 想象一种场景，还是那个场景，一个结构：父组件 -> 子组件 -> 孙组件，这种情况我们怎么去传递信息呢？
+ 当然我们第一个会想到就是 props，那不是很简单嘛，传下去，传下去不就好了嘛
+ 例子：App -> Child -> SubChild
+ App

```javascript
class App extends Component {
    state = {
        name: 'milk'
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name } = this.state;
        return <Child name={name} setName={this.setName}></Child>
    }
}
```

+ Child

```javascript
class Child extends Component {
    render() {
        // 直接结构 props 向下传递
        return <SubChild {...this.props}></SubChild>
    }
}
```

+ SubChild

```javascript
class SubChild extends Component {
    render() {
        let { name, setName } = this.props;
        return (<div>
            <p>name: {name}</p>
            <button onClick={() => {
                setName('牛奶')
            }}>中文名</button>
        </div>)
    }
}
```



+ 如果只是上面这种情况也就算了，但如果是~~子子孙孙无穷尽~~很多子孙咋办，不可能全部都传吧，又麻烦，来源又不好找
+ 那到底咋办呢？熟悉 Vue 的朋友可能就想到了 `provide` 和 `inject`，react 也有差不多的方法 - content
+ `React.createContent` - 创建一个上下文的容器
+ `Provider` - 生产者，用于生产共享数据的地方，放置共享的数据放在 value
+ `Consumer` - 消费者，它们专门消费生产者生产的数据，它需要嵌套在生产者下面。才能通过回调的方式拿到共享的数据源
+ 例子：App -> Child -> SubChild

```javascript
import { createContext } from 'react'

const content = createContext();
const { Provider, Consumer } = content;

export { Provider, Consumer };
export default content;
```

+ App

```javascript
import { Provider } from './content'
class App extends Component {
    state = {
        name: 'milk'
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name } = this.state;
        return (
            <div>
                <Provider value={{
                    name: name,
                    setName: this.setName
                }}>
                    <Child></Child>
                </Provider>
            </div>
        )
    }
}
```

+ SubChild

```javascript
// 用法一：使用 <Consumer> 包裹需用到数据的部分，通过回调使用
class SubChild extends Component {
    render() {
        let { count } = this.state;
        return (
            <Consumer>
                {(content) => {
                    console.log(content);
                    return (<div>
                        <p>name: {content.name}</p>
                        <button onClick={() => {
                            content.setName('牛奶')
                        }}>中文名</button>
                    </div>)
                }}
            </Consumer>
        )
    }
}
```

+ 看，是不是很方便，并不需要一层一层的往下传递了，但是，还是有些问题的。`<Consumer>` 太麻烦了，哪里要使用到数据就需要多写这么多东西，这个嵌套我看着也很不爽，不好看
+ 那么我们还可以使用方法二，给类私有属性 contextType 绑定 content，之后我们就可以通过 this.context 访问到数据

```javascript
// 方法二
class SubChild extends Component {
    // 绑定1
    static contextType = content;
    render() {
        let { name, setName } = this.context;
        return (<div>
            <p>name: {name}</p>
            <button onClick={() => {
                setName('牛奶')
            }}>中文名</button>
        </div>)
    }
}

// 绑定2
// SubChild.contextType = content;
```

+ 主要跟 Vue 的 `provide` 和 `inject` 一样，建议是不在项目中使用的，一般在封装高级组件的时候使用



## 组件的生命周期

+ 所谓的生命周期就是指某个事物从开始到结束的各个阶段，当然在 React.js 中指的是组件从创建到销毁的过程，React.js 在这个过程中的不同阶段调用的函数，通过这些函数，我们可以更加精确的对组件进行控制，前面我们一直在使用的 render 函数其实就是组件生命周期渲染阶段执行的函数
+ react 组件的生命周期分为 挂载、更新、卸载 三个阶段



### 挂载阶段

+ mount - 组件创建 -> 组件创建虚拟 DOM -> 生成、挂载到真实 DOM 中

> 1. `constructor(props)` - 初始化组件
> 2. `static getDerivedStateFromProps(props)` - 将 props 中的某些数据关联到状态 state 中
> 3. `render()` - 调用 render 方法，生成虚拟 DOM
> 4. `componentDidMount` - 组件挂载完成

```javascript
class Child extends Component {
    constructor(props) {
        console.log(0, '初始化组件');
        super(props);
        this.state = {
            count: 1
        }
    }
    // 将 props 中的某些数据关联到状态中
    static getDerivedStateFromProps(props) {
        // 将对应的数据添加到 state 中
        console.log(1, '将 props 关联至 state');
        return {
            name: props.name
        }
    }
    // 组件挂载完成，如果要获取真实 DOM，在该方法中获取
    componentDidMount() {
        console.log(3, '组件挂载完成');
        console.log(document.querySelector('#name'));
    }
    render() {
        console.log(2, '调用 render 方法，根据 render 的返回值，生成虚拟 DOM');
        let { name, count } = this.state;
        let { setName } = this.props;
        return (
            <div>
                <p id="name">name: {name}</p>
                <p>count: {count}</p>
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    })
                }}>递增</button>
                <button onClick={() => {
                    setName('牛奶')
                }}>中文名</button>
            </div>
        )
    }
}
```



### <span id="upDate">更新阶段</span>

> 1. `static getDerivedStateFromProps(props)` - 将 props 中的某些数据关联到状态 state 中
> 2. `shouldComponentUpdate(nextProps, nextState)` - 控制组件是否更新
>    - nextProps - 更新之后的 props
>    - this.props - 更新之前的 props
>    - nextState - 更新之后的 state
>    - this.state - 更新之前的 state
>    - 返回值：true 继续更新流程，进行组件更新，false 打断更新流程，不再继续更新
> 3. `render()` - 调用 render 方法，生成虚拟 DOM
> 4. `getSnapshotBeforeUpdate(prevProps, prevState)` - 获取并返回更新前的 DOM 快照
> 5. `componentDidUpdate(prevProps, prevState, prevDOM)` - 组件更新完成
>    - prevDOM - `getSnapshotBeforeUpdate` 返回值

```javascript
class Child extends Component {
    state = {
        count: 1
    }
    // 将 props 中的某些数据关联到状态中
    static getDerivedStateFromProps(props) {
        // 将对应的数据添加到 state 中
        console.log(0, '将 props 关联至 state');
        return {
            name: props.name
        }
    }
    // 控制组件是否更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log(1, '控制组件是否更新');
        // nextProps - 更新之后的 props
        // this.props - 更新之前的 props

        // nextState - 更新之后的 state
        // this.state - 更新之前的 state

        return true // true 继续更新流程，进行组件更新，false 打断更新流程，不再继续更新
    }
    // 获取更新前的 DOM 快照
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 获取更新前的 DOM 快照：在这一步组件即将去更新视图（真实 DOM），我们可以获取更新前的 DOM 树状态
        console.log(3, '获取并返回更新前的 DOM 快照');
        let count = document.querySelector('#count');
        return count.innerHTML
    }
    // 组件更新完成
    componentDidUpdate(prevProps, prevState, prevDOM) {
        console.log(4, '组件更新完成');
        let count = document.querySelector('#count');
        console.log(prevDOM);
        console.log(count);
    }
    render() {
        console.log(2, '调用 render 方法，根据 render 的返回值，生成虚拟 DOM');
        let { name, count } = this.state;
        let { setName } = this.props;
        return (
            <div>
                <p id="name">name: {name}</p>
                <p id="count">count: {count}</p>
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    })
                }}>递增</button>
                <button onClick={() => {
                    setName('牛奶')
                }}>中文名</button>
            </div>
        )
    }
}
```



### 卸载阶段

> 1. `componentWillUnmount` - 组件即将卸载
>    - 一般用于删除添加在全局的一些信息或操作

```javascript
class Child extends Component {
    state = {
        size: window.innerWidth
    }
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                size: window.innerWidth
            })
        };
    }
    // 组件即将卸载
    componentWillUnmount() {
        console.log(0, '组件即将卸载');
        window.onresize = null;
    }
    render() {
        let { size } = this.state;
        return (
            <div>
                <p>size: {size}</p>
            </div>
        )
    }
}
```



### 图示

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52c1ca2551d24f5dbc7dad7a0105bf03~tplv-k3u1fbpfcp-watermark.image"/>

