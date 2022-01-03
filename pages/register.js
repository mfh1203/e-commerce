import { LockClosedIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useState, useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import valid from '../utils/valid'
import { postData } from '../utils/fetchData'
import Loading from '../components/Loading'

function register() {
    const initialState ={name:"", email:"", password:"", cf_password:""}
    const [userData, setUserData] = useState(initialState)
    const {name, email, password, cf_password} = userData

    const {state, dispatch} = useContext(DataContext)
    const {notify} = state

    const handleChangeInput = e =>{
        const {name, value} =e.target
        setUserData({...userData, [name] : value})
        dispatch({type:"NOTIFY", payload:{}})
    }

    const handleSubmit = async e =>{
      e.preventDefault()
      const errMsg = valid(name, email, password, cf_password)
      if (errMsg) return dispatch({ type: "NOTIFY" , payload: {error: errMsg}})

      dispatch({ type: "NOTIFY" , payload: {loading: true}})

      const res = await postData("auth/register", userData)
      if(res.err) return dispatch({ type: "NOTIFY" , payload: {error: res.err}})
      return dispatch({ type: "NOTIFY" , payload: {success: res.msg}})

    }

    const signUp =() =>{
       if(notify.loading) {
         return <Loading />
       }
        else {
        return
    }
  }
  


    return (
        <div >
            <Head>
                <title>Sign up page</title>
            </Head>
      <div  className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name} 
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email} 
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password} 
                  onChange={handleChangeInput}
                />
                
              </div>
              <div>
              <label htmlFor="cf_password" className="sr-only">
                  Confirm Password
                </label>
              <input
                  id="cf_password"
                  name="cf_password"
                  type="password"
                  autoComplete="current-cf_password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={cf_password} 
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ><span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {signUp()||
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />}
            </span>{
              notify.loading ? "Loading..." : "Sign up"
            }
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
}

export default register
