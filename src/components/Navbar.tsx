"use client"
import React from 'react'
import { IoPartlySunny } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import SearchBox from './SearchBox';
type Props = {

}

export default function Navbar( props: Props) {
    const [location, setLocation] = React.useState('Kairouan')
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('submitted')
    }
    function onchange(e: React.ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value)
    }
    const [value, setValue] = React.useState('')
    return (
    <nav className="sticky shadow-sm top-0 left-0 z-50 bg-white">
        <div className="px-3 mx-auto h-[80px] flex justify-between items-center max-w-7xl">
            <p className="flex justify-center items-center gap-2">
                <h2 className="text-gray-500 text-3xl">Weather</h2>
                <IoPartlySunny className="text-3xl text-cyan-500" />
            </p>
            {/* */}
            <section className='flex gap-3 items-center'>
            <MdMyLocation className="text-4xl hover:opacity-80 text-gray-400 cursor-pointer"/>
            <IoLocationSharp className="text-4xl"/>
            <p className='text-slate-900/80 text-sm'>{location}</p>
            <div>{/*search bar*/}
                <SearchBox  onSubmit={onSubmit} value={value} onChange={onchange}/>
            </div>
            </section>
        </div>
    </nav>
    )
}