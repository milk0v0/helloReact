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

