import passport from "passport";
import { Strategy } from "passport-local";
import userModel from "../model/userModel.js";
import { comparedPassword } from "../config/bcrypt.js";
passport.serializeUser((user, done) => {
    console.log(`Serializa: ${user}`)
    done(null, user._id)
});

passport.deserializeUser(async(_id, done) => {
    console.log(`Derializa UserId:${_id}`)
    try {
        const user = await userModel.findOne({_id});
        if(!user){
            throw new Error('user not found!')
        }
        done(null, user)
    } catch (error) {
        console.log(error)
        done(err, nul)

    }
})

export default passport.use(
    new Strategy(async(username, password, done) => {
        console.log(`username: ${username}  password: ${password}`)
        try {
            const user = await userModel.findOne({username})

            if(user && comparedPassword(password, user.password)){
                done(null, user)
            }else{
                throw new Error('Invalid Credentials')
            }

        } catch (error) {
            done(error, null)
            console.log(error)
        }
    })
);