const { Router } = require('express');
const campaignsCtrl = require("../controllers/campaigns.controller");

const ctrlAuth = require("../passport/auth");

const router = Router();

router.post("/createCampaign", ctrlAuth.user, campaignsCtrl.createCampaign);
router.get("/getCampaigns", ctrlAuth.user, campaignsCtrl.getCampaigns);

module.exports = router;