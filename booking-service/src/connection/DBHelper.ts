// const Pool = require('pg').Pool;
import { Pool } from 'pg';
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;
const longZero = "00000000000000000000000";
var pool = new Pool({
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
});
export default class Connection {
    /**
     * @Function getOfDB
     * @Avoid to select data and return rows of data
     * @params  (sql: string, data: any[])
     * @Return Promise of Qeury DB
     * @ExampleCall await this.getOfDB("select * from customer",[])
     */
    public getOfDB = (sql: string, data: any[]) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, data).then((result) => {
                resolve(result.rows);
            }, err => {
                reject({ code: -1, message: err.stack })
            })
        })
    }
    /**
     * @Function execute
     * @Avoid to execute query in DB
     * @params  (sql: string, data: any[])
     * @Return Promise of Qeury DB
     * @ExampleCall await this.getOfDB("insert into customer (customer_id,customer_name) value",["customer01","Mr Been"])
     */
    public execute = (sql: string, data: any[]) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, data).then((result) => {
                resolve(result);
            }, err => {
                reject({ code: -1, message: err.stack })
            })
        })
    }
    /**
     * @Function getMaxID
     * @Avoid to auto Increase ID in table
     * @Params (table: string, field_name: string, type: string, length: number, extraquery: string)
     * @table table's name in DB
     * @field field's name for autoincrease
     * @type the prefix of field
     * @extraquery add extra condiction to query
     */
    public getMaxID = async (table: string, field_name: string, type: string, length: number, extraquery: string) => {
        return new Promise((resolve, reject) => {
            this.getOfDB(`select max(substr(${field_name},${type.length + 1},${length})) as max_id from ${table} ${extraquery}`, []).then((data: any) => {
                var max_id = type;
                if (data[0].max_id == null) {
                    max_id = type + longZero.substring(0, length - type.length - 1) + "1";
                } else {
                    max_id = type + (longZero.substring(0, length - type.length) + (parseInt(data[0].max_id) + 1)).substr(-(length - type.length));

                }
                resolve(max_id);
            }, err => {
                reject(err);
            })
        })
    }
    public getOne = (sql: string, data: any[]) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, data).then((result) => {
                if (result.rows.length > 0) {
                    resolve(result.rows[0]);
                } else {
                    resolve(null);
                }
            }, err => {
                reject({ code: -1, message: err.stack })
            })
        })
    }

}

