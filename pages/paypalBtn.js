import {useRef, useEffect } from "react"
import {postData} from "../utils/fetchData"

const PaypalBtn=({total, address, mobile, state, dispatch}) =>{
    const refPaypalBtn = useRef()
    const {order, cart, auth} = state

    useEffect(()=>{
        paypal.Buttons({
            createOrder: function(data, actions) {
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
                dispatch({type:"NOTIFY", payload:{loading: true}})

                postData("order",{ address, mobile, cart, total}, auth.token)
                .then(res=> {
                  if(res.err) return dispatch({type : "NOTIFY", payload: {error: res.err}})

                  dispatch({type:"ADD_CART", payload:[]})
                  return dispatch({type : "NOTIFY", payload: {success: res.msg}})
                  
                })

                // This function shows a transaction success message to your buyer.
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            }
          }).render(refPaypalBtn.current);
          //This function displays Smart Payment Buttons on your web page.
    },[])


    return (
        <div>
            <div ref={refPaypalBtn}></div>
        </div>
    )
}

export default PaypalBtn