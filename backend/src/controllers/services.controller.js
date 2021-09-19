const servicesCtrl = {}
const Service = require('../models/Service');
const passport = require("passport");

require('../passport/passport')(passport);

const mongoose = require("mongoose");

servicesCtrl.getServices = async (req, res, next) => {
    var services = await Service.find({});
    res.send(services)
}
servicesCtrl.createService = async (req, res, next) => {
    if(req.user.credits < 5){
        res.send("No tienes suficientes creditos");
    } else {
        const newService = new Service({
            name: req.body.name,
            cost: req.body.cost,
            owner: req.user.id
        })
        newService.save().then(savedDoc => {
            res.send("Servicio creado")
        });
    }
}

module.exports = servicesCtrl;