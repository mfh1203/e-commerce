import { XIcon } from '@heroicons/react/outline'
import { useState } from "react"

const Toast=({msg, handleShow, bgColor}) => {


    return (
        <div>
            <div onClick={handleShow} className={` border-l-4 p-4 border-black ${bgColor}` } role="alert">
                <p className="font-bold">
                    {msg.title}
                </p>
                <p>
                    {msg.msg}
                </p>
            </div>
        </div>
        
)
}

export default Toast 