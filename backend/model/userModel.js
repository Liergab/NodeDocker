import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
    },
    displayname:{
        type:String,
    },
    password:{
        type:String,
    }
});

export default model('users', userSchema)