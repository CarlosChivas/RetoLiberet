const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cron = require('node-cron');

const User = require("./models/User")
const Campaign = require("./models/Campaign")

const app = express();
const http = require('http').createServer(app);

/*const ctrlAuth = require("./passport/auth");

const pathsToNotBlock = new Set(['/', '/user', '/login', '/register']); // paths that can be accessed by anyone

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const connection = mongoose.connection;

const Feed = require("./models/Feed");
const Area = require("./models/Area");
const User = require("./models/User");
*/
/*const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'feedbacktecgdl@gmail.com',
        pass: 'feedback123.'
    }
});*/


require('dotenv').config();
/*------------------------------------End of imports------------------------------------*/

// Conectarse a base de datos
mongoose.connect(`mongodb+srv://carlos:${process.env.CONT}@cluster0.gpv9w.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(ms => console.log('DB connected'))
    .catch(err => console.log(err));
    cron.schedule(' */5 * * * * *', async () => {
        var campaigns = await Campaign.find({});
        var tempUser;
        for (var campaign in campaigns) {
            tempUser = await User.findById(campaigns[campaign].client);
            tempUser.credits = tempUser.credits - 1;
            if(tempUser.credits<=0){
                await Campaign.findOneAndDelete({ _id: campaigns[campaign]._id })
            }
            tempUser.save();
          }
      });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser('secretWord'));
app.use(passport.initialize());
app.use(passport.session());
//require('./passport/passport')(passport);


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
/*------------------------------------End of middleware----------------------------------------*/

/*---------------------------------------End of routes---------------------------------------*/

app.use('/', require("./routes/users.routes.js"));
app.use('/', require("./routes/services.routes.js"));
app.use('/', require("./routes/actions.routes.js"));
app.use('/', require("./routes/campaigns.routes.js"));

//Starting server
module.exports = http;