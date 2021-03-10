export function formatDate(time){
    let date = new Date()
    if (time) date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + (date.getHours()>9 ? date.getHours():'0' + date.getHours())
        + ':' + (date.getMinutes()>9 ? date.getMinutes():'0'+date.getMinutes())
        + ':' + (date.getSeconds()>9 ? date.getSeconds():'0'+date.getSeconds())
}
