import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsFillRecordCircleFill} from 'react-icons/bs'


const Sidebar = () => {
  return (
    <div className='bg-[#2668E8] w-80 h-screen p-4 text-white'>
        <h2 className='text-2xl'>HireOn</h2>
        <div className='flex flex-col items-center p-2'>
           <div className='flex justify-start items-center'>
           <div className='h-20 flex flex-col items-center'>
                <BsFillRecordCircleFill className='text-3xl' />
                <Image className='mt-6' src='/assets/images/line.png' alt='line' width={1} height={5}/>
            </div>
           
            <div className='h-20 ms-2'>
                <Link href='/' className='text-xs'>Log in Details</Link>
                <p className='text-xs tracking-tighter whitespace-nowrap'>Lorem ipsum dolor sit amet,consectetur </p>
            </div>
           </div>
           
           <div className='flex justify-start items-center'>
           <div className='h-20 flex flex-col justify-between items-center'>
                <BsFillRecordCircleFill className='text-3xl' />
                
            </div>
           
            <div className='h-20 ms-2'>
                <Link href='/about' className='text-xs'>Company Profile</Link>
                <p className='text-xs tracking-tighter whitespace-nowrap'>Lorem ipsum dolor sit amet,consectetur </p>
            </div>
           </div>
        </div>
      
    </div>
  )
}

export default Sidebar