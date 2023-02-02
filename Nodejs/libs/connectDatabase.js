var mySql = require('mysql'); //导入mysql数据库实例

// 开始连接MySQL数据库
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20000402',
    database: 'blog_schema'
});
connection.connect();   //那么，下面的代码会为你建立一个新的连接。

// 增加数据操作
// var addsql = 'INSERT INTO myindex(name,age,sex) VALUES ?'
// var addSqlParams = [   
//     ["Mateo",34,"男"],
//     ["xiaoming",20,"男"],
//     ["xiaohon",22,"女"]
// ]; //插入多条数据格式
// connection.query(addsql,[addSqlParams],function(err, result){
//     if(err){
//         console.log('添加数据错误');
//         console.log(err)
//         return
//     }else{
//         console.log('-------------数据添加成功');
//     }
// })

// 删除数据操作
// function deleteSql(name) {
//     console.log('deleteSql', name);
//     var sql = `DELETE FROM myindex WHERE name = '${name}'`
//     connection.query(sql, (err, result) => {
//         if (err) {
//             console.log("----------------删除失败");
//             console.log(err);
//         } else {
//             console.log("----------------删除成功");
//             console.log(result);
//         }
//     })
// }

// 查询数据操作
// var searchSql = "SELECT * FROM myindex";
// connection.query(searchSql, (err, result) => {
//     if (err) {
//         console.log("----------------查询错误");
//         console.log(err);
//     } else {
//         console.log("----------------查询成功");
//         console.log(result);
//         result.forEach((value, index) => {
//             if (value.name == "Mateo") {
//                 deleteSql(value.name);
//             }
//         })
//     }
// })

// 改变数据操作
// var updateSql = "UPDATE myindex SET name = 'xiaowang' WHERE age = 20";
// // SET ... 修改项，WHERE 依赖项
// connection.query(updateSql, (err, result) => {
//     if (err) {
//         console.log("----------------修改错误失败");
//         console.log(err);
//     } else {
//         console.log("----------------修改成功");
//         console.log(result);
//     }
// })

function dataBaseControl(sql,callback){
    connection.query(sql,(error,result)=>{
        if(error){
            console.error(error);
            callback(null);
            return;
        }
        callback(result);
    })
}

let ConnecDataBaseAPI = function(sql) {
	return new Promise((resolved, rejected)=>{
		dataBaseControl(sql, (result)=>{
			if (result === null) {
				rejected(null);
			} else {
				resolved(result);
			}
		});
	});
}
module.exports = ConnecDataBaseAPI;