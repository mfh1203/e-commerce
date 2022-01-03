import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"
    },
    root : {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default:"https://images.unsplash.com/photo-1640398251733-33c23a4c36f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
    }
},{
    timestamps: true
})

let Dataset= mongoose.models.user || mongoose.model("user", userSchema)
export default Dataset