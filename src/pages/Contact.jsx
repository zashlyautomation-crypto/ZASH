import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 bg-zash-black text-white selection:bg-white/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-12 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                            GET IN <br /> TOUCH.
                        </h1>

                        <div className="space-y-12 mt-20">
                            {[
                                { icon: <Mail />, label: "Email", value: "hello@zash.ai" },
                                { icon: <Phone />, label: "Operation", value: "+1 (888) ZASH-ROBOT" },
                                { icon: <MapPin />, label: "Headquarters", value: "Level 99, Cyber Tower, Neo Tokyo" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="text-white/30 group-hover:text-white transition-colors duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-1">{item.label}</p>
                                        <p className="text-xl font-light">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="p-12 border border-white/5 bg-white/[0.02] backdrop-blur-2xl rounded-3xl"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Area of Interest</label>
                                <select className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors text-white/50">
                                    <option className="bg-zash-black">Autonomous Logistics</option>
                                    <option className="bg-zash-black">Precision Healthcare</option>
                                    <option className="bg-zash-black">Smart Manufacturing</option>
                                    <option className="bg-zash-black">General Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Your Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/10 resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button className="group relative w-full overflow-hidden rounded-full bg-white text-black py-6 font-bold tracking-widest text-xs uppercase hover:bg-white/90 transition-all duration-300">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Initialize Connection <ArrowRight className="w-4 h-4" />
                                </span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
