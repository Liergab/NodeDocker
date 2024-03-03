import express from 'express';
import { createUserValidation } from '../util/createUserValidation.js';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import userModel from '../model/userModel.js';

const router = express.Router();

router.post('/user',checkSchema(createUserValidation), async(req,res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    try { 
        if(!result.isEmpty()){
            return res.status(400).json({error:result.errors})
        }
        const user = await userModel.create({...data})

         res.status(201).json({data:user})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error})
    }
});
router.get('/user', async(req,res) => {
    res.cookie('sec', 'hello world',{maxAge:60000 * 60, signed:true})
    const user = await userModel.find();

    res.status(200).json({data:user})
})

router.get('/user/auth/status', (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session)
    });
    console.log(req.sessionID)
   return req.session.user 
   ? res.status(200).send(req.session.user) 
   : res.status(401).send('Not authenticated');
})

router.post('/user/auth', async(req, res) => {
    const {username, password} = req.body
    try {
        const user = await userModel.findOne({username});

        if(!user || password !== user.password){
            res.status(401).json({err:'Invalid Credentials'})
        }else{
            req.session.user = user
            res.status(200).json(user)
        }
        
    } catch (error) {
        console.error(error);
        res.send(error)
    }
});

router.get('/api/auth/status', (req, res) => {
   
    console.log(req.session)
    return req.user ? res.status(200).json({data:req.user})  : res.sendStatus(401);

})

export default router