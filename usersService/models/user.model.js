// const pool = require('../db/dbConnections')
const mssql = require('mssql');
const config = require('../db/dbCongif')
const pool = mssql.connect(config)

class UserModel {

    tableName = 'users';

    find = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        const results = await (await pool).request().query(sql);
        return results.recordsets[0];
    }

    findOne = async (param) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${param}`
        const results = await (await pool).request().query(sql);
        // console.log('result<<<<>>>', results);
        return results.recordsets[0][0]
    }

    findOneByEmail = async (email) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = '${email}'`
        const results = await (await pool).request().query(sql);
        return results.recordsets[0][0]
    }

    create = async (user) => {
        let results = await (await pool).request()
            .input('username', mssql.VarChar(50), user.username)
            .input('password', mssql.Char(100), user.password)
            .input('first_name', mssql.VarChar(50), user.first_name)
            .input('last_name', mssql.VarChar(50), user.last_name)
            .input('email', mssql.VarChar(100), user.email)
            .execute('uspInsertInToUsers')
        return results.recordsets
    }

    update = async (id, user) => {
        let results = await (await pool).request()
            .input('id', mssql.Int, id)
            .input('username', mssql.VarChar(50), user.username)
            .input('first_name', mssql.VarChar(50), user.first_name)
            .input('last_name', mssql.VarChar(50), user.last_name)
            .input('email', mssql.VarChar(100), user.email)
            .execute('uspUpdateInToUsers')
        return results.recordsets
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} `
        const result = await (await pool).request().query(sql)
        const affectedRows = result ? result.rowsAffected : 0;
        return affectedRows
    }
}

module.exports = new UserModel
