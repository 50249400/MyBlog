const result = require('../../../libs/result');
const statusObj = require('../../../libs/statusCode');
const ConnecDataBaseAPI = require('../../../libs/connectDatabase');
const token = require('../../../libs/token');

async function userLogin(req,res){
    let username = req.body.username, password = req.body.password;
    if (!username || !password) {
        res.send(result.fail(statusObj.statusArr[2].code, statusObj.statusArr[2].title));
        return;
    }
    let sql = `select * from tbuser where username = '${username}' and password = '${password}' limit 1`,
    sql_callBack = await ConnecDataBaseAPI(sql);
    
    if(sql_callBack.length == 0){
        res.send(result.fail(statusObj.statusArr[3].code, false, statusObj.statusArr[3].title));
    }else{
        let resData = {
            username: sql_callBack[0].username,
            id: sql_callBack[0].id
        }
        res.send(result.success(resData,statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
    }
}

module.exports = {
    userLogin
}