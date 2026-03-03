import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import anime from 'animejs'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
    {
        code: 'MOD::01',
        metric: '12',
        unit: 'DOF',
        title: 'KINEMATIC MASTERY',
        desc: 'Twelve degrees of freedom enabling sub-millimeter positional accuracy across any operational plane.',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
                <circle cx="20" cy="20" r="18" stroke="rgba(192,192,192,0.3)" strokeWidth="1" />
                <circle cx="20" cy="20" r="8" stroke="rgba(192,192,192,0.6)" strokeWidth="1" />
                <line x1="20" y1="2" x2="20" y2="38" stroke="rgba(192,192,192,0.2)" strokeWidth="1" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="rgba(192,192,192,0.2)" strokeWidth="1" />
            </svg>
        ),
    },
    {
        code: 'MOD::02',
        metric: '0.001',
        unit: 'MM',
        title: 'MICRON PRECISION',
        desc: 'Proprietary servo feedback loops delivering tolerances impossible by any prior generation of industrial robotics.',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
                <rect x="4" y="4" width="32" height="32" stroke="rgba(192,192,192,0.3)" strokeWidth="1" />
                <rect x="14" y="14" width="12" height="12" stroke="rgba(192,192,192,0.6)" strokeWidth="1" />
                <line x1="4" y1="20" x2="14" y2="20" stroke="rgba(192,192,192,0.4)" strokeWidth="1" />
                <line x1="26" y1="20" x2="36" y2="20" stroke="rgba(192,192,192,0.4)" strokeWidth="1" />
            </svg>
        ),
    },
    {
        code: 'MOD::03',
        metric: '400T',
        unit: 'OPS/S',
        title: 'NEURAL ENGINE',
        desc: 'On-board neural processing architecture executing 400 trillion operations per second in real-time inferencing.',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }}>
                <polygon points="20,4 36,36 4,36" stroke="rgba(192,192,192,0.3)" strokeWidth="1" fill="none" />
                <polygon points="20,14 28,28 12,28" stroke="rgba(192,192,192,0.6)" strokeWidth="1" fill="none" />
                <circle cx="20" cy="22" r="2" fill="rgba(192,192,192,0.6)" />
            </svg>
        ),
    },
]

export default function Features() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])
    const counterRefs = useRef([])
    const headingRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context((self) => {
            // Heading reveal
            ScrollTrigger.create({
                trigger: headingRef.current,
                start: 'top 80%',
                onEnter: () => {
                    gsap.fromTo(headingRef.current,
                        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out' }
                    )
                },
                once: true,
            })

            // Cards stagger reveal
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 60%',
                onEnter: () => {
                    const validCards = cardsRef.current.filter(Boolean)
                    if (validCards.length > 0) {
                        gsap.fromTo(validCards,
                            { y: 80, opacity: 0, rotateX: -15 },
                            {
                                y: 0, opacity: 1, rotateX: 0,
                                duration: 1.2, ease: 'power4.out', stagger: 0.15
                            }
                        )
                    }

                    // Animate counters
                    counterRefs.current.forEach((el, i) => {
                        if (!el || !FEATURES[i]) return
                        const metric = FEATURES[i].metric
                        if (metric.includes('.') || metric.includes('T')) {
                            anime({
                                targets: el,
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutQuart',
                            })
                        } else {
                            const target = parseInt(metric.replace(/\D/g, '')) || 0
                            anime({
                                targets: el,
                                innerHTML: [0, target],
                                duration: 2000,
                                easing: 'easeOutExpo',
                                round: 1,
                            })
                        }
                    })
                },
                once: true,
            })

            // Card hover effects using event delegation or direct attachment with cleanup
            cardsRef.current.forEach((card) => {
                if (!card) return

                const onEnter = () => {
                    gsap.to(card, { y: -8, borderColor: 'rgba(192,192,192,0.25)', duration: 0.4, ease: 'power2.out' })
                }
                const onLeave = () => {
                    gsap.to(card, { y: 0, borderColor: 'rgba(192,192,192,0.06)', duration: 0.4, ease: 'power2.out' })
                }

                card.addEventListener('mouseenter', onEnter)
                card.addEventListener('mouseleave', onLeave)

                // We can add cleanup to the context itself
                self.add(() => {
                    card.removeEventListener('mouseenter', onEnter)
                    card.removeEventListener('mouseleave', onLeave)
                })
            })
        }, sectionRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="intelligence"
            className="relative py-32 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)' }}
        >
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Subtle horizontal bars */}
            <div className="absolute top-0 left-0 right-0 hr-metal" />
            <div className="absolute bottom-0 left-0 right-0 hr-metal" />

            <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
                {/* Labels */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="tag-label">SYSTEM CAPABILITIES</div>
                    <div
                        style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(192,192,192,0.15), transparent)' }}
                    />
                    <div className="font-mono-zash" style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(220, 218, 218, 0.8)' }}>
                        UNIT: CUBEX-GEN7
                    </div>
                </div>

                {/* Main heading */}
                <div className="mb-20 overflow-hidden">
                    <h2
                        ref={headingRef}
                        className="font-orbitron font-bold opacity-0"
                        style={{
                            fontSize: 'clamp(36px, 6vw, 80px)',
                            letterSpacing: '0.08em',
                            lineHeight: 1.05,
                            background: 'linear-gradient(135deg, #555 0%, #aaa 40%, #eee 50%, #aaa 60%, #555 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textTransform: 'uppercase',
                        }}
                    >
                        ENGINEERED<br />WITHOUT COMPROMISE
                    </h2>
                </div>

                {/* Feature cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]"
                >
                    {FEATURES.map((feat, i) => (
                        <div
                            key={i}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="relative opacity-0"
                            style={{
                                padding: '48px 40px',
                                border: '1px solid rgba(192,192,192,0.06)',
                                background: 'rgba(10,10,10,0.8)',
                                transition: 'border-color 0.4s ease',
                                cursor: 'none',
                            }}
                            data-cursor="hover"
                        >
                            {/* Code label */}
                            <div className="font-mono-zash mb-6" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(199, 199, 199, 0.85)' }}>
                                {feat.code}
                            </div>

                            {/* Icon */}
                            <div className="mb-6">{feat.icon}</div>

                            {/* Big metric */}
                            <div
                                className="font-orbitron font-bold mb-2 text-metal-static"
                                style={{ fontSize: 'clamp(40px, 4vw, 64px)', letterSpacing: '0.04em', lineHeight: 1 }}
                            >
                                <span ref={(el) => (counterRefs.current[i] = el)}>{feat.metric}</span>
                                <span
                                    className="font-space"
                                    style={{ fontSize: '14px', letterSpacing: '0.15em', color: 'rgba(183, 183, 183, 0.71)', marginLeft: '8px' }}
                                >
                                    {feat.unit}
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="font-orbitron mb-3"
                                style={{
                                    fontSize: '12px',
                                    letterSpacing: '0.2em',
                                    color: 'rgba(192,192,192,0.7)',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {feat.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="font-space"
                                style={{
                                    fontSize: '13px',
                                    lineHeight: 1.8,
                                    color: 'rgba(204, 203, 203, 0.69)',
                                    fontWeight: 300,
                                }}
                            >
                                {feat.desc}
                            </p>

                            {/* Bottom accent line */}
                            <div
                                className="absolute bottom-0 left-0 right-0"
                                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,192,192,0.08), transparent)' }}
                            />

                            {/* Corner bracket */}
                            <div style={{ position: 'absolute', top: 16, right: 16, width: 20, height: 20 }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: '1px solid rgba(192,192,192,0.2)', borderRight: '1px solid rgba(192,192,192,0.2)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
