const { Router } = require('express');
const actionsCtrl = require("../controllers/actions.controller");

const ctrlAuth = require("../passport/auth");

const router = Router();

router.get("/getHistory", ctrlAuth.user, actionsCtrl.getHistoryActions);
module.exports = router;