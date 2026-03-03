import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Zap, Shield, Globe } from 'lucide-react'

const solutions = [
    {
        title: "Autonomous Logistics",
        description: "Seamlessly integrate humanoid intelligence into your supply chain with our adaptive logistics fleet.",
        icon: <Zap className="w-8 h-8 text-blue-400" />,
        color: "from-white/20 to-silver/20"
    },
    {
        title: "Precision Healthcare",
        description: "Robotic assistance designed for surgical precision and compassionate patient care in modern clinics.",
        icon: <Shield className="w-8 h-8 text-purple-400" />,
        color: "from-white/20 to-silver/20"
    },
    {
        title: "Smart Manufacturing",
        description: "Next-gen automation that learns and adapts to your factory floor in real-time without downtime.",
        icon: <Cpu className="w-8 h-8 text-emerald-400" />,
        color: "from-white/20 to-silver/20"
    },
    {
        title: "Global Support",
        description: "A distributed network of maintenance and intelligence updates ensuring 99.9% uptime worldwide.",
        icon: <Globe className="w-8 h-8 text-amber-400" />,
        color: "from-white/20 to-silver/20"
    }
]

export default function Solutions() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-zash-black text-white selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24 text-center"
                >
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
                        TECHNICAL <br /> SOLUTIONS.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
                        Industry-leading robotics powered by ZASH-Core AI, designed to solve the most complex physical challenges on Earth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative p-10 rounded-3xl border border-white/5 bg-gradient-to-br ${item.color} backdrop-blur-xl hover:border-white/20 transition-all duration-500`}
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-black/40 w-fit group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <h3 className="text-3xl font-semibold mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-white/40 text-lg leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">
                                {item.description}
                            </p>
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Zap className="w-5 h-5 text-white/20" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
