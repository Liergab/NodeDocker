import { Strategy } from "passport-discord";
import discordModel from "../model/discordModel.js";
import passport from "passport";
import 'dotenv/config';

const scope = ['identify', 'guilds', 'guilds.join'];

passport.serializeUser((user, done) => {
    console.log(`Serializa: ${user}`)
    done(null, user._id)
});

passport.deserializeUser(async(_id, done) => {
    console.log(`Derializa UserId:${_id}`)
    try {
        const user = await discordModel.findOne({_id});
        if(!user){
            throw new Error('user not found!')
        }
        done(null, user)
    } catch (error) {
        console.log(error)
        done(error, nul)

    }
})

export default passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:"http://localhost:5000/api/auth/discord/redirect",
        scope:scope
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const user = await discordModel.findOne({discordId:profile.id});
            if(!user){
                const saveUser = new discordModel({
                    discordId : profile.id,
                    username  : profile.username,
                    email     : profile.email
                });
                const newSaveUser = await saveUser.save();
                return done(null, newSaveUser)
            }
            return done(null,user)
          
        } catch (error) {
            console.log(error)
            done(err,null)
        }
    })
)