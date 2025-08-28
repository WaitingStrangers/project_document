// models/roleModel.js
const { poolPromise, sql } = require("../config/db");

class Role {
    // 查询所有角色
    static async findAll() {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Roles");
        return result.recordset;
    }

    // 根据ID查询角色
    static async findById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT id, name, description, status, created_at, updated_at FROM Roles WHERE id=@id");
        return result.recordset[0];
    }

    // 新增角色
    static async create(name, description, status = 1) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("name", sql.NVarChar, name)
            .input("description", sql.NVarChar, description)
            .input("status", sql.Int, status)
            .query("INSERT INTO Roles (name, description, status) VALUES (@name, @description, @status)");
        return result;
    }

    // 更新角色
    static async update(id, fields) {
        const pool = await poolPromise;
        const setClauses = [];
        for (let key in fields) {
            setClauses.push(`${key}=@${key}`);
        }
        const query = `UPDATE Roles SET ${setClauses.join(", ")}, updated_at=GETDATE() WHERE id=@id`;
        const request = pool.request().input("id", sql.Int, id);
        for (let key in fields) {
            if (key === "status") {
                request.input(key, sql.Int, fields[key]);
            } else {
                request.input(key, sql.NVarChar, fields[key]);
            }
        }
        return request.query(query);
    }

    // 删除角色
    static async delete(id) {
        const pool = await poolPromise;
        return pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Roles WHERE id=@id");
    }
}

module.exports = Role;
