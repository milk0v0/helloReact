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



