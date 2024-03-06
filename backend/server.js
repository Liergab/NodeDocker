import express      from 'express';
import 'dotenv/config';
import users        from './routes/users.js'
import discordUser from './routes/discordUser.js'
import products     from './routes/products.js'
import cookieParser from 'cookie-parser';
import session      from 'express-session';
import passport     from 'passport'; 
import MongoStore from 'connect-mongo';
// import './strategies/local-strategies.js'
import './strategies/discord-strategies.js'
import mongoose from 'mongoose';
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));

const app = express()

app.use(express.json())
app.use(cookieParser('helloworld'))

app.use(session({
    secret:'sample',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000 * 60,
    },
    store: MongoStore.create({
        client:mongoose.connection.getClient()
    })
}));

app.use(passport.initialize());
app.use(passport.session());



// app.post('/api/auth',passport.authenticate("local"), (req ,res) => {
//     res.sendStatus(200)
// })
// app.get('/api/auth/discord',passport.authenticate("discord"), (req ,res) => {
       
// })
// app.get('/api/auth/discord/redirect',passport.authenticate("discord"), (req ,res) => {
//        res.status(200).json({user:req.user})
// })

// app.get('/api/auth/discord/status',isAuthenticated,(req ,res) => {
//     res.status(200).json({user:req.user})
// })

app.use(discordUser)
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
});  