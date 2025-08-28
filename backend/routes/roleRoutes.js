const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleController = require('../controllers/roleController');

router.get('/',authMiddleware, roleController.getAllRoles);       // 查询所有角色
router.get('/:id', authMiddleware, roleController.getRoleById);    // 查询单个角色
router.post('/', authMiddleware, roleController.createRole);       // 创建角色
router.put('/:id', authMiddleware, roleController.updateRole);     // 更新角色
router.delete('/:id', authMiddleware, roleController.deleteRole);  // 删除角色


module.exports = router;
