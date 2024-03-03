import express      from 'express';
import 'dotenv/config';
import db           from './config/connection.js';
import users        from './routes/users.js'
import products     from './routes/products.js'
import cookieParser from 'cookie-parser';
import session      from 'express-session';
import passport     from 'passport'; 
import './strategies/local-strategies.js'
const app = express()

app.use(express.json())
app.use(cookieParser('helloworld'))

app.use(session({
    secret:'sample',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000 * 60,
    }
}));

app.use(passport.initialize());
app.use(passport.session());



app.post('/api/auth',passport.authenticate("local"), (req ,res) => {
    res.sendStatus(200)
})
app.use(users);
app.use(products)

app.get('/',(req,res) => {
    console.log(req.session)
    console.log(req.sessionID)
    req.session.visited = true
    res.send('have session')
})


app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000`);
    db();
});  