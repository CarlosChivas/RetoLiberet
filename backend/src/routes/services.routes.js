const { Router } = require('express');
const servicesCtrl = require("../controllers/services.controller");

const ctrlAuth = require("../passport/auth");

const router = Router();

router.get("/getServices", ctrlAuth.user, servicesCtrl.getServices);
router.post("/createService", ctrlAuth.user, servicesCtrl.createService);
module.exports = router;