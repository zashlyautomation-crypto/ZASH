import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import './404.css';

/**
 * Senior React + Animation Systems Engineer Implementation
 * Immersive Cinematic 404 Experience
 */

const CONFIG = {
    itemCount: 20,
    starCount: 150,
    zGap: 800,
    loopSize: 0, // Calculated
    camSpeed: 2.5,
    colors: ["#e4e4e4ff", "#a7a7a7ff", "#5c5c5cff", "#2b2b2bff"]
};

CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

const TEXTS = [
    "LOST",
    "not found",
    "404",
    "Try again",
    "fix ROUTES",
    "LOST AGAIN",
];

export default function Notfound() {
    const worldRef = useRef(null);
    const viewportRef = useRef(null);
    const containerRef = useRef(null);
    const itemsRef = useRef([]);
    const stateRef = useRef({
        scroll: 0,
        velocity: 0,
        targetSpeed: 0,
        mouseX: 0,
        mouseY: 0
    });

    useEffect(() => {
        const world = worldRef.current;
        const viewport = viewportRef.current;
        if (!world || !viewport) return;

        // --- INITIALIZATION ---
        const init = () => {
            const items = [];

            // 1. Create Items (Cards & Text)
            for (let i = 0; i < CONFIG.itemCount; i++) {
                const el = document.createElement("div");
                el.className = "item";

                const isHeading = i % 4 === 0;

                if (isHeading) {
                    const txt = document.createElement("div");
                    txt.className = "big-text";
                    txt.innerText = TEXTS[i % TEXTS.length];
                    el.appendChild(txt);

                    items.push({
                        el,
                        type: "text",
                        x: 0,
                        y: 0,
                        rot: 0,
                        baseZ: -i * CONFIG.zGap
                    });
                } else {
                    const card = document.createElement("div");
                    card.className = "card";

                    const randId = Math.floor(Math.random() * 9999);
                    card.innerHTML = `
                        <div class="card-header">
                            <span class="card-id">ID-${randId}</span>
                            <div style="width:10px;height:10px;background:var(--accent);"></div>
                        </div>
                        <h2>${TEXTS[i % TEXTS.length]}</h2>
                        <div class="card-footer">
                            <span>GRID:${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}</span>
                            <span>DATA_SIZE:${(Math.random() * 100).toFixed(1)}MB</span>
                        </div>
                        <div style="position:absolute;bottom:2rem;right:2rem;font-size:4rem;opacity:0.1;font-weight:900;">0${i}</div>
                    `;

                    el.appendChild(card);

                    const angle = (i / CONFIG.itemCount) * Math.PI * 6;
                    const x = Math.cos(angle) * (window.innerWidth * 0.3);
                    const y = Math.sin(angle) * (window.innerHeight * 0.3);
                    const rot = (Math.random() - 0.5) * 30;

                    items.push({
                        el,
                        type: "card",
                        x,
                        y,
                        rot,
                        baseZ: -i * CONFIG.zGap
                    });
                }

                world.appendChild(el);
            }

            // 2. Create Stars
            for (let i = 0; i < CONFIG.starCount; i++) {
                const el = document.createElement("div");
                el.className = "star";
                world.appendChild(el);

                items.push({
                    el,
                    type: "star",
                    x: (Math.random() - 0.5) * 3000,
                    y: (Math.random() - 0.5) * 3000,
                    baseZ: -Math.random() * CONFIG.loopSize
                });
            }

            return items;
        };

        itemsRef.current = init();

        // --- LENIS ---
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.08,
            direction: "vertical",
            gestureDirection: "vertical",
            smoothTouch: true
        });

        lenis.on("scroll", ({ scroll, velocity }) => {
            stateRef.current.scroll = scroll;
            stateRef.current.targetSpeed = velocity;

            // Infinite Jump (Loop Logic)
            const loopLength = CONFIG.loopSize / CONFIG.camSpeed;
            if (scroll > loopLength * 2) {
                lenis.scrollTo(scroll - loopLength, { immediate: true });
            } else if (scroll < loopLength * 0.5) {
                lenis.scrollTo(scroll + loopLength, { immediate: true });
            }
        });

        // Start with an offset for bi-directional scroll feel
        lenis.scrollTo(CONFIG.loopSize / CONFIG.camSpeed, { immediate: true });

        // --- EVENTS ---
        const handleMouseMove = (e) => {
            stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // --- RENDER LOOP ---
        let animationFrameId;
        const baseFov = 1000;

        const raf = (time) => {
            lenis.raf(time);
            const state = stateRef.current;

            state.velocity += (state.targetSpeed - state.velocity) * 0.1;

            const tiltX = state.mouseY * 5 - state.velocity * 0.5;
            const tiltY = state.mouseX * 5;

            world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            const fov = baseFov - Math.min(Math.abs(state.velocity) * 10, 600);
            viewport.style.perspective = `${fov}px`;

            const cameraZ = state.scroll * CONFIG.camSpeed;

            itemsRef.current.forEach((item) => {
                let relZ = item.baseZ + cameraZ;
                const modC = CONFIG.loopSize;
                let vizZ = ((relZ % modC) + modC) % modC;

                if (vizZ > 500) vizZ -= modC;

                let alpha = 1;
                if (vizZ < -3000) alpha = 0;
                else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;

                if (vizZ > 100 && item.type !== "star")
                    alpha = 1 - (vizZ - 100) / 400;

                if (alpha < 0) alpha = 0;

                item.el.style.opacity = alpha;

                if (alpha > 0) {
                    let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

                    if (item.type === "star") {
                        const stretch = Math.max(
                            1,
                            Math.min(1 + Math.abs(state.velocity) * 0.1, 10)
                        );
                        trans += ` scale3d(1,1,${stretch})`;
                    } else if (item.type === "text") {
                        if (Math.abs(state.velocity) > 1) {
                            const offset = state.velocity * 2;
                            item.el.style.textShadow = `${offset}px 0 silver, ${-offset}px 0 #dcdcdc65`;
                        } else {
                            item.el.style.textShadow = "none";
                        }
                    } else {
                        const float = Math.sin(time * 0.001 + item.x) * 10;
                        trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
                    }

                    item.el.style.transform = trans;
                }
            });

            animationFrameId = requestAnimationFrame(raf);
        };

        animationFrameId = requestAnimationFrame(raf);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
            if (world) world.innerHTML = '';
        };
    }, []);

    return (
        <div className="not-found-container min-h-screen w-screen bg-[#030303] relative" ref={containerRef}>
            {/* Immersive Overlays */}
            <div className="scanlines"></div>
            <div className="vignette"></div>
            <div className="noise"></div>

            {/* Hud Overlay - Centered Return Button */}
            <div className="hud !pointer-events-none">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <Link
                        to="/"
                        className="pointer-events-auto font-syncopate text-[12px] md:text-[14px] tracking-widest text-white/40 hover:text-white transition-all duration-500 border border-white/10 px-8 py-4 rounded-full backdrop-blur-md"
                    >
                        RETURN TO REALITY
                    </Link>
                </div>
            </div>

            {/* 3D Viewport */}
            <div className="viewport" id="viewport" ref={viewportRef}>
                <div className="world" id="world" ref={worldRef}></div>
            </div>

            {/* Scroll Proxy to allow physical scrolling for Lenis */}
            <div className="scroll-proxy"></div>
        </div>
    );
}