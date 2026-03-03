import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
    { label: 'PAYLOAD CAPACITY', value: '80 KG', code: 'SPEC::001' },
    { label: 'REACH RADIUS', value: '2,400 MM', code: 'SPEC::002' },
    { label: 'REPEATABILITY', value: '±0.001 MM', code: 'SPEC::003' },
    { label: 'MAX SPEED', value: '6.2 M/S', code: 'SPEC::004' },
    { label: 'POWER DRAW', value: '3.2 KW', code: 'SPEC::005' },
    { label: 'IP RATING', value: 'IP67', code: 'SPEC::006' },
]

export default function Architecture() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const layer1Ref = useRef(null)
    const layer2Ref = useRef(null)
    const layer3Ref = useRef(null)
    const specsRef = useRef([])
    const lineRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            // Parallax depth layers
            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress
                    if (layer1Ref.current) gsap.set(layer1Ref.current, { y: p * -60 })
                    if (layer2Ref.current) gsap.set(layer2Ref.current, { y: p * -30 })
                    if (layer3Ref.current) gsap.set(layer3Ref.current, { y: p * -10 })
                },
            })

            // Heading reveal
            ScrollTrigger.create({
                trigger: headingRef.current,
                start: 'top 75%',
                onEnter: () => {
                    gsap.fromTo(headingRef.current,
                        { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
                        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.out' }
                    )
                    gsap.fromTo(lineRef.current,
                        { scaleX: 0, opacity: 0 },
                        { scaleX: 1, opacity: 1, duration: 1.6, ease: 'power3.out', transformOrigin: 'left center', delay: 0.4 }
                    )
                },
                once: true,
            })

            // Specs rows reveal
            ScrollTrigger.create({
                trigger: section,
                start: 'top 40%',
                onEnter: () => {
                    const validSpecs = specsRef.current.filter(Boolean)
                    if (validSpecs.length > 0) {
                        gsap.fromTo(validSpecs,
                            { x: -40, opacity: 0 },
                            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }
                        )
                    }
                },
                once: true,
            })
        }, sectionRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="architecture"
            className="relative py-40 overflow-hidden"
            style={{ background: '#050505' }}
        >
            {/* Parallax layer 1 — deep grid */}
            <div
                ref={layer1Ref}
                className="absolute inset-0 grid-pattern"
                style={{ opacity: 0.2, transform: 'scale(1.1)' }}
            />

            {/* Parallax layer 2 — radial bloom */}
            <div
                ref={layer2Ref}
                className="absolute pointer-events-none"
                style={{
                    top: '10%',
                    left: '-20%',
                    width: '80vw',
                    height: '80vw',
                    background: 'radial-gradient(circle, rgba(130,130,130,0.025) 0%, transparent 70%)',
                }}
            />

            {/* Parallax layer 3 — secondary bloom */}
            <div
                ref={layer3Ref}
                className="absolute pointer-events-none"
                style={{
                    bottom: '-10%',
                    right: '-10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(192,192,192,0.02) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-start">

                    {/* Left — heading + description */}
                    <div>
                        <div className="tag-label mb-8">TECHNICAL SPECIFICATIONS</div>

                        <div className="overflow-hidden mb-8">
                            <h2
                                ref={headingRef}
                                className="font-orbitron font-bold opacity-0"
                                style={{
                                    fontSize: 'clamp(36px, 5.5vw, 72px)',
                                    letterSpacing: '0.06em',
                                    lineHeight: 1.08,
                                    textTransform: 'uppercase',
                                    background: 'linear-gradient(135deg, #555 0%, #aaa 40%, #eee 50%, #aaa 60%, #555 100%)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shimmer 5s linear infinite',
                                }}
                            >
                                SYSTEM<br />ARCHITECTURE<br />OVERVIEW
                            </h2>
                        </div>

                        <div
                            ref={lineRef}
                            style={{ height: '1px', width: '200px', background: 'linear-gradient(90deg, #888, #ddd, transparent)', marginBottom: '32px', opacity: 0 }}
                        />

                        <p
                            className="font-space mb-6"
                            style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(192, 192, 192, 0.76)', fontWeight: 300, maxWidth: '420px' }}
                        >
                            CUBEX represents a fundamental leap in veterinary inventory systems.
                            Every subsystem designed for secure, accurate, and automated
                            medication management.
                        </p>

                        <p
                            className="font-space mb-12"
                            style={{ fontSize: '13px', lineHeight: 1.9, color: 'rgba(209, 208, 208, 0.49)', fontWeight: 300, maxWidth: '420px' }}
                        >
                            From the secure medication vault to the real-time analytics engine,
                            CUBEX sets the new standard for what practice efficiency can achieve.
                        </p>

                        {/* Diagonal data viz element */}
                        <div
                            className="relative"
                            style={{
                                width: '200px',
                                height: '200px',
                                border: '1px solid rgba(192,192,192,0.06)',
                                background: 'rgba(15,15,15,0.8)',
                            }}
                        >
                            {/* Inner animated element */}
                            <div
                                className="absolute"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100px',
                                    height: '100px',
                                    border: '1px solid rgba(192,192,192,0.15)',
                                    borderRadius: '50%',
                                    animation: 'float 4s ease-in-out infinite',
                                }}
                            >
                                <div
                                    className="absolute font-mono-zash"
                                    style={{ inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(138,138,138,0.4)' }}
                                >
                                    CUBEX
                                </div>
                            </div>
                            {/* Corner brackets */}
                            <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: '1px solid rgba(192,192,192,0.3)', borderLeft: '1px solid rgba(192,192,192,0.3)' }} />
                            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: '1px solid rgba(192,192,192,0.3)', borderRight: '1px solid rgba(192,192,192,0.3)' }} />
                        </div>
                    </div>

                    {/* Right — spec table */}
                    <div className="pt-8 lg:pt-[80px]">
                        <div style={{ border: '1px solid rgba(192,192,192,0.06)', background: 'rgba(8,8,8,0.8)' }}>
                            {/* Table header */}
                            <div
                                className="font-mono-zash"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    padding: '16px 24px',
                                    borderBottom: '1px solid rgba(192,192,192,0.06)',
                                    fontSize: '8px',
                                    letterSpacing: '0.3em',
                                    color: 'rgba(240, 235, 235, 0.75)',
                                }}
                            >
                                <span>PARAMETER</span>
                                <span>VALUE</span>
                            </div>

                            {/* Spec rows */}
                            {SPECS.map((spec, i) => (
                                <div
                                    key={i}
                                    ref={(el) => (specsRef.current[i] = el)}
                                    className="opacity-0"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        padding: '20px 24px',
                                        borderBottom: i < SPECS.length - 1 ? '1px solid rgba(192,192,192,0.04)' : 'none',
                                        alignItems: 'center',
                                        transition: 'background 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(215, 213, 213, 0.05)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <div>
                                        <div
                                            className="font-mono-zash mb-1"
                                            style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(205, 205, 205, 0.73)' }}
                                        >
                                            {spec.code}
                                        </div>
                                        <div
                                            className="font-space"
                                            style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(205, 205, 205, 0.73)', textTransform: 'uppercase' }}
                                        >
                                            {spec.label}
                                        </div>
                                    </div>
                                    <div
                                        className="font-orbitron font-bold text-metal-static"
                                        style={{ fontSize: '16px', letterSpacing: '0.08em' }}
                                    >
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
