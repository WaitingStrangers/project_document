// models/userModel.js
const { poolPromise, sql } = require("../config/db");

class User {
    static async findAll() {
        console.log("请求用户接口");
        
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT id, username, status, role, created_at, updated_at FROM Users");
        return result.recordset;
    }

    static async findById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT id, username, status, role, created_at, updated_at FROM Users WHERE id=@id");
        return result.recordset[0];
    }

    static async findByUsername(username) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .query("SELECT * FROM Users WHERE username=@username");
        return result.recordset[0];
    }

    static async create(username, hashedPassword, role = 'user') {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, hashedPassword)
            .input("role", sql.NVarChar, role)
            .query("INSERT INTO Users (username, password, role) VALUES (@username, @password, @role)");
        return result;
    }

    static async update(id, fields) {
        const pool = await poolPromise;
        const setClauses = [];
        for (let key in fields) {
            setClauses.push(`${key}=@${key}`);
        }
        const query = `UPDATE Users SET ${setClauses.join(", ")}, updated_at=GETDATE() WHERE id=@id`;
        const request = pool.request().input("id", sql.Int, id);
        for (let key in fields) {
            request.input(key, sql.NVarChar, fields[key]);
        }
        return request.query(query);
    }

    static async delete(id) {
        const pool = await poolPromise;
        return pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Users WHERE id=@id");
    }
}

module.exports = User;
