import React, { useEffect, useRef } from 'react'

export default function Cursor() {
    const cursorRef = useRef(null)
    const dotRef = useRef(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)

    const [isTouch, setIsTouch] = React.useState(false)

    useEffect(() => {
        // Hide cursor on touch devices
        const checkTouch = () => {
            setIsTouch(window.matchMedia('(pointer: coarse)').matches)
        }
        checkTouch()
        window.addEventListener('resize', checkTouch)

        const cursor = cursorRef.current
        const dot = dotRef.current
        if (!cursor || !dot || isTouch) return

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            // Dot follows immediately
            dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
        }

        const handleMouseEnterLink = () => {
            cursor.style.transform = `translate(${currentPos.current.x - 32}px, ${currentPos.current.y - 32}px) scale(1.6)`
            cursor.style.borderColor = 'var(--silver-metallic)'
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
            cursor.style.boxShadow = '0 0 30px var(--silver-glow)'
            dot.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px) scale(2)`
            dot.style.backgroundColor = '#fff'
        }

        const handleMouseLeaveLink = () => {
            cursor.style.transform = `translate(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px) scale(1)`
            cursor.style.borderColor = 'rgba(192, 192, 192, 0.4)'
            cursor.style.backgroundColor = 'transparent'
            cursor.style.boxShadow = 'none'
            dot.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px) scale(1)`
            dot.style.backgroundColor = 'var(--silver-metallic)'
        }

        // Lerp animation loop
        const lerp = (a, b, n) => a + (b - a) * n
        const animate = () => {
            currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
            currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)
            cursor.style.transform = `translate(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px)`
            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
        document.addEventListener('mousemove', handleMouseMove)

        // Attach hover behavior to interactive elements
        const addHoverListeners = () => {
            document.querySelectorAll('a, button, [data-cursor="hover"], .zash-btn').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnterLink)
                el.addEventListener('mouseleave', handleMouseLeaveLink)
            })
        }
        addHoverListeners()

        return () => {
            cancelAnimationFrame(rafRef.current)
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', checkTouch)
        }
    }, [isTouch])

    if (isTouch) return null

    return (
        <>
            {/* Large ring cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-cursor pointer-events-none rounded-full border border-[rgba(192,192,192,0.4)]"
                style={{
                    width: '60px',
                    height: '60px',
                    transition: 'border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.4s ease, box-shadow 0.4s ease',
                    willChange: 'transform',
                    backdropFilter: 'blur(1px)',
                    mixBlendMode: 'difference',
                }}
            />
            {/* Small precise dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-cursor pointer-events-none"
                style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--silver-metallic)',
                    borderRadius: '50%',
                    willChange: 'transform',
                    boxShadow: '0 0 10px var(--silver-glow)',
                    transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
            />
        </>
    )
}
