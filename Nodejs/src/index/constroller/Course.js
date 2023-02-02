const result = require('../../../libs/result');
const statusObj = require('../../../libs/statusCode');
const ConnecDataBaseAPI = require('../../../libs/connectDatabase');
const formart = require('../../../libs/format');

async function addCourse(req, res){
    let inputDate = req.body.inputDate,title = req.body.title,content = req.body.content;
    if(!inputDate || !title || !content){
        res.send(result.fail(statusObj.statusArr[2].code, statusObj.statusArr[2].title));
        return;
    }

    let sql = `INSERT INTO tbcourse(inputDate,title,content) VALUES('${inputDate}','${title}','${content}')`;
    sql_callBack = await ConnecDataBaseAPI(sql);

    if(sql_callBack.length == 0){
        res.send(result.fail(statusObj.statusArr[3].code, false, statusObj.statusArr[3].title));
    }else{
        res.send(result.success(statusObj.statusArr[0].code, true, statusObj.statusArr[0].title));
    }
}

async function getCourseList(req, res){
    let start = req.body.start,limit = req.body.limit,year = req.body.year || new Date().getFullYear();

    let sql = `SELECT * FROM tbcourse WHERE inputDate LIKE '${year}%' LIMIT ${start},${limit}`;
    let sqlCount = "SELECT COUNT(*) FROM tbcourse";
    let sqlAllYear = "SELECT inputDate FROM tbcourse"
    sql_callBack = await ConnecDataBaseAPI(sql);
    sqlCount_callBack = await ConnecDataBaseAPI(sqlCount);
    sqlAllYear_callBack = await ConnecDataBaseAPI(sqlAllYear);

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


module.exports = {
    addCourse,
    getCourseList
}