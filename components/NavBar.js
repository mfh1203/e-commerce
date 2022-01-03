import { UserIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import ActiveLink from './ActiveLink'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

function NavBar() {

    const {state, dispatch} =useContext(DataContext)
    const {auth, cart} = state

    const handleLogout =()=>{
        Cookie.remove("refreshToken", {path:"api/auth/accessToken"})
        localStorage.removeItem("firstLogin")
        dispatch({type:"NOTIFY", payload:{success: "Logged out!"}})
        dispatch({type:"AUTH", payload:{}})
        
    }

    const loggedRouter= () =>{
        return (<div className='flex items-center justify-center gap-x-2'>
            <img className='w-8 h-8 rounded-full' src={auth.user.avatar} alt="" />
            <span>{auth.user.name}</span>
            <button onClick={handleLogout} className='flex w-24  rounded-md bg-white px-2 py-1 border-2 border-solid' href="#">Logout</button>
        </div>
        
        )
    }

    return (
        <div className="flex items-center justify-between h-12 py-2">
            <Link href="/" passhref>
                <a className="font-bold text-2xl ">E-commerce</a>
            </Link>
            <div className="flex space-x-2">
                <div >
                    <ActiveLink href="/cart" >
                        <ShoppingCartIcon className='w-5 h-5' />
                        <span>Cart</span>
                        <span className='text-white flex- justify-center items-center ml-2 px-1 text-xs bg-red-500 rounded-full'>{cart.length}</span>
                    </ActiveLink>
                </div>

            {
                Object.keys(auth).length === 0 
                ? <div >
                    <ActiveLink href="/signin">
                        <UserIcon className='w-5 h-5' />
                        <span>Sign In</span>
                    </ActiveLink>
                </div>
                : loggedRouter()
            }

                
            </div>
        </div>
    )
}

export default NavBar
