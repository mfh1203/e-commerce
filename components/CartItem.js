import Link from "next/link"
import { TrashIcon } from "@heroicons/react/solid"
import { useState, useEffect, useContext } from "react"
import { DataContext } from "../store/GlobalState"
import Modal from "./Modal"

const CartItem=({item})=>{
    const {state, dispatch} =useContext(DataContext)
    const {cart} = state

    const [open, setOpen] = useState(false)
    const handleOpen=()=>{
        setOpen(true)
    }

    const [quantity, setQuantity] =  useState(item.quantity)

    useEffect(()=>{
        const changeQuantity=()=>{
            const newData =[...cart]
            newData.forEach(item1=>{
                if(item1._id===item._id) item1.quantity=quantity
            })
            return dispatch({type:"ADD_CART", payload: newData})
        }
        changeQuantity()
    },[quantity])
    

    return(
        <div >
            <div className="flex col-span-2 p-4 border-b-2 border-gray-200  items-center justify-between">
                <div className="flex items-center">
                    <img className="w-20 h-20 " src={item.images[0].url} alt={item.images[0].url} />
                    <div className="ml-4">
                        <Link href={`/product/${item._id}`} passHref><a >{item.title}</a></Link>
                        <div className="text-sm font-light">
                            {
                                item.inStock > 0
                                ? <p>In Stock : {item.inStock}</p>
                                : <p>Out Stock</p>
                            }   
                        </div>
                        <div className="flex text-sm font-light ">
                            <p>Quantity:</p>
                            <input min={1} onKeyDown={e=>e.preventDefault()} max={item.inStock} onChange={e=>setQuantity(e.target.value)} className="h-5 w-12 pl-2 overflow-visible" type="number" value={quantity} name="quantity"  />
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col place-items-end ">
                    <p>${item.quantity * item.price}</p>
                    <TrashIcon onClick={()=>(
                        handleOpen(),
                        dispatch({
                            type:"ADD_MODAL",
                            payload:{data: cart, id: item._id, title: item.title}
                        }))
                     } className="text-red-600 w-4 hover:cursor-pointer" /> 
                </div>
            </div>
            <Modal setOpen={setOpen} open={open}/>
        </div>
        
    )
}

export default CartItem