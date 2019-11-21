
const Pool = require('pg').Pool;

const config=require('./config.json');
module.exports.getOfDB=(sql,data=[],callback,error)=>{
    var pool = new Pool(config.connection);
    pool.query(sql,data,(err,result)=>{
        if(err){
            error(err);
        }else{
            callback(result.rows);
        }
    })
};

module.exports.execute=(sql,data=[],callback,error)=>{
    var pool = new Pool(config.connection);
    pool.query(sql,data,(err,result)=>{
        if(err){
            error(err);
        }else{
            callback(result);
        }
    })
};