import { useState, useEffect } from 'react';
// 自定义 hooks 必须以 use 为开始命名

// 调用 useScroll 返回实施滚动条位置
export default function useScroll() {
    const [scroll, setScroll] = useState(0);
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    useEffect(() => {
        setScroll(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return [scroll, (newScroll) => {
        window.scrollTo(0, newScroll);
        setScroll(window.scrollY);
    }]
}