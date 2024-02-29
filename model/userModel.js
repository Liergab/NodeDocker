import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
    },
    displayName:{
        type:String,
    }
});

export default model('users', userSchema)