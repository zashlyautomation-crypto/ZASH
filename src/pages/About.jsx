import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-zash-black text-white selection:bg-white/20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32 relative"
                >
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] mb-12 bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent">
                        BEYOND <br /> HUMAN.
                    </h1>
                    <p className="text-2xl md:text-4xl text-white/50 max-w-4xl font-light leading-tight tracking-tight">
                        Zash is a global collective of architects, roboticists, and AI pioneers committed to the evolution of physical intelligence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl mb-32">
                    {[
                        { label: "FOUNDED", value: "2024" },
                        { label: "HEADCOUNT", value: "480+" },
                        { label: "PATENTS", value: "1.2k" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-zash-black p-12 text-center md:text-left">
                            <p className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-4">{stat.label}</p>
                            <p className="text-5xl font-semibold tracking-tighter">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-semibold tracking-tight">The Foundation</h2>
                        <p className="text-xl text-white/40 leading-relaxed font-light">
                            We began with a simple question: Why should machines be limited by their mechanical nature? By combining neural networks with adaptive bipedal hardware, we've created robotics that move with the fluidity of biological life.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square md:aspect-video rounded-3xl border border-white/5 overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"
                            alt="Robotic Lab"
                            className="w-full h-full object-cover grayscale opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zash-black via-transparent to-transparent" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
