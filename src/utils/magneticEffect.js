import anime from 'animejs'

/**
 * Attaches magnetic hover effect to an element
 * @param {HTMLElement} el - The element to magnetize
 * @param {number} strength - Magnetic pull strength (default 0.4)
 */
export function attachMagnetic(el, strength = 0.4) {
    if (!el) return

    const handleMove = (e) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDist = Math.max(rect.width, rect.height) * 1.2

        if (distance < maxDist) {
            anime({
                targets: el,
                translateX: dx * strength,
                translateY: dy * strength,
                duration: 600,
                easing: 'easeOutElastic(1, 0.3)',
            })
        }
    }

    const handleLeave = () => {
        anime({
            targets: el,
            translateX: 0,
            translateY: 0,
            duration: 800,
            easing: 'easeOutElastic(1, 0.5)',
        })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
    }
}

/**
 * Animate metallic underline sweep
 * @param {HTMLElement} el - underline element
 */
export function sweepUnderline(el) {
    if (!el) return
    anime({
        targets: el,
        scaleX: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        transformOrigin: 'left center',
    })
}

/**
 * Hover scale micro-interaction
 */
export function hoverScale(el, scale = 1.05) {
    if (!el) return
    el.addEventListener('mouseenter', () => {
        anime({ targets: el, scale, duration: 400, easing: 'easeOutQuart' })
    })
    el.addEventListener('mouseleave', () => {
        anime({ targets: el, scale: 1, duration: 400, easing: 'easeOutQuart' })
    })
}
