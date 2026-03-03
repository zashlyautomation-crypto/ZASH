import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, destroyLenis } from '../utils/lenisSetup'

gsap.registerPlugin(ScrollTrigger)
import { setNavbarCompact, setScrollY, setScrollVelocity } from '../store/navbarSlice'
import { setScrollProgress } from '../store/scrollSlice'
import { setHeroComplete } from '../store/animationSlice'

import Hero from '../components/Hero/Hero'
import ImageTrailSection from '../components/ImageTrailSection/ImageTrailSection'
import ScrollStory from '../components/ScrollStory/ScrollStory'
import Features from '../components/Features/Features'
import Architecture from '../components/Architecture/Architecture'
import Contact from '../components/Contact/Contact'

export default function Home() {
    const dispatch = useDispatch()
    const velocityRef = useRef(0)
    const dimOverlayRef = useRef(null)

    useEffect(() => {
        const lenis = initLenis()

        const onScroll = ({ scroll, progress, velocity }) => {
            const scrollY = scroll
            const vel = velocity || 0
            velocityRef.current = vel
            dispatch(setScrollY(scrollY))
            dispatch(setScrollVelocity(Math.abs(vel)))
            dispatch(setNavbarCompact(scrollY > 80))
            dispatch(setScrollProgress(progress))
        }

        lenis.on('scroll', onScroll)

        const heroTimer = setTimeout(() => {
            dispatch(setHeroComplete(true))
        }, 100)

        const ctx = gsap.context(() => {
            // ── HERO PINNING FOR IMAGE TRAIL OVERLAY ─────────────────────────────
            ScrollTrigger.create({
                trigger: "#hero-reveal-container",
                start: "top top",
                end: "bottom top",
                pin: "#hero-pin",
                pinSpacing: false,
                anticipatePin: 1,
            })
        })

        return () => {
            clearTimeout(heroTimer)
            ctx.revert()
            lenis.off('scroll', onScroll)
            destroyLenis()
        }
    }, [dispatch])

    return (
        <main>
            {/* Hero Reveal Container for GSAP Pinning */}
            <div id="hero-reveal-container" className="relative">
                {/* Hero Pin Layer */}
                <div id="hero-pin" className="relative h-screen w-full overflow-hidden z-0 bg-black">
                    <Hero />
                    {/* Dimming layer controlled by ImageTrailSection */}
                    <div ref={dimOverlayRef} className="absolute inset-0 bg-black opacity-0 pointer-events-none z-10" />
                </div>

                {/* ImageTrailSection slides OVER the pinned Hero */}
                <div className="relative z-20">
                    <ImageTrailSection dimOverlayRef={dimOverlayRef} />
                </div>
            </div>

            <ScrollStory />
            <Features />
            <Architecture />
            <Contact />
        </main>
    )
}
