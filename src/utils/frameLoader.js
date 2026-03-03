/**
 * Preloads an array of image sources
 * Returns a promise that resolves when all images are loaded
 */
export function preloadImages(sources) {
    return Promise.all(
        sources.map(
            (src) =>
                new Promise((resolve, reject) => {
                    const img = new Image()
                    img.src = src
                    img.onload = () => resolve(img)
                    img.onerror = reject
                })
        )
    )
}

/**
 * Generate frame paths for the 2D scroll sequence
 * @param {number} total - total number of frames
 */
export function generateFramePaths(total = 120) {
    return Array.from({ length: total }, (_, i) => {
        const num = String(i + 1).padStart(3, '0')
        return `/images-for-2d-scroll/ezgif-frame-${num}.jpg`
    })
}

/**
 * Map scroll progress (0-1) to frame index
 */
export function progressToFrame(progress, total = 120) {
    return Math.min(Math.floor(progress * total), total - 1)
}
