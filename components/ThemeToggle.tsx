'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const root = document.documentElement
        const stored = localStorage.getItem('theme')
        if (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark')
        }
        if (stored === 'dark') {
            root.classList.add('dark')
            setIsDark(true)
        }


    }, [])

    const toggleTheme = () => {
        const root = document.documentElement
        const isCurrentlyDark = root.classList.contains('dark')
        if (isCurrentlyDark) {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setIsDark(false)
        } else {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setIsDark(true)
        }
    }

    return (
        <button onClick={toggleTheme}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
    )
}
