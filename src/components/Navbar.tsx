"use client"
import React, { useEffect } from 'react'
import { IoPartlySunny } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import SearchBox from './SearchBox';
type Props = {
    city : String | undefined;
    submitValue : (v : string ) => void;

}

export default function Navbar( props: Props) {
    const [value, setValue] = React.useState('hllo')
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('submitted')
        props.submitValue(value)
    }
    
    
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
            <p className='text-slate-900/80 text-sm'>{props.city}</p>
            <div>{/*search bar*/}
                <SearchBox  onSubmit={onSubmit} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
            </div>
            </section>
        </div>
    </nav>
    )
}