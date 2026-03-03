import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { attachMagnetic } from '../../utils/magneticEffect'
import SplineWrapper from './SplineWrapper'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const sectionRef = useRef(null)
    const headlineRef = useRef(null)
    const subheadRef = useRef(null)
    const ctaRef = useRef(null)
    const splineRef = useRef(null)
    const [splineLoaded, setSplineLoaded] = useState(false)

    useEffect(() => {
        const ctx = gsap.context((self) => {
            const tl = gsap.timeline({ delay: 0.3 })

            // Headline reveal
            tl.fromTo(headlineRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }
            )

            // Subheadline & CTA reveal
            tl.fromTo([subheadRef.current, ctaRef.current],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
                '-=1.5'
            )

            // Attach magnetic to CTA
            const buttons = ctaRef.current?.querySelectorAll('.zash-btn')
            buttons?.forEach(btn => {
                const cleanup = attachMagnetic(btn, 0.25)
                self.add(() => cleanup?.())
            })
        }, sectionRef.current)

        return () => ctx.revert()
    }, [])

    const headline = 'ZASH'

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
            style={{ perspective: '1000px' }}
        >
            {/* 3D BACKGROUND OBJECT */}
            <div className="absolute inset-0 z-0">
                <div
                    ref={splineRef}
                    className="w-full h-full flex items-center justify-center translate-z-0"
                >
                    <SplineWrapper
                        scene="https://prod.spline.design/vYtSZtzObj8H35GC/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                        className={`transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
            </div>

            {/* Vignette / Overlay to ensure readability and cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black pointer-events-none opacity-90 z-0" />

            {/* TOP CONTENT: LOGO / HEADLINE */}
            <div className="relative z-10 w-full pt-12 px-12 flex flex-col items-center pointer-events-none">
                <h1
                    ref={headlineRef}
                    className="font-orbitron font-black text-white tracking-widest text-center pointer-events-auto"
                    style={{
                        fontSize: 'clamp(60px, 18vw, 240px)',
                        lineHeight: 0.9,
                        width: '100%',
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }}
                >
                    {headline}
                    <span className="absolute top-0 right-[5%] text-[clamp(20px,4vw,60px)] font-light">®</span>
                </h1>
            </div>

            {/* CENTER/BOTTOM CONTENT: TAGLINE & BUTTONS */}
            <div className="relative z-10 w-full px-12 pb-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-12 pointer-events-none">
                <div className="max-w-md pointer-events-auto">
                    <p
                        ref={subheadRef}
                        className="font-space text-white/70 mb-8"
                        style={{
                            fontSize: 'clamp(18px, 1.5vw, 22px)',
                            lineHeight: 1.4,
                            fontWeight: 400
                        }}
                    >
                        ZASHLY is not just a robotic brand, it's a futuristic shift to the new world.
                    </p>
                    <div ref={ctaRef} className="flex flex-wrap gap-4">
                        <Link to="/#profits" className="zash-btn btn-primary mb-5" data-cursor="hover">
                            <span>Calculate Your Profits</span>
                            <span className="ml-2">→</span>
                        </Link>
                        <Link to="/#get-started" className="zash-btn btn-secondary mb-5" data-cursor="hover">
                            <span>Get Started</span>
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Grid overlay for texture */}
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        </section>
    )
}
