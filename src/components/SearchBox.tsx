import React from 'react'
import { FaSearch } from "react-icons/fa";


type Props = {
    className?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    value: string;
}

export default function SearchBox({props}: Props) {
  return (
    <form className='flex justify-center  items-center 0 h-10 relative ' onSubmit={props.onSubmit}>
        <input type="text" placeholder='Location?' className='border border-gray-400 px-4 py-2 w-[230px] 
        rounded-l-md focus:outline-none focus:border-blue-500 h-full ' value={props.value}/>
        <button className=' border border-gray-400  text-blue-600 hover:text-white  hover:border-blue-600 h-full px-4 py-2 rounded-r-md hover:bg-blue-600  '>
        <FaSearch  className="text-xl "/>
        </button>
    </form>

  )
}