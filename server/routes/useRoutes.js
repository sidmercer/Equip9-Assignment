const express = require("express");
const userController = require("../controllers/userController");
const authenticateToken=require("../middleware/authenticateToken")
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/home", authenticateToken, userController.getUser);

module.exports = router;
