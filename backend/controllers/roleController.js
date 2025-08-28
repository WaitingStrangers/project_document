const sql = require('mssql');
const role = require("../models/roleModel");

// 查询所有角色
exports.getAllRoles = async (req, res) => {
    try {
        const result = await role.findAll();
        res.json(result);
    } catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).json({ msg: '获取角色失败' });
    }
};

// 查询单个角色
exports.getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM roles WHERE id = ${id}`;
        if (result.recordset.length === 0) return res.status(404).json({ msg: '角色不存在' });
        res.json(result.recordset[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: '获取角色失败' });
    }
};

// 创建角色
exports.createRole = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        await sql.query`INSERT INTO roles (name, description, status) VALUES (${name}, ${description}, ${status ?? 1})`;
        res.json({ msg: '角色创建成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: '创建角色失败' });
    }
};

// 更新角色
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
        await sql.query`UPDATE roles SET name=${name}, description=${description}, status=${status} WHERE id=${id}`;
        res.json({ msg: '角色更新成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: '更新角色失败' });
    }
};

// 删除角色
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM roles WHERE id=${id}`;
        res.json({ msg: '角色删除成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: '删除角色失败' });
    }
};
