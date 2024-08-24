const express = require("express");
const router = express.Router();
const {
  test,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const verify = require("../utils/verify");

router.get("/", test);

router.post("/update/:id", verify, updateUser);
router.delete("/delete/:id", verify, deleteUser);

module.exports = router;
