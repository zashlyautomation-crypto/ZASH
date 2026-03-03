import React, { Suspense, lazy, useState } from 'react';

// Lazy load the Spline component to avoid blocking the initial page load
const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * SplineWrapper handles the lazy loading and lifecycle of a Spline 3D scene.
 * It provides a cinematic loading state and ensures the scene is only loaded when needed.
 */
export default function SplineWrapper({ scene, className, onLoad }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = (splineApp) => {
        setIsLoaded(true);
        if (onLoad) onLoad(splineApp);
    };

    return (
        <div className={`relative w-full h-full ${className} pointer-events-auto`}>
            {/* Cinematic Loading Overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full border border-white/5 border-t-white/40 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border border-white/10 animate-pulse" />
                        </div>
                    </div>
                    <div className="font-mono-zash text-[10px] tracking-[0.5em] text-white/40 uppercase">
                        Establishing 3D Link
                    </div>
                </div>
            )}

            {/* Actual Spline Scene */}
            <Suspense fallback={null}>
                <Spline
                    scene={scene}
                    onLoad={handleLoad}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Suspense>
        </div>
    );
}
