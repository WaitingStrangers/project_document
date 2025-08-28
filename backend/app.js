// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/default");
const { poolPromise } = require("./config/db");

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 测试接口
app.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT 1 AS test");
        res.json({ msg: "Server is running", test: result.recordset[0].test });
    } catch (err) {
        res.status(500).json({ msg: "Database connection error", error: err.message });
    }
});

// TODO: 后续挂载路由
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//挂载路由
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const roleRouter = require('./routes/roleRoutes');
app.use('/api/roles', roleRouter);
const docRouter = require('./routes/docRoutes');
app.use('/api/document', docRouter);


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ msg: '服务器错误' });
});
