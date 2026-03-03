import { createSlice } from '@reduxjs/toolkit'

const animationSlice = createSlice({
    name: 'animation',
    initialState: {
        heroComplete: false,
        navbarReady: false,
        sectionsVisible: {},
        cursorType: 'default',
    },
    reducers: {
        setHeroComplete: (state, action) => {
            state.heroComplete = action.payload
        },
        setNavbarReady: (state, action) => {
            state.navbarReady = action.payload
        },
        setSectionVisible: (state, action) => {
            const { section, visible } = action.payload
            state.sectionsVisible[section] = visible
        },
        setCursorType: (state, action) => {
            state.cursorType = action.payload
        },
    },
})

export const { setHeroComplete, setNavbarReady, setSectionVisible, setCursorType } = animationSlice.actions
export default animationSlice.reducer
