const sql = require("mssql");

const config = {
    user: "sa",
    password: "cxs123456",
    server: "192.168.31.113",
    database: "MedSysDB",
    options: {
        encrypt: false,  // 启用加密
        trustServerCertificate: true,  // 信任自签名证书
        enableArithAbort: true
    },
    port: 1433
};
require('events').EventEmitter.prototype._maxListeners = 100;  // 增加最大监听器数量


const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => {
        console.log("Database Connection Failed! ", err);
        // 输出详细错误信息
        console.log(err.stack);
        process.exit(1);
    });
