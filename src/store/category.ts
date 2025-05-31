import {create} from "zustand"

interface StateCategory {
    activeCategory: number;
    setActiveCategory: (value: number) => void;
}

export const useCategoryStore = create<StateCategory>(set => ({
    activeCategory: 1, 
    setActiveCategory: (value) => {set({activeCategory: value})}
}))