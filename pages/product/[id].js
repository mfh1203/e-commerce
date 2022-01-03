import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { addToCart } from '../../store/Action'
import { DataContext } from '../../store/GlobalState'

export default function Detail(props) {
  const [product1] = useState(props.product)
  const [tab, setTab] = useState(0)

  const {state, dispatch} = useContext(DataContext)
  const {cart} = state

   return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl md:mx-auto sm:px-6 lg:max-w-7xl  md:px-8 md:grid md:grid-cols-3 md:gap-x-8">
          <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden ">
            <img
              src={product1.images[tab].url}
              alt={product1.images[tab].url}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div  className="hidden md:grid  grid-rows-2 grid-flow-col md:gap-x-2 md:gap-y-2">
            {

                product1.images.map((img, index) =>(
                    <div key={index} className={`${tab===index ? "border-2 border-red-500" : null } aspect-w-3 aspect-h-2 rounded-lg overflow-hidden`}>
                    <img
                        src={img.url}
                        alt={img.url}
                        className= "hover:cursor-pointer w-full h-full object-center object-cover"
                        onClick={()=>setTab(index)}
                    />

            </div>
                ))
            }
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product1.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product1.price}</p>
            <form className="mt-10">
              <button
                onClick={() => dispatch(addToCart(product1, cart))}
                type="button"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product1.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product1.content}{product1.content}{product1.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


  
  export async function getServerSideProps({params:{id}}) {
    const res = await getData(`product/${id}`)
    return {
      props: {
        product: res.product,
      }, 
    }
  }




