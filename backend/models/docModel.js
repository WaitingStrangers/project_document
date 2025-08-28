//数据访问层数据
//导入数据连接的连接池
const { poolPromise } = require("../config/db")

//创建查询所有数据的方法
exports.selectAllData = async () =>{
    //等待连接池连接
    const pool = await poolPromise;
    //从连接池获取数据
    const result = await pool.request().query("select * from report r join reportcontext t on r.id=t.reportid");
    //返回数据
    return result.recordset;
}