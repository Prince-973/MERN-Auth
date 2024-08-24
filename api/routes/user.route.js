const express = require("express");
const router = express.Router();
const { test, updateUser } = require("../controller/user.controller");
const verify = require("../utils/verify");

router.get("/", test);

router.post("/update/:id", verify, updateUser);

module.exports = router;
