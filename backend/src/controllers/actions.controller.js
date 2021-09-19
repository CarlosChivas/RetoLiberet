const actionsCtrl = {}
const Action = require('../models/Action');
const bcrypt = require('bcryptjs');
const passport = require("passport");

require('../passport/passport')(passport);

const mongoose = require("mongoose");


actionsCtrl.getHistoryActions = async (req, res, next) => {
    var historyActions = await Action.find({client: req.user.id}).sort({createdAt: -1})
    res.send(historyActions)
}
module.exports = actionsCtrl;