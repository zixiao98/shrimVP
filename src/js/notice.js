/**
 * 
 * @param {*} type 
 * @param {*} data 
 * @param {*} time 
 * @param {*} flag 
 */

function notice(type,data,time,flag){
    if(flag){
        this.$notify({
            type: type,
            title: `状态码：${data.status}`,
            message: `${data.data.tips}`,
            duration:time
        });
        return;
    }
    this.$notify({
        type: type,
        title: `状态码：${data.response.status}`,
        message: `${data.response.data.tips}`,
        duration:time
    });
}
function noticeInfo(type,title,message,duratiion){
    this.$notify({
        type: type,
        title: title,
        message: message,
        duration:duratiion
    });
}
export {
    notice,
    noticeInfo
} ;