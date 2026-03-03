import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

// Module-level ticker listener to ensure we can always remove it
const onTickerUpdate = (time) => {
    if (lenisInstance && typeof lenisInstance.raf === 'function') {
        lenisInstance.raf(time * 1000)
    }
}

export function initLenis() {
    // If an instance already exists, destroy it first
    if (lenisInstance) {
        destroyLenis()
    }

    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    })

    // Connect Lenis RAF to GSAP ticker
    gsap.ticker.add(onTickerUpdate)

    gsap.ticker.lagSmoothing(0)

    // Connect ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                lenisInstance.scrollTo(value)
            }
            return lenisInstance.scroll
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            }
        },
        pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.addEventListener('refresh', () => lenisInstance.resize())
    ScrollTrigger.refresh()

    return lenisInstance
}

export function getLenis() {
    return lenisInstance
}

export function destroyLenis() {
    gsap.ticker.remove(onTickerUpdate)
    if (lenisInstance) {
        lenisInstance.destroy()
        lenisInstance = null
    }
}
