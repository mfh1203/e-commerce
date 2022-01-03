import {getData} from "../utils/fetchData"
import { useState } from "react"

import Head from "next/head"
import ProductItem from "../components/products/Productitem"


export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  return (<div>
    <Head>
      <title>
        Home Page
      </title>
    </Head>

    {
      products.length === 0
      ? <h2>No Products</h2>
      
      : <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
              <div  className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {products.map(product =>(
                  <ProductItem key={product._id} product={product} />
                  
                )) }
              </div>
          </div>
        </div>
    }
  </div>
    
  )
}

export async function getServerSideProps() {
  const res = await getData("product")
  return {
    props: {
      products: res.products,
      result: res.result
    }, 
  }
}