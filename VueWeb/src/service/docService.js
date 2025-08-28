//导入API接口函数
import api  from "./api";

export const docRouter = {
    //定义一个查询数据的方法
    getallData(){
        return api.get("/document");
    }
} 