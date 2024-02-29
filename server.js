import express from 'express';
import 'dotenv/config';
import db from './config/connection.js';
import userModel from './model/userModel.js';
import {query, validationResult, checkSchema ,matchedData} from 'express-validator';
import { createCheckSchema } from 'express-validator/src/middlewares/schema.js';
import { createUserValidation } from './util/createUserValidation.js';
const app = express();
app.use(express.json())



const MockData = [{"id":1,"first_name":"Donica","last_name":"Hilling","email":"dhilling0@mozilla.com","gender":"Female","ip_address":"116.37.104.171"},
{"id":2,"first_name":"Daloris","last_name":"Pinor","email":"dpinor1@vkontakte.ru","gender":"Female","ip_address":"194.242.0.71"},
{"id":3,"first_name":"Kennedy","last_name":"Baylay","email":"kbaylay2@statcounter.com","gender":"Male","ip_address":"37.139.18.177"},
{"id":4,"first_name":"Jayne","last_name":"Barry","email":"jbarry3@globo.com","gender":"Female","ip_address":"254.46.165.221"},
{"id":5,"first_name":"Sean","last_name":"Piscopo","email":"spiscopo4@stumbleupon.com","gender":"Male","ip_address":"178.159.126.134"},
{"id":6,"first_name":"Nata","last_name":"Orrett","email":"norrett5@samsung.com","gender":"Female","ip_address":"160.246.76.254"},
{"id":7,"first_name":"Genna","last_name":"Muspratt","email":"gmuspratt6@dot.gov","gender":"Female","ip_address":"178.92.50.64"},
{"id":8,"first_name":"Dorelia","last_name":"Frigout","email":"dfrigout7@163.com","gender":"Female","ip_address":"232.4.110.27"},
{"id":9,"first_name":"Zacharie","last_name":"Hazlegrove","email":"zhazlegrove8@comcast.net","gender":"Male","ip_address":"27.64.103.68"},
{"id":10,"first_name":"Arlinda","last_name":"Grubey","email":"agrubey9@blogtalkradio.com","gender":"Bigender","ip_address":"96.142.89.209"},]

app.get('/user', async(req,res) => {
    const user = await userModel.find();

    res.status(200).json({data:user})
})

app.post('/user',checkSchema(createUserValidation), async(req,res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    try { 
        if(!result.isEmpty()){
            const errors = result.errors.map(error => ({
               
                msg: error.msg
               
            }));

            return res.status(400).json({ error: errors });
        }
        const user = await userModel.create({...data})

         res.status(201).json({data:user})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error})
    }
});

app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000`);
    db();
});  