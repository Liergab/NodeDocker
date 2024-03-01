import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
    },
    displayName:{
        type:String,
    },
    password:{
        type:String,
    }
});

export default model('users', userSchema)