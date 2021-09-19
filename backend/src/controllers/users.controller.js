const usersCtrl = {}
const User = require('../models/User');
const Service = require('../models/Service');
const Action = require('../models/Action')
const bcrypt = require('bcryptjs');
const passport = require("passport");

require('../passport/passport')(passport);

const mongoose = require("mongoose");

usersCtrl.login = (req, res, next) => {
    console.log("Se hizo una peticion login")
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        else if (!user) res.send("No user found");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Successfully Authenticated');
            })
        }
    })(req, res, next);
}

usersCtrl.register = (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                email: req.body.username,
                name: "Carlos",
                lastName: "Estrada",
                password: hashedPassword,
                credits: 0
            });
            await newUser.save();
            res.send("User created");
        }
    })
}

usersCtrl.user = (req, res) => {
    if (req.user) {
        res.send(req.user)
    }
    else {
        res.send(null);
    }
}

usersCtrl.logout = (req, res) => {
    req.logout();
    res.send("Salió de sesión correctamente")
}

usersCtrl.recharge = async (req, res, next) => {
    var newAmount = parseInt(req.user.credits)
    newAmount = newAmount + parseInt(req.body.amount)
    const newAction = new Action({
        name: "Recarga de creditos",
        client: req.user.id,
        cost: parseInt(req.user.credits)
    });
    await newAction.save();
    User.findByIdAndUpdate(req.user._id, { credits: newAmount }, async (err, doc) => {
        if (err) throw err;
        else if (doc) res.send("User updated");
        else if (!doc) res.send("User doesn't exist");
    });
}

usersCtrl.hire = async (req, res, next) => {
    const serviceHired = await Service.findById(req.body.id);
    if(req.user.credits >= parseInt(serviceHired.cost)){
        req.user.credits = req.user.credits - parseInt(serviceHired.cost);
        await req.user.save();
        const newAction = new Action({
            name: serviceHired.name,
            client: req.user.id,
            cost: serviceHired.cost * (-1)
        });
        await newAction.save();
        res.send("Servicio contratado");
    } else {
        res.send("Sin creditos")
    }
}
module.exports = usersCtrl;