import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as controller from '../controller/discordUserController.js'
import isAuthenticated from '../middleware/ensureAuthenticated.js';


router.get('/api/auth/discord',passport.authenticate("discord"), (req ,res) => {
       
})

router.get('/api/auth/discord/redirect',passport.authenticate("discord"), (req ,res) => {
    res.status(200).json({user:req.user})
})

router.get('/api/auth/discord/status',isAuthenticated,(req ,res) => {
    res.status(200).json({user:req.user})
})

router.get('/api/getuser/:id', controller.getDiscordUserById)


export default router