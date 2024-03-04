import { Strategy } from "passport-discord";
import passport from "passport";
import 'dotenv/config';

const scope = ['identify', 'guilds', 'guilds.join'];

export default passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:"http://localhost:5000/api/auth/discord/redirect",
        scope:scope
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
    })
)