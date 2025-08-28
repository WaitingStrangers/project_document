//导入路由组件
const express = require("express");
const router = express.Router();
//导入token 判断组件
const authMiddleware = require("../middleware/auth")
//导入controlle控制层
const docController = require("../controllers/docController");

//创建路由方法
router.get("/",authMiddleware,docController.selectalldata);


//导出路由对象
module.exports = router;