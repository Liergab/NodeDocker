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

export default router