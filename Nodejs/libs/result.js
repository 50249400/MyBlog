module.exports ={
    success:(data=[],code=200,success=true,message='请求成功')=>{
        return {data,code,success,message}
    },
    fail:(code=401,success=false,message='认证失败')=>{
        return {code,success,message}
    }
}