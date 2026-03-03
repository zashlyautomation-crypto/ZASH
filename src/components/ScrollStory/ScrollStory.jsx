import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { setFrameIndex } from '../../store/scrollSlice'
import { generateFramePaths, preloadImages } from '../../utils/frameLoader'

gsap.registerPlugin(ScrollTrigger)

// ─── 3 ACT STORY ───────────────────────────────────────────────────────────────
// Each ACT maps to a scroll-progress band [enter, exit] within the pinned section.
// "enter" = when text fades in, "exit" = when text is swept out (fast slash).
const ACTS = [
    {
        enter: 0.0,     // 0% scroll → Act 1 opens
        exit: 0.30,    // 30% scroll → flash out, Act 2 begins
        label: 'STRUCTURAL INTEGRITY',
        headline: 'ENGINEERED FOR RESILIENCE',
        sub: 'Advanced alloy composition and integrated shock-absorption systems ensure absolute stability under extreme mechanical loads.',
        align: 'left',
    },
    {
        enter: 0.34,    // 34% → after the gap / fast transition
        exit: 0.64,    // 64% → flash out, Act 3 begins
        label: 'KINETIC TENSION',
        headline: 'THE TRUTH OF IMPACT',
        sub: 'A controlled descent reveals the real constraints of engineering. Impact tests distinguish structural superiority from theoretical design.',
        align: 'right',
    },
    {
        enter: 0.68,    // 68% → Act 3 opens
        exit: 1.01,    // Never exits (end of sequence)
        label: 'OPERATIONAL EQUILIBRIUM',
        headline: 'OURS STANDS',
        sub: 'Ours survives. Ours continues. Engineered with a philosophy of absolute resilience — this is the new standard of durability.',
        align: 'center',
    },
]

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ScrollStory() {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const overlayRefs = useRef([])
    const frameIndexRef = useRef(0)
    const imagesRef = useRef([])
    const progressRef = useRef(0)       // live scroll progress [0..1]
    const activeActRef = useRef(-1)      // currently displayed act index
    const inTransitRef = useRef(false)   // prevent overlapping transitions

    const [loaded, setLoaded] = useState(false)

    const dispatch = useDispatch()

    // ── Preload frames ───────────────────────────────────────────────────────
    useEffect(() => {
        const paths = generateFramePaths(120)
        preloadImages(paths)
            .then((imgs) => {
                imagesRef.current = imgs
                setLoaded(true)
                const canvas = canvasRef.current
                if (canvas && imgs[0]) {
                    const ctx = canvas.getContext('2d')
                    canvas.width = imgs[0].naturalWidth
                    canvas.height = imgs[0].naturalHeight
                    ctx.drawImage(imgs[0], 0, 0)
                }
            })
            .catch(() => setLoaded(true))
    }, [])

    // ── ScrollTrigger + rhythm engine ───────────────────────────────────────
    useEffect(() => {
        if (!loaded) return

        const ctx = gsap.context(() => {
            const canvas = canvasRef.current
            const section = sectionRef.current
            if (!canvas || !section) return

            const totalFrames = imagesRef.current.length || 120
            const canvasCtx = canvas.getContext('2d', { alpha: false })

            if (imagesRef.current[0]) {
                canvas.width = imagesRef.current[0].naturalWidth || 1920
                canvas.height = imagesRef.current[0].naturalHeight || 1080
            }

            const drawFrame = (idx) => {
                const img = imagesRef.current[idx]
                if (img && canvas.width) canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }

            const getEl = (i) => overlayRefs.current[i]
            const getAct = (i) => ACTS[i]

            const transitionActs = (outIdx, inIdx) => {
                if (inTransitRef.current) return
                inTransitRef.current = true

                const outEl = outIdx !== -1 ? getEl(outIdx) : null
                const inEl = inIdx !== -1 ? getEl(inIdx) : null

                const doIn = () => {
                    if (!inEl) { inTransitRef.current = false; return }
                    const act = getAct(inIdx)
                    const title = inEl.querySelector('h2')
                    const text = inEl.querySelector('p')
                    const lbl = inEl.querySelector('.tag-label')
                    const hr = inEl.querySelector('.hr-metal')

                    const xOff = act.align === 'left' ? -48 : act.align === 'right' ? 48 : 0

                    gsap.set(inEl, { display: 'block', opacity: 0, y: 24, pointerEvents: 'auto' })

                    gsap.timeline({ onComplete: () => { inTransitRef.current = false } })
                        .to(inEl, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
                        .fromTo(title,
                            { clipPath: 'inset(0 100% 0 0)', x: xOff },
                            { clipPath: 'inset(0 0%   0 0)', x: 0, duration: 1.1, ease: 'power4.out' },
                            '-=0.7'
                        )
                        .fromTo([lbl, text, hr],
                            { opacity: 0, y: 12, filter: 'blur(8px)' },
                            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08, ease: 'power2.out' },
                            '-=0.6'
                        )
                }

                if (outEl && gsap.getProperty(outEl, 'opacity') > 0) {
                    gsap.killTweensOf(outEl)
                    gsap.to(outEl, {
                        opacity: 0,
                        scaleX: 0.85,
                        filter: 'blur(12px)',
                        duration: 0.45,
                        ease: 'power3.in',
                        onComplete: () => {
                            gsap.set(outEl, { display: 'none', scaleX: 1, filter: 'blur(0px)' })
                            doIn()
                        },
                    })
                } else {
                    doIn()
                }

                activeActRef.current = inIdx
            }

            // ── main scroll trigger ───────────────────────────────────────────────
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${window.innerHeight * 6}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const p = self.progress
                    progressRef.current = p

                    const frameNum = Math.min(Math.floor(p * (totalFrames - 1)), totalFrames - 1)
                    if (frameNum !== frameIndexRef.current) {
                        frameIndexRef.current = frameNum
                        drawFrame(frameNum)
                        dispatch(setFrameIndex(frameNum))
                    }

                    let targetAct = -1
                    for (let i = 0; i < ACTS.length; i++) {
                        if (p >= ACTS[i].enter && p < ACTS[i].exit) {
                            targetAct = i
                            break
                        }
                    }

                    if (targetAct !== activeActRef.current) {
                        transitionActs(activeActRef.current, targetAct)
                    }
                },
            })
        }, sectionRef.current)

        return () => ctx.revert()
    }, [loaded, dispatch])

    // ── helpers for overlay positioning ─────────────────────────────────────
    const posStyle = (act) => ({
        position: 'absolute',
        bottom: act.align === 'center' ? '18%' : '15%',
        left: act.align === 'right' ? 'auto'
            : act.align === 'center' ? '50%'
                : '8%',
        right: act.align === 'left' ? 'auto'
            : act.align === 'center' ? 'auto'
                : '8%',
        transform: act.align === 'center' ? 'translateX(-50%)' : 'none',
        textAlign: act.align,
        zIndex: 15,
        pointerEvents: 'none',
        display: 'none',      // hidden by default; shown by transitionActs
        maxWidth: act.align === 'center' ? '820px' : '680px',
        width: '100%',
        padding: '0 40px',
    })

    return (
        <section
            ref={sectionRef}
            id="systems"
            className="relative w-full"
            style={{ height: '100vh', background: '#000' }}
        >
            {/* Loading */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div
                        className="font-mono-cubex text-xs"
                        style={{ color: 'rgba(138,138,138,0.5)', letterSpacing: '0.3em' }}
                    >
                        LOADING SEQUENCE DATA...
                    </div>
                </div>
            )}

            {/* Canvas */}
            <div
                ref={containerRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{ overflow: 'hidden' }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                        filter: 'brightness(0.9) contrast(1.05)',
                    }}
                />

                {/* Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)' }}
                />

                {/* Edge gradient */}
                <div
                    className="absolute inset-0 pointer-events-none scanline"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, transparent 14%, transparent 86%, rgba(0,0,0,0.82) 100%)' }}
                />
            </div>

            {/* Section header — tiny mono label top-left */}
            <div
                className="absolute z-10 font-mono-cubex"
                style={{
                    top: '32px', left: '48px',
                    fontSize: '9px', letterSpacing: '0.3em',
                    color: 'rgba(138,138,138,0.35)',
                }}
            >
                [CUBEX::DURABILITY] — IMPACT ANALYSIS INITIATED
            </div>

            {/* Act progress indicator — 3 dots */}
            <div
                className="absolute z-20"
                style={{ bottom: '38px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}
            >
                {ACTS.map((_, i) => (
                    <div
                        key={i}
                        ref={el => {
                            // Store separately from overlayRefs
                            if (el) el.dataset.dot = i
                        }}
                        style={{
                            width: '4px', height: '4px', borderRadius: '50%',
                            background: 'rgba(192,192,192,0.25)',
                            transition: 'background 0.4s ease',
                        }}
                    />
                ))}
            </div>

            {/* Three Act overlays */}
            {ACTS.map((act, i) => (
                <div
                    key={i}
                    ref={el => (overlayRefs.current[i] = el)}
                    style={posStyle(act)}
                >
                    {/* Label */}
                    <div className="tag-label mb-5" style={{ display: 'inline-block' }}>
                        {act.label}
                    </div>

                    {/* Headline */}
                    <h2
                        className="font-orbitron font-bold mb-5"
                        style={{
                            fontSize: 'clamp(28px, 4.5vw, 62px)',
                            letterSpacing: '0.1em',
                            lineHeight: 1.08,
                            background: 'linear-gradient(135deg, #777 0%, #ccc 38%, #fff 50%, #ccc 62%, #777 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textTransform: 'uppercase',
                            willChange: 'transform, opacity, clip-path',
                        }}
                    >
                        {act.headline}
                    </h2>

                    {/* Body */}
                    <p
                        className="font-space"
                        style={{
                            fontSize: 'clamp(13px, 1.15vw, 17px)',
                            color: 'rgba(255,255,255,0.55)',
                            fontWeight: 300,
                            letterSpacing: '0.04em',
                            maxWidth: act.align === 'center' ? '580px' : '480px',
                            marginLeft: act.align === 'right' ? 'auto'
                                : act.align === 'center' ? 'auto' : '0',
                            marginRight: act.align === 'center' ? 'auto' : '0',
                            lineHeight: 1.75,
                        }}
                    >
                        {act.sub}
                    </p>

                    {/* Divider */}
                    <div
                        className="hr-metal mt-8"
                        style={{
                            maxWidth: '300px',
                            marginLeft: act.align === 'right' ? 'auto'
                                : act.align === 'center' ? 'auto' : '0',
                            marginRight: act.align === 'center' ? 'auto' : '0',
                        }}
                    />

                    {/* Act number */}
                    <div
                        className="font-mono-cubex mt-4"
                        style={{
                            fontSize: '9px', letterSpacing: '0.25em',
                            color: 'rgba(138,138,138,0.35)',
                            marginLeft: act.align === 'right' ? 'auto'
                                : act.align === 'center' ? 'auto' : '0',
                            marginRight: act.align === 'center' ? 'auto' : '0',
                        }}
                    >
                        ACT {String(i + 1).padStart(2, '0')} — SEQUENCE {String(i + 1).padStart(3, '0')} / 003
                    </div>
                </div>
            ))}
        </section>
    )
}
