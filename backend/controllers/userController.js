// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/default");

class UserController {
    static async login(req, res) {
        console.log("请求登录接口：",res.body);
        const { username, password } = req.body;
        console.log(username,password);
        if (!username || !password) return res.status(400).json({ msg: "用户名或密码不能为空" });

        const user = await User.findByUsername(username);
        if (!user) return res.status(401).json({ msg: "用户不存在" });

        //密码默认存储的是哈希值，会把用户输入先转换成哈希值，然后在进行对比哈希值
        //const match = await bcrypt.compare(password, user.password);
        if (password != user.password) return res.status(401).json({ msg: "密码错误" });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
        res.json({ msg: "登录成功", token });
    }

    static async getAll(req, res) {
        const users = await User.findAll();
        res.json(users);
    }

    static async getById(req, res) {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "用户不存在" });
        res.json(user);
    }

    static async create(req, res) {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ msg: "用户名或密码不能为空" });

        const existing = await User.findByUsername(username);
        if (existing) return res.status(400).json({ msg: "用户名已存在" });

        const hashed = await bcrypt.hash(password, 10);
        await User.create(username, hashed, role);
        res.json({ msg: "创建成功" });
    }

    static async update(req, res) {
        const id = req.params.id;
        const { username, password, role, status } = req.body;
        const fields = {};
        if (username) fields.username = username;
        if (password) fields.password = await bcrypt.hash(password, 10);
        if (role) fields.role = role;
        if (status !== undefined) fields.status = status;

        await User.update(id, fields);
        res.json({ msg: "更新成功" });
    }

    static async delete(req, res) {
        const id = req.params.id;
        await User.delete(id);
        res.json({ msg: "删除成功" });
    }
}

module.exports = UserController;
