import './loading.css'
import { useEffect } from 'react'

const Loading = () => {
    useEffect(() => {
        const load = document.getElementById('load')
        const letters = load.querySelectorAll('div')

        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.2}s`
        })
    }, [])

    return (
        <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
        </div>
    )
}

export default Loading