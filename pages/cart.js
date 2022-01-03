import Head from "next/head"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../store/GlobalState"
import CartItem from "../components/CartItem"
import Link from "next/link"
import { getData } from "../utils/fetchData"
import PaypalBtn from "./paypalBtn"

function Cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state 

  const [total, setTotal] = useState(0)

  const [address, setAddress] = useState("")
  const [mobile, setMobile] = useState("")
  const [payment, setPayment] = useState(false)
  

  useEffect(()=>{
    const getTotal=()=>{
      const res = cart.reduce((prev,item)=>{
        return prev + (item.price * item.quantity)
      },0)
      setTotal(res)
    }
    getTotal()
  },[cart])

  useEffect(()=>{
    const cartLocal =JSON.parse(localStorage.getItem("__next__cart01__devat"))
    if( cartLocal && cartLocal.length > 0 ){
      let newArr =[]
      const updateCart = async ()=>{
        for (const item of cartLocal ){
          const res = await getData((`product/${item._id}`))
          const {_id, title, images, price, inStock, sold} = res.product
          if (inStock > 0) {
            newArr.push({
              _id, title, images, price, inStock,
              quantity: item.quantity > inStock  ? 1 : item.quantity
            })
          }
        }
        dispatch({type: "ADD_CART", payload: newArr})
      }
      updateCart()
    }
  },[])

 
  const handlePayment = () => {
    if(!address || !mobile)
    return dispatch ({ type: "NOTIFY", payload: {error:"Please add your address and mobile"}})
    setPayment(true)
  }

  if (cart.length === 0)  
  return <div>Cart empty</div>

    return (
        <div>
          <Head>
            <title>Cart Page</title>
          </Head>
          <div>
          <div className="grid lg:grid-cols-3 my-4">
            <div className="col-span-3 lg:col-span-2">
              <h2 className="text-lg  text-center ">Shopping Cart</h2>
                <div className="col-span-2">
                  {
                    cart.map(item =>(
                      <CartItem key={item._id} item={item}  />
                    ))
                  }
                </div>
                
            </div>
              <div className="col-span-3 text-lg  mt-4 ">
                <h2 className="text-center">Shipping</h2>
                <div className="mt-10 sm:mt-0">
                  {/* form */}
                  <div >
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form action="#" method="POST">
                        <div className="shadow overflow-hidden sm:rounded-md">
                          <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                              <div className="col-span-6 ">
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                  Phone Number
                                </label>
                                <input
                                  value={address}
                                  onChange={e =>setAddress(e.target.value)}
                                  type="text"
                                  name="phone-number"
                                  id="phone-number"
                                  autoComplete="phone"
                                  className="py-1 px-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                  Address
                                </label>
                                <input
                                  value={mobile}
                                  onChange={e =>setMobile(e.target.value)}
                                  type="text"
                                  name="address"
                                  id="address"
                                  autoComplete="address"
                                  className="py-1 px-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div  className="col-span-6">
                                <h3>Total: ${total}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

                            {
                              payment
                              ? <PaypalBtn
                                total={total}
                                address= {address}
                                mobile={mobile}
                                state={state}
                                dispatch ={dispatch}
                              />
                              : <Link href={ auth.user ? "#" : "/signin"} passHref>
                              <a
                                onClick={handlePayment}
                                className=" inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Proceed with payment
                              </a>
                            </Link>
                            }

                            
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
            </div>
              </div>
            </div>
          </div>
          
        </div>
    )
}

export default Cart