import express from 'express';
import { createUserValidation } from '../util/createUserValidation.js';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import userModel from '../model/userModel.js';
import  {generateHashedPassword} from '../config/bcrypt.js'
const router = express.Router();

router.post('/user',checkSchema(createUserValidation), async(req,res) => {
    const result = validationResult(req)
    const {username, password, displayname} = req.body
    try { 
        if(!result.isEmpty()){
            return res.status(400).json({error:result.errors})
        }
        const ifUserNameExist = await userModel.findOne({username});
        if(ifUserNameExist){
            res.status(400).json({err:'Email already Taken'})
        }
        const hashedPassword = await generateHashedPassword(password)
        const user = await userModel.create({username, displayname, password:hashedPassword})

         res.status(201).json({data:user})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error})
    }
});


router.get('/api/auth/status', (req, res) => {
    req.sessionStore.get(req.sessionID,(err, sessionData) => {
        if(err){
            console.log(err)
        }
        console.log('Session Data')
        console.log(sessionData)
        console.log(req.sessionID)
    })
   
    console.log(req.session)
    return req.user ? res.status(200).json({data:req.user}) : res.sendStatus(401);
})
router.post('/api/auth/logout', (req, res) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    req.logout((err) => {
        if (err) {
            return res.sendStatus(400);
        }
        res.clearCookie('connect.sid');
        return res.sendStatus(200);
    });
});





// router.get('/user/auth/status', (req, res) => {
//     req.sessionStore.get(req.sessionID, (err, session) => {
//         console.log(session)
//     });
//     console.log(req.sessionID)
//    return req.session.user 
//    ? res.status(200).send(req.session.user) 
//    : res.status(401).send('Not authenticated');
// })
// router.get('/user', async(req,res) => {
//     res.cookie('sec', 'hello world',{maxAge:60000 * 60, signed:true})
//     const user = await userModel.find();

//     res.status(200).json({data:user})
// })
export default router