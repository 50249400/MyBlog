const result = require('../../../libs/result');
const statusObj = require('../../../libs/statusCode');
const ConnecDataBaseAPI = require('../../../libs/connectDatabase');
const formart = require('../../../libs/format');
const { v4: uuidv4 } = require("uuid");

/* 
* 历程数据新增
* @params{string} inputDate 新增日期
* @params{string} title 标题
* @params{string} title 正文内容
*/
async function addCourse(req, res){
    let { inputDate, title, content } = req.body;
    if(!inputDate || !title || !content){
        res.send(result.fail(statusObj.statusArr[2].code, statusObj.statusArr[2].title));
        return;
    }

    inputDate = formart(inputDate, "YY-MM-DD");
    let sql = `INSERT INTO tbcourse(inputDate,title,content,id) VALUES('${inputDate}','${title}','${content}', '${uuidv4()}')`;
    sql_callBack = await ConnecDataBaseAPI(sql);

    if(sql_callBack.length == 0){
        res.send(result.fail(statusObj.statusArr[3].code, false, statusObj.statusArr[3].title));
    }else{
        res.send(result.success(statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
    }
}

/* 
* 历程数据修改
* @params{string} inputDate 新增日期
* @params{string} title 标题
* @params{string} title 正文内容
* @params{string} id UUID
*/
async function editCourse(req, res){
    let { inputDate, title, content, id } = req.body;
    if(!inputDate || !title || !content){
        res.send(result.fail(statusObj.statusArr[2].code, statusObj.statusArr[2].title));
        return;
    }

    inputDate = formart(inputDate, "YY-MM-DD");
    let sql = `UPDATE tbcourse set inputDate = '${inputDate}', title = '${title}', content = '${content}' WHERE id = '${id}'`;
    sql_callBack = await ConnecDataBaseAPI(sql);

    if(sql_callBack.length == 0){
        res.send(result.fail(statusObj.statusArr[3].code, false, statusObj.statusArr[3].title));
    }else{
        res.send(result.success(statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
    }
}

/* 
* 历程数据单条删除
* @params{string} id UUID
*/
async function deleteCourse(req, res){
    let {id} = req.body;
    
    let sql = `DELETE FROM tbcourse where id = '${id}'`;
    sql_callBack = await ConnecDataBaseAPI(sql);
    
    if(sql_callBack.affectedRows == 1){
        res.send(result.success('删除成功', statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
    }else{
        res.send(result.fail(statusObj.statusArr[3].code, false, '删除失败'));
    }
}

/* 
* 获取历程列表数据
* @params{string} start 分页页数
* @params{string} limit 每页查询数量
* @params{string} year 日期
*/
async function getCourseList(req, res){
    let start = req.body.start,limit = req.body.limit,year = req.body.year || new Date().getFullYear();

    let sql = `SELECT * FROM tbcourse WHERE inputDate LIKE '${year}%' LIMIT ${start},${limit}`;
    let sqlCount = "SELECT COUNT(*) FROM tbcourse";
    let sqlAllYear = "SELECT inputDate FROM tbcourse"
    sql_callBack = await ConnecDataBaseAPI(sql);
    sqlCount_callBack = await ConnecDataBaseAPI(sqlCount);
    sqlAllYear_callBack = await ConnecDataBaseAPI(sqlAllYear);

    for(let val of sql_callBack){
        val.inputDate = formart(val.inputDate, "YY-MM-DD");
    }
    let yearArr = sqlAllYear_callBack.map(item => {
        item.inputDate = formart(item.inputDate, "YY-MM-DD");
        return item.inputDate.split("-")[0];
    });
    yearArr = Array.from(new Set(yearArr));

    const data = {
        dataList: sql_callBack,
        total: sqlCount_callBack[0]["COUNT(*)"],
        yearArr: yearArr
    }
    res.send(result.success(data, statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
}

/* 
* 获取单条历程详情
* @params{string} id UUID
*/
async function getCourseDetail(req, res){
    let id = req.query.id;

    let sql = `SELECT * FROM tbcourse WHERE id = '${id}'`;
    sql_callBack = await ConnecDataBaseAPI(sql);


    const data = {
        ...sql_callBack[0]
    };
    res.send(result.success(data, statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
}


module.exports = {
    addCourse,
    editCourse,
    deleteCourse,
    getCourseList,
    getCourseDetail
}