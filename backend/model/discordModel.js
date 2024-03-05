import mongoose, { Schema, model } from "mongoose";

const discordSchema = new Schema({
    discordId:{
        type:String,
    },
    username:{
        type:String
    },
    email:{
        type:String
    }
},{timestamps:true});

export default model('discordUser', discordSchema);