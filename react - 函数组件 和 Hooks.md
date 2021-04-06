## 函数式组件

+ 函数式组件，本质就是一个常规函数，接收一个参数 props 并返回一个 reactElement
+ return - 返回我们要构建的视图
+ 在 React 16.7 之前，没有 Hooks，函数式组件是非常单纯的，它里面没有 state 也没有 生命周期，一般被用作纯渲染组件，所以也被称作 无状态组件

```javascript
import React from 'react'

export default function App() {
    return (
        <div>
            <h1>Hello React</h1>
        </div>
    )
}
```



## React Hooks

+ React Hooks 是 React 在 16.8 中正式新增的功能，它可以让我们在无需编写类组件的情况下也可以使用 state 和 其他 React 功能
+ 正是它的出现，使得 函数组件 可以替换 类组件



### useState(initialState)

+ 使用状态
+ 接收一个初始化参数
+ `const [state, setstate] = useState(initialState)`
  - const [状态, 设置状态的方法] = useState(初始值)
  - 在同一个组件中可以使用 useState 定义多个状态
  - useState 返回的 setState 方法，不会进行对象合并 - 所以如果 state 是复杂类型记得把之前的值合并以下
  - useState 返回的 setState 方法同样是异步方法

```javascript
function Child(props) {
    // const [count, setCount] = useState(1);
    // const [name, setName] = useState('milk');
    const [state, setState] = useState({
        name: 'milk',
        count: 1
    })
    const { name, count } = state

    return (
        <div>
            <input value={name} onChange={({ target }) => {
                // setName(target.value);
                setState({
                    ...state,
                    name: target.value
                })
            }} />
            <p>{count}</p>
            <button onClick={() => {
                // setCount(count + 1);
                setState({
                    ...state,
                    count: count + 1
                })
            }}>递增</button>
        </div>
    )
}
```




### useEffect (副作用 hook)

+ 副作用：DOM、异步、请求等

```javascript
useEffect(() => {
    // 副作用函数
    return () => {
        // 副作用函数的返还函数
    }
}, [依赖参数])
```

+ 依赖参数：监听对应参数修改时，或组件挂载时执行
  + 不写依赖参数时，只要组件更新就会执行 副作用函数
  + 当 依赖参数 [] 时，副作用函数只在挂载完之后执行
+ 挂载阶段
  + render -> 副作用函数
+ 更新阶段
  + render -> 返回函数（即将更新） -> 完成更新（副作用函数）
+ 卸载阶段
  + 返回函数（即将卸载）

```javascript
import React, { useState, useEffect, Fragment } from 'react'

let upDate = false;

export default function Child(props) {
    const [count, setCount] = useState(1);
    // 参数为 []
    useEffect(() => {
        console.log('组件挂载完成');
        return () => {
            console.log('组件即将卸载');
            upDate = false;
        }
    }, [])
    useEffect(() => {
        // 参数不填 或 需检测某状态
        // 组件挂载阶段 以及 更新阶段都会触发，使用 upDate 判断
        if (upDate) {
            console.log('count 更新完成');
        } else {
            upDate = true;
        }
        return () => {
            console.log('count 即将更新');
        }
    }, [count])
    return (
        <Fragment>
            <div>{count}</div>
            <p>
                <button onClick={() => {
                    setCount(count + 1);
                }}>+1</button>
            </p>
        </Fragment>
    )
}
```

+ `useEffect` 如果需要区分 挂载/更新 阶段需要使用一个参数去判断，上面使用了一个全局变量去判断，看似是一种很好的解决方案，实则不然
+ 组件的最大意义之一就是复用，那么当我们复用这个组件时就会发生混乱，那怎么办呢？我们看下 `useRef`



### useRef

+ 还记得类组件的 `createRef` 吗？Hooks 对应的就是 `useRef`
+ 它除了 `createRef` 的功能之外，还额外有别的功能 - 记录组件更新前的数据
  - 当 `useRef` 存储的是数据，而非获取 DOM 或者 组件实例 时，源数据发生改变，ref 中储存的数据并不会随之改变，而需我们手动改变
  - 经过 挂载阶段 初始化后，只要我们不去手动更改它，他就不会更新
  - 通过 ref 的这个特性，我们就可以跨组件的更新阶段传递信息 - 获取组件更新前的信息

```javascript
function Child(props) {
    const [count, setCount] = useState(1);

    const div = useRef(); // 获取 DOM
    const upDate = useRef(count); // 获取源信息
    useEffect(() => {
        console.log(upDate);
        upDate.current = count; // 需要手动改变它才会更新，否则经过 挂载阶段 初始化后，不再发生变化
    })

    return (
        <div ref={div}>
            <p>{count}</p>
            <button onClick={() => {
                setCount(count + 1);
            }}>递增</button>
        </div>
    )
}
```



### 使用 ref 区分 useEffect 挂载/更新 阶段

+ 使用 `ref` 记录的特性区分 `useEffect` 挂载/更新 阶段

```javascript
import React, { useState, useEffect, useRef } from 'react'

export default function App(props) {
    const [count, setCount] = useState(1)
    const upDate = useRef(false);

    useEffect(() => {
        console.log('componentDidMount');
        return () => {
            console.log('componentWillUnmount');
        }
    }, [])
    useEffect(() => {
        if (upDate.current) {
            console.log('componentDidUpdate');
        } else {
            upDate.current = true;
        }
        return () => {
            console.log('componentWillUpdate');
        }
    })
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => {
                setCount(count + 1)
            }}>+1</button>
        </div>
    )
}
```



### 自定义 Hooks

+ Hooks 的好处是 简化组件逻辑 和 方便复用状态，其中最大的体现就是 自定义Hooks
+ 它可以把复杂的逻辑拿出来，需要使用的时候再引用，这样我们的组件看起来就干净很多，易读性和可维护性也会提升
+ 自定义 hooks 必须以 **use** 为开始命名
+ 自定义 hooks 内可使用 其他 hooks
+ 栗子：[使用自定义 Hooks 获取/设置滚动条位置](https://github.com/milk0v0/helloReact/tree/master/src%20-%20myHooks)



### Hooks 使用规则

+ 只能在 React 函数中调用 Hooks
+ 只在最顶层使用 Hooks
  + 在函数内只能在最外层使用 - 哪怕只是做了一个判断

```javascript
function App(props) {
    useEffect(() => { }); // √
    if (1 === 1) { useEffect(() => { }} // ×
    return <div></div>
}
```

