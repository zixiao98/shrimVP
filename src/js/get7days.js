module.exports = () =>{
        var myDate = new Date(); //获取今天日期
        // var year= new Date().getFullYear();
        myDate.setDate(myDate.getDate() - 7);
        var dateArray = [];
        var dateTemp;
        var flag = 1;
        for (var i = 0; i < 7; i++) {
            var month = myDate.getMonth()+1
            month = month < 10 ?'0'+ month :month
            var date = myDate.getDate()  <10 ? '0' +myDate.getDate() :myDate.getDate()
            // dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
            // var year= (year+1)
            // 判断是不是相差年份
            // if (i!=0&&(month+"-"+date)=="01-01") {
            //     year++
            // }
            dateTemp = month+"-"+date;
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() + flag);
        }
        return dateArray
}


