function format(ts:any, option:any) {
    var date = new Date(ts);
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var week = date.getDay()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    
    //获取 年月日
    if (option == 'YY-MM-DD') return [year, month, day].map(formatNumber).join('-')
  
    //获取 年月
    if (option == 'YY-MM') return [year, month].map(formatNumber).join('-')
  
    //获取 年
    if (option == 'YY') return [year].map(formatNumber).toString()
  
    //获取 月
    if (option == 'MM') return  [month].map(formatNumber).toString()
  
    //获取 日
    if (option == 'DD') return [day].map(formatNumber).toString()
  
    //获取 时分秒
    if (option == 'hh-mm-ss') return [hour, minute, second].map(formatNumber).join(':')
  
    //获取 时分
    if (option == 'hh-mm') return [hour, minute].map(formatNumber).join(':')
  
    //获取 分秒
    if (option == 'mm-dd') return [minute, second].map(formatNumber).join(':')
  
    //获取 时
    if (option == 'hh')  return [hour].map(formatNumber).toString()
  
    //获取 分
    if (option == 'mm')  return [minute].map(formatNumber).toString()
  
    //获取 秒
    if (option == 'ss') return [second].map(formatNumber).toString()
  
    //默认 时分秒 年月日
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  function formatNumber(n:any) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  export default format