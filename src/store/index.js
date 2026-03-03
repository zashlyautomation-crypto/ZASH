import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from './navbarSlice'
import scrollReducer from './scrollSlice'
import animationReducer from './animationSlice'

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        scroll: scrollReducer,
        animation: animationReducer,
    },
})

export default store
