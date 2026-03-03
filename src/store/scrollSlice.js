import { createSlice } from '@reduxjs/toolkit'

const scrollSlice = createSlice({
    name: 'scroll',
    initialState: {
        scrollProgress: 0,
        currentSection: 'hero',
        frameIndex: 0,
        totalFrames: 120,
    },
    reducers: {
        setScrollProgress: (state, action) => {
            state.scrollProgress = action.payload
        },
        setCurrentSection: (state, action) => {
            state.currentSection = action.payload
        },
        setFrameIndex: (state, action) => {
            state.frameIndex = Math.max(0, Math.min(action.payload, state.totalFrames - 1))
        },
    },
})

export const { setScrollProgress, setCurrentSection, setFrameIndex } = scrollSlice.actions
export default scrollSlice.reducer
