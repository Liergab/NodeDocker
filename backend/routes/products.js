import express from 'express';
import { createUserValidation } from '../util/createUserValidation.js';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import userModel from '../model/userModel.js';

const router = express.Router();

router.get('/product', (req,res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)

    if(req.signedCookies.sec && req.signedCookies.sec === "hello world"){
        res.send('Product');
    }else{
        
        return res.status(403).json({error:'Cant go to this routes'})
    }
   
  
})

export default router