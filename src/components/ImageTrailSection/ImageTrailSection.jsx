import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ImageTrail } from "../ui/image-trail"

gsap.registerPlugin(ScrollTrigger)

// Robot-themed Unsplash images
const robotImages = [
    "https://images.unsplash.com/photo-1717347424091-08275b73c918",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvYm90aWNzfGVufDB8fDB8fHwy",
    "https://images.unsplash.com/photo-1706231290723-b5f7940c29fb",
    "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ib3RpY3N8ZW58MHx8MHx8fDI%3D",
    "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJvYm90aWNzfGVufDB8fDB8fHwy",
    "https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvYm90aWNzfGVufDB8fDB8fHwy",
].map((url) => `${url}?auto=format&fit=crop&w=300&q=80`)

const ImageTrailSection = ({ dimOverlayRef }) => {
    const sectionRef = useRef(null)
    const trailRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress
                    if (dimOverlayRef && dimOverlayRef.current) {
                        gsap.set(dimOverlayRef.current, {
                            opacity: p * 0.6,
                        })
                    }
                },
                onLeaveBack: () => {
                    if (dimOverlayRef && dimOverlayRef.current) {
                        gsap.set(dimOverlayRef.current, { opacity: 0 })
                    }
                }
            })
        }, sectionRef.current)

        return () => {
            ctx.revert()
            if (dimOverlayRef && dimOverlayRef.current) {
                gsap.set(dimOverlayRef.current, { opacity: 0 })
            }
        }
    }, [dimOverlayRef])

    return (
        <section
            ref={sectionRef}
            id="image-trail"
            className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden z-20"
        >
            {/* Full-area interactive trail zone */}
            <div
                ref={trailRef}
                className="absolute inset-0 z-0"
                style={{ pointerEvents: "auto" }}
            >
                <ImageTrail containerRef={trailRef}>
                    {robotImages.map((url, index) => (
                        <div
                            key={index}
                            className="flex relative overflow-hidden w-28 h-28 rounded-xl shadow-lg shadow-cyan-500/20 border border-white/10"
                        >
                            <img
                                src={url}
                                alt={`Robot ${index + 1}`}
                                className="object-cover absolute inset-0 w-full h-full"
                            />
                        </div>
                    ))}
                </ImageTrail>
            </div>

            {/* Overlay text */}
            <div className="relative z-10 text-center pointer-events-none select-none">
                <h2
                    className="font-orbitron font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white"
                    style={{ fontSize: "clamp(48px, 10vw, 130px)", lineHeight: 0.95 }}
                >
                    Why We are
                </h2>
                <h2
                    className="font-orbitron font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white/60 via-white to-white/60"
                    style={{ fontSize: "clamp(48px, 10vw, 130px)", lineHeight: 0.95 }}
                >
                    Different
                </h2>
            </div>

            {/* Subtle top/bottom fades */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </section>
    )
}

export default ImageTrailSection
