import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOOTER_LINKS = [
    { group: 'SOLUTIONS', items: ['Inventory Control', 'Narcotics Control', 'Operating Room', 'Supply Chain'] },
    { group: 'TECHNOLOGY', items: ['MedBank Suite', 'Codonics Integration', 'Secure Access', 'Real-time Analytics'] },
    { group: 'COMPANY', items: ['About Us', 'Success Stories', 'Partnerships', 'Careers'] },
    { group: 'CONNECT', items: ['Contact Sales', 'Support', 'Press Kit', 'System Status'] },
]

export default function Footer() {
    const footerRef = useRef(null)
    const canvasRef = useRef(null)
    const svgRef = useRef(null)
    const innerRef = useRef(null)
    const pathRef = useRef(null)

    // Grid pulse canvas animation
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let t = 0

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const cols = Math.ceil(canvas.width / 60) + 1
            const rows = Math.ceil(canvas.height / 60) + 1

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const x = c * 60
                    const y = r * 60
                    const dist = Math.sqrt((c - cols / 2) ** 2 + (r - rows / 2) ** 2)
                    const pulse = Math.sin(t * 0.8 - dist * 0.5) * 0.5 + 0.5
                    ctx.strokeStyle = `rgba(192, 192, 192, ${pulse * 0.07})`
                    ctx.lineWidth = 0.5
                    ctx.strokeRect(x, y, 60, 60)
                }
            }

            // Energy horizon line
            const lineY = canvas.height * 0.4
            const gradient = ctx.createLinearGradient(0, lineY, canvas.width, lineY)
            gradient.addColorStop(0, 'transparent')
            gradient.addColorStop(0.3, `rgba(192, 192, 192, ${0.08 + Math.sin(t) * 0.04})`)
            gradient.addColorStop(0.5, `rgba(220, 220, 220, ${0.12 + Math.sin(t * 1.5) * 0.04})`)
            gradient.addColorStop(0.7, `rgba(192, 192, 192, ${0.08 + Math.sin(t) * 0.04})`)
            gradient.addColorStop(1, 'transparent')

            ctx.beginPath()
            ctx.moveTo(0, lineY)
            ctx.lineTo(canvas.width, lineY)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()

            t += 0.025
            animId = requestAnimationFrame(draw)
        }

        draw()

        // ScrollTrigger entrance for footer content
        ScrollTrigger.create({
            trigger: footerRef.current,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(innerRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
                )

                // Animate the SVG line
                if (pathRef.current) {
                    const length = pathRef.current.getTotalLength?.() || 400
                    gsap.fromTo(pathRef.current,
                        { strokeDasharray: length, strokeDashoffset: length },
                        { strokeDashoffset: 0, duration: 2.5, ease: 'power3.out', delay: 0.3 }
                    )
                }
            },
            once: true,
        })

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative overflow-hidden"
            style={{ background: '#000000', borderTop: '1px solid rgba(192,192,192,0.06)' }}
        >
            {/* Animated grid canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none', zIndex: 0 }}
            />

            {/* SVG energy line */}
            <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full"
                style={{ height: '2px', zIndex: 1 }}
                viewBox="0 0 1440 2"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M 0 1 L 1440 1"
                    stroke="url(#silverGrad)"
                    strokeWidth="1"
                    fill="none"
                />
                <defs>
                    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="#888" />
                        <stop offset="50%" stopColor="#e8e8e8" />
                        <stop offset="70%" stopColor="#888" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Top energy line glow */}
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                    height: '60px',
                    background: 'linear-gradient(180deg, rgba(192,192,192,0.03), transparent)',
                    zIndex: 1,
                }}
            />

            <div
                ref={innerRef}
                className="relative opacity-0 max-w-[1300px] mx-auto px-6 lg:px-12 pt-16 pb-12 z-10"
            >
                {/* Brand lockup row */}
                <div className="flex flex-wrap items-start justify-between gap-8 mb-20">
                    {/* Logo + tagline */}
                    <div>
                        <div
                            className="font-orbitron font-black text-metal mb-3"
                            style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '0.3em', lineHeight: 1 }}
                        >
                            CUBEX
                        </div>
                        <div
                            className="font-orbitron"
                            style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(229, 227, 227,0.4)', textTransform: 'uppercase' }}
                        >
                            THE STANDARD OF CARE
                        </div>
                        <div
                            className="font-mono-zash mt-4"
                            style={{ fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(207, 205, 205, 0.65)' }}
                        >
                            CLASSIFICATION: UNRESTRICTED — CUBEX CORP 2026
                        </div>
                    </div>

                    {/* Status badge */}
                    <div
                        style={{
                            border: '1px solid rgba(192,192,192,0.1)',
                            padding: '20px 32px',
                            background: 'rgba(10,10,10,0.8)',
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a4a4a', boxShadow: '0 0 8px rgba(180, 180, 180, 0.41)', animation: 'pulse_grid 2s ease-in-out infinite' }}
                            />
                            <span className="font-mono-cubex" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(229, 227, 227,0.5)' }}>
                                SYSTEMS ONLINE
                            </span>
                        </div>
                        <div className="font-mono-cubex" style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(229, 227, 227, 0.65)', lineHeight: 2 }}>
                            <div>SYS::STATUS — OPERATIONAL</div>
                            <div>UPTIME — 99.9982%</div>
                        </div>
                    </div>
                </div>

                {/* Navigation grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16 pb-16 border-b border-white/5">
                    {FOOTER_LINKS.map((group, i) => (
                        <div key={i}>
                            <div
                                className="font-mono-zash mb-6"
                                style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(245, 245, 245, 0.64)', textTransform: 'uppercase' }}
                            >
                                {group.group}
                            </div>
                            <ul style={{ listStyle: 'none' }}>
                                {group.items.map((item, j) => (
                                    <li key={j} className="mb-3">
                                        {item === 'About Us' ? (
                                            <Link
                                                to="/about"
                                                className="font-space cursor-none"
                                                style={{
                                                    fontSize: '13px',
                                                    color: 'rgba(229, 227, 227,0.4)',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.3s ease',
                                                    letterSpacing: '0.04em',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(192,192,192,0.8)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(229, 227, 227, 0.52)')}
                                                data-cursor="hover"
                                            >
                                                {item}
                                            </Link>
                                        ) : item === 'Contact Sales' ? (
                                            <Link
                                                to="/contact"
                                                className="font-space cursor-none"
                                                style={{
                                                    fontSize: '13px',
                                                    color: 'rgba(229, 227, 227,0.4)',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.3s ease',
                                                    letterSpacing: '0.04em',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(192,192,192,0.8)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(229, 227, 227, 0.52)')}
                                                data-cursor="hover"
                                            >
                                                {item}
                                            </Link>
                                        ) : (
                                            <a
                                                href="#"
                                                className="font-space cursor-none"
                                                style={{
                                                    fontSize: '13px',
                                                    color: 'rgba(229, 227, 227,0.4)',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.3s ease',
                                                    letterSpacing: '0.04em',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(192,192,192,0.8)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(229, 227, 227, 0.52)')}
                                                data-cursor="hover"
                                            >
                                                {item}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        className="font-mono-cubex"
                        style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(229, 227, 227, 0.7)' }}
                    >
                        © 2026 CUBEX CORPORATION — ALL RIGHTS RESERVED — PATENT PENDING TECHNOLOGY
                    </div>
                    <div
                        className="font-mono-cubex"
                        style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(229, 227, 227, 0.68)' }}
                    >
                        BUILD v9.2.4 — SEC::CLEARANCE-LVL3 — AUTHORIZED ACCESS ONLY
                    </div>
                </div>
            </div>
        </footer>
    )
}
