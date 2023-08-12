"use client"
import { auth } from '@/firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/firebase/auth'
import Loader from '@/components/Loader'


const poppin = Poppins({
  weight: ['400','500','700','800'],
  subsets: ['latin'],
  display: 'swap',
})


export default function Home() {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const {authUser, isLoading, setAuthUser,} = useAuth()
  const router = useRouter()

  
  useEffect(()=>{
    if(!isLoading && authUser){
      router.push('/home')
    }
  },[authUser,isLoading])

  const signupHandle = async () => {
    if(!name || !email || !password) return
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      setAuthUser({
        uid: user.uid,
        email: user.email,
        name
      })
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const user = await signInWithPopup(auth,provider)
    console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className={`grid grid-cols-2 min-h-screen ${poppin.className}`}>
      <div className='bg-teal-500 p-10 border-2 text-center'>
        <h3 className='font-bold text-3xl'>Sign Up</h3>
        <div className='p-4 bg-blue-300 mt-6'>
        <div className='bg-slate-100 rounded-full p-2 mb-8 flex justify-center' onClick={googleLogin}>
          <FcGoogle className='text-3xl '/> <span className='ms-3 text-xl text-center'>Login With Google</span></div>
          <form className='bg-white p-3 mt-6 rounded-md shadow' onSubmit={(e)=>e.preventDefault()}>
            <div className='flex flex-col items-start p-2 mt-4'>
            <input type='text' placeholder='Name' className='outline-none border-b-2 w-full text-xs text-[#000]' required onChange={(e)=> setName(e.target.value)}  /> 
            </div>
            <div className='flex flex-col items-start p-2 mt-4'>
            <input type='email' placeholder='Email' autoComplete='off' className='outline-none border-b-2 w-full text-xs text-[#000]' required onChange={(e)=> setEmail(e.target.value)}  /> 
            </div>
            <div className='flex flex-col items-start p-2 mt-4'>
            <input type='password' placeholder='Password' autoComplete='off' className='outline-none border-b-2 w-full text-xs text-[#000]' required onChange={(e)=> setPassword(e.target.value)}  /> 
            </div>

            <button className='bg-blue-600 w-24 text-white rounded-sm' onClick={signupHandle}>Sign up</button>
          <Link className='text-blue-400 text-xs ms-3' href='/login'>Already Account?</Link>
          </form>
        </div>
      </div>
      <div className='bg-teal-500 p-4 border-2'></div>
    </main>
  )
}
