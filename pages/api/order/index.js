import connectDB from "../../../utils/connectDB"
import auth from "../../../middleware/auth"
import Products from "../../../models/productModel"
import Orders from "../../../models/orderModel"

connectDB()

export default async (req, res) =>{
    switch(req.method){
        case "POST" :
            await createOrder(req, res)
            break
    }
}

const createOrder = async (req, res) =>{
    try {
        const result = await auth(req, res)
        const { address, mobile, cart, total} =req.body

        const newOrder= new Orders({
            user: result.id, address, mobile, cart, total
        })

        newOrder.save()

        res.json({
            msg:"Payment success ! We will contact you to confirm",
            newOrder
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}