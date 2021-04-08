/* eslint-disable jsx-a11y/alt-text */
import url from './img.jpg'

/**
 * img 的 src
 *  1. 线上绝对路径
 *  2. 本地相对，但是要当作模板引入
 *  3. base64
 */

export default function App() {
    return <div>
        <img width="300" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2f464a8198a45819534b81de92f464b~tplv-k3u1fbpfcp-watermark.image" />
        <img width="300" src={url} />
        <img width="300" src={require('./img.jpg').default} />
    </div>
}