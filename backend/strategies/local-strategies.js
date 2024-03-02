import passport from "passport";
import { Strategy } from "passport-local";
import userModel from "../model/userModel.js";

export default passport.use(
    new Strategy(async(username, password, done) => {
        console.log(`username: ${username}  password: ${password}`)
        try {
            const user = await userModel.findOne({username})

            if(!user || user.password !== password){
                throw new Error('Invalid Credentials!');
            }
                done(null, user)
        } catch (error) {
            done(error, null)
            console.log(error)
        }
    })
);