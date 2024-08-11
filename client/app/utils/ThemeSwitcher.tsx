'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

type Props = {}

const ThemeSwitcher: React.FC<Props> = (props) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className="flex items-center justify-center mx-4">
            {theme === "Light" ? (
                <BiMoon
                    className='cursor-pointer'
                    fill='black'
                    size={25}
                    onClick={() => setTheme("dark")}
                />
            )
                : (
                    <BiSun
                        className='cursor-pointer'
                        size={25}
                        onClick={() => setTheme("Light")}
                    />
                )
            }
        </div>
    )
}

export default ThemeSwitcher