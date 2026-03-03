import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const cases = [
    {
        id: "01",
        category: "EXPLORATION",
        title: "Deep Space Maintenance",
        description: "Deploying ZASH humanoid units to orbital stations for zero-gravity repairs and maintenance tasks that exceed human safety limits.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: "02",
        category: "EMERGENCY",
        title: "Hazardous Response",
        description: "Real-time remote operation of adaptive robotics in high-toxicity environments, preserving human life while ensuring infrastructure stability.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: "03",
        category: "LOGISTICS",
        title: "Urban Last-Mile Delivery",
        description: "Revolutionizing city commerce with autonomous bipedal units that navigate complex pedestrian environments with 100% precision.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000"
    }
]

export default function UseCases() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 bg-zash-black text-white selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="mb-32"
                >
                    <span className="text-white/40 font-mono tracking-widest text-sm mb-4 block">PORTFOLIO</span>
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">
                        USE CASES.
                    </h1>
                </motion.div>

                <div className="space-y-40">
                    {cases.map((useCase, index) => (
                        <div
                            key={useCase.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex-1"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl font-light text-white/20">{useCase.id}</span>
                                    <span className="h-px w-12 bg-white/20"></span>
                                    <span className="text-white/40 font-mono text-sm tracking-widest">{useCase.category}</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tight">{useCase.title}</h2>
                                <p className="text-xl text-white/50 leading-relaxed font-light max-w-lg">
                                    {useCase.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex-1 relative aspect-video md:aspect-[4/3] w-full rounded-2xl overflow-hidden group"
                            >
                                <img
                                    src={useCase.image}
                                    alt={useCase.title}
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
