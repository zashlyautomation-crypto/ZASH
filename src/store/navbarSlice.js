import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        isCompact: false,
        isVisible: true,
        scrollY: 0,
        scrollVelocity: 0,
    },
    reducers: {
        setNavbarCompact: (state, action) => {
            state.isCompact = action.payload
        },
        setNavbarVisible: (state, action) => {
            state.isVisible = action.payload
        },
        setScrollY: (state, action) => {
            state.scrollY = action.payload
        },
        setScrollVelocity: (state, action) => {
            state.scrollVelocity = action.payload
        },
    },
})

export const { setNavbarCompact, setNavbarVisible, setScrollY, setScrollVelocity } = navbarSlice.actions
export default navbarSlice.reducer
