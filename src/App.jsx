import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Loading from './loading/loading'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import UseCases from './pages/UseCases'
import Contact from './pages/Contact'
import Notfound from './404page/404page'

// A wrapper to handle route-based effects (like scroll to top)
const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

// Layout wrapper for pages that should have Navbar and Footer
const AppLayout = () => {
    const { pathname } = useLocation()
    const isNotFound = pathname === '/notfound' || !['/', '/about', '/solutions', '/use-cases', '/contact'].includes(pathname)

    return (
        <div className="w-full min-h-screen bg-black overflow-x-hidden flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            {!isNotFound && <Footer />}
        </div>
    )
}

// Global Loading Controller
const LoadingController = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Initial load
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000) // 2 seconds minimum for the premium feel

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center pointer-events-auto"
                    >
                        <Loading />
                    </motion.div>
                )}
            </AnimatePresence>
            {!isLoading && children}
        </>
    )
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <LoadingController>
                <div className="relative bg-[#000000] min-h-[100vh] w-full">
                    <Cursor />
                    <Routes>
                        {/* Main App Routes with Navbar/Footer */}
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/solutions" element={<Solutions />} />
                            <Route path="/use-cases" element={<UseCases />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>
                        <Route path="/notfound" element={<Notfound />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </div>
            </LoadingController>
        </Router>
    )
}
