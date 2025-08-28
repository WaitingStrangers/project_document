//控制层代码，做数据处理和返回
//先导入数据访问层
const docController = require("../models/docModel");

//查询方法
exports.selectalldata = async (req,res) =>{
    try{
        const data = await docController.selectAllData();
        res.json(data)
    }catch(err){
        console.error(err);
        res.status(500).json({ msg: '获取报告数据失败' });
    }
}