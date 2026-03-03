/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'zash-black': '#000000',
                'zash-matte': '#0d0d0d',
                'zash-graphite': '#111111',
                'zash-dark': '#1a1a1a',
                'zash-silver': '#C0C0C0',
                'zash-chrome': '#8A8A8A',
                'zash-light': '#e8e8e8',
                'zash-white': '#f5f5f5',
                'zash-accent': '#b8b8b8',
                border: "rgba(192,192,192,0.1)",
                input: "rgba(192,192,192,0.1)",
                ring: "rgba(192,192,192,0.4)",
                background: "#050505",
                foreground: "#f5f5f5",
                primary: {
                    DEFAULT: "#C0C0C0",
                    foreground: "#050505",
                },
                secondary: {
                    DEFAULT: "#1a1a1a",
                    foreground: "#f5f5f5",
                },
                destructive: {
                    DEFAULT: "hsl(0 62.8% 30.6%)",
                    foreground: "#f5f5f5",
                },
                muted: {
                    DEFAULT: "#111111",
                    foreground: "#8A8A8A",
                },
                accent: {
                    DEFAULT: "#1a1a1a",
                    foreground: "#f5f5f5",
                },
                popover: {
                    DEFAULT: "#0d0d0d",
                    foreground: "#f5f5f5",
                },
                card: {
                    DEFAULT: "#0d0d0d",
                    foreground: "#f5f5f5",
                },
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'space': ['Space Grotesk', 'sans-serif'],
                'mono': ['Space Mono', 'monospace'],
            },
            letterSpacing: {
                'ultra': '0.3em',
                'wide-xl': '0.2em',
                'mega': '0.5em',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                pulse_grid: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '0.8' },
                },
                energy_line: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                metalBloom: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            },
            animation: {
                shimmer: 'shimmer 4s linear infinite',
                scan: 'scan 6s linear infinite',
                pulse_grid: 'pulse_grid 3s ease-in-out infinite',
                energy_line: 'energy_line 2s ease-out forwards',
                float: 'float 6s ease-in-out infinite',
                metalBloom: 'metalBloom 1.5s ease-out forwards',
            },
            backgroundImage: {
                'metal-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #111111 100%)',
                'silver-gradient': 'linear-gradient(90deg, #666666, #C0C0C0, #e8e8e8, #C0C0C0, #666666)',
                'chrome-gradient': 'linear-gradient(180deg, #3a3a3a 0%, #0d0d0d 100%)',
            }
        },
    },
    plugins: [],
}
