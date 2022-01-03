import {useContext} from "react"
import { DataContext } from "../store/GlobalState"
import Toast from "./Toast"

const Notify =()=> {
    const{state, dispatch} = useContext(DataContext)
    const { notify } = state 

    return (
        <>
            {notify.error && 
                <Toast 
                    msg={{msg: notify.error, title: "Error"}}
                    handleShow ={() => dispatch({type: "NOTIFY", payload:{}})}
                    bgColor="bg-red-500"
                />}
            {notify.success && 
                <Toast 
                    msg={{msg: notify.success, title: "Success"}}
                    handleShow ={() => dispatch({type: "NOTIFY", payload:{}})}
                    bgColor="bg-blue-500"
                />}
        </>
    )
}

export default Notify
