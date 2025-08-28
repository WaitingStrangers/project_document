// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const UserController = require("../controllers/userController");

// 登录
router.post("/login", UserController.login);

// 查询所有用户
router.get("/",authMiddleware, UserController.getAll);

// 查询单个用户
router.get("/:id", UserController.getById);

// 创建用户
router.post("/", UserController.create);

// 更新用户
router.put("/:id", UserController.update);

// 删除用户
router.delete("/:id", UserController.delete);

module.exports = router;
