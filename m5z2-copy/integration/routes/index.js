const express = require("express");

const router = new express.Router();

const user = require("../controllers/user");
const hello = require("../controllers/hello");

router.get("/hello", hello.get);

router.get("/users", user.getUsers);
router.post("/users", user.createUser);
router.delete("/users", user.deleteUsers);

module.exports = router;