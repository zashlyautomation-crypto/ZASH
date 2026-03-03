import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const navRef = useRef(null)
    const { pathname } = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // Initial entrance animation - only on mount
    useEffect(() => {
        if (!navRef.current) return
        gsap.fromTo(navRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.8 }
        )
    }, [])

    // Scroll logic - depends on route
    useEffect(() => {
        const hero = document.querySelector('#hero')
        let trigger;

        if (hero) {
            // Page with Hero - use ScrollTrigger for transition
            trigger = ScrollTrigger.create({
                trigger: '#hero',
                start: 'center top',
                end: 'bottom top',
                onEnter: () => setScrolled(true),
                onLeaveBack: () => setScrolled(false),
            })
        } else {
            // Page without Hero - use fixed threshold
            trigger = ScrollTrigger.create({
                start: '50 top',
                onEnter: () => setScrolled(true),
                onLeaveBack: () => setScrolled(false),
            })
        }

        return () => {
            if (trigger) trigger.kill()
        }
    }, [pathname])

    return (
        <nav
            ref={navRef}
            className={`fixed left-1/2 -translate-x-1/2 z-navbar flex justify-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${scrolled ? 'nav-scrolled' : 'nav-initial'
                }`}
        >
            <div
                className={`liquid-glass silver-edge-glow flex items-center justify-between transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) w-full md:w-11/12 lg:w-2/3 h-full px-6 lg:px-12 lg:py-2 relative z-50`}
            >
                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="font-orbitron font-bold tracking-ultra cursor-none transition-all duration-500"
                        style={{
                            fontSize: scrolled ? '16px' : '24px',
                            background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                        data-cursor="hover"
                        onClick={() => setIsOpen(false)}
                    >
                        ZASH<span className="text-[10px] font-light align-top ml-0.5">®</span>
                    </Link>
                </div>

                {/* Desktop Navigation Links (>= 1024px) */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className={`font-space font-medium tracking-wider transition-all duration-500 ${scrolled ? 'text-[11px] text-white/50' : 'text-[14px] text-white/70'
                                } hover:text-white`}
                            data-cursor="hover"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA (>= 1024px) */}
                <Link
                    to="/contact"
                    className={`hidden lg:inline-flex zash-btn btn-primary transition-all duration-500 ${scrolled ? '!py-2 !px-6 text-[10px]' : '!py-3 !px-8 text-[12px]'
                        }`}
                    data-cursor="hover"
                    style={{ borderRadius: '999px' }}
                >
                    GET STARTED
                </Link>

                {/* Mobile / Tablet Hamburger Toggle (< 1024px) */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-[60]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle navigation menu"
                >
                    <span className={`bg-white block transition-all duration-300 ease-out h-[2px] w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`} />
                    <span className={`bg-white block transition-all duration-300 ease-out h-[2px] w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`bg-white block transition-all duration-300 ease-out h-[2px] w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'}`} />
                </button>
            </div>

            {/* Mobile / Tablet Overlay Menu (< 1024px) */}
            <div
                id="mobile-menu"
                className={`lg:hidden absolute top-0 left-0 w-full !rounded-[32px] pt-24 pb-8 px-6 transition-all duration-500 ease-in-out origin-top glass-panel-bright ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}
                style={{
                    // Use CSS to push it visually behind the navbar pill but still aligned top
                    transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                    zIndex: 40,
                }}
            >
                <div className="flex flex-col gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="font-space text-[16px] font-medium tracking-wider text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                            data-cursor="hover"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="zash-btn btn-primary !py-3 !px-10 text-[12px] mt-4"
                        onClick={() => setIsOpen(false)}
                        data-cursor="hover"
                        style={{ borderRadius: '999px' }}
                    >
                        GET STARTED
                    </Link>
                </div>
            </div>
        </nav>
    )
}

