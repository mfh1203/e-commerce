import Link from "next/link"
import { useContext } from "react"
import { DataContext } from "../../store/GlobalState"
import { addToCart } from "../../store/Action"

const ProductItem=({product})=>{
    const { state, dispatch } = useContext(DataContext) 

    const { cart } = state

    const userLink=()=>{
        return(
        <>
            <div className="flex justify-between items-center ">
                <Link href={`/product/${product._id}` } passHref >
                    <a className="py-1 px-2 rounded-md bg-indigo-400">View</a>
                </Link>
                <button disabled={product.inStock===0 ? true : false} onClick={()=> dispatch(addToCart(product, cart))} className="py-1 px-2 rounded-md bg-indigo-400">
                    Buy
                </button>
            </div>
            
        </>
        )
    }

    return(<div>
            <a href="#" className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images[0].url}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h2 className="mt-1 text-md font-medium text-gray-900">{product.title}</h2>
              <h3 className="mt-4 text-sm text-gray-700">{product.description}</h3>
            <div className="flex justify-between items-center mt-1">
                {
                    product.inStock > 0 
                    ? <p className=" text-lg font-medium text-gray-900">In Stock: {product.inStock}</p>
                    : <p className=" text-lg font-medium text-gray-900">Out stock</p>
                }
                <p className="text-lg font-medium text-gray-900">${product.price}</p>
            </div>
            </a>
                {userLink()}
            </div>
          
    )
}

export default ProductItem