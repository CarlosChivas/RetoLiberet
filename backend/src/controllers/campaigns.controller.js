const campaignsCtrl = {}
const Campaign = require('../models/Campaign');
const bcrypt = require('bcryptjs');
const passport = require("passport");


require('../passport/passport')(passport);

const mongoose = require("mongoose");

campaignsCtrl.createCampaign = async (req, res, next) => {
    var newCampaign = new Campaign({
        name: req.body.name,
        client: req.user.id
    })
    await newCampaign.save();
    res.send("Campaña creada")
}

campaignsCtrl.getCampaigns = async (req, res, next) => {
    var myCampaigns = await Campaign.find({client: req.user.id})
    res.send(myCampaigns)
}
module.exports = campaignsCtrl;