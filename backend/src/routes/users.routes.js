const { Router } = require('express');
const usersCtrl = require("../controllers/users.controller");

const ctrlAuth = require("../passport/auth");

const router = Router();

router.post("/login", usersCtrl.login);
router.post("/register", usersCtrl.register);
router.get("/user", ctrlAuth.user, usersCtrl.user);
/*router.get("/users", ctrlAuth.manager, usersCtrl.getUsers);
router.put("/users", ctrlAuth.manager, usersCtrl.editUsers);
router.delete("/users", ctrlAuth.manager, usersCtrl.removeUser);*/
router.get("/logOut", ctrlAuth.user, usersCtrl.logout);
router.put("/recharge", ctrlAuth.user, usersCtrl.recharge);
router.put("/hire", ctrlAuth.user, usersCtrl.hire);
module.exports = router;