import mongoose from "mongoose"; 

const Schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})


const User = mongoose.model("Register", Schema);

export default User;