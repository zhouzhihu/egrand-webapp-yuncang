import moment from 'moment';
import Vue from 'vue';
Vue.filter('formatDatetime',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "YYYY-MM-DD HH:mm:ss"
        return moment(timeStamp,'x').format(format);
    }
    
})
Vue.filter('formatDate',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "YYYY-MM-DD"
        return moment(timeStamp,'x').format(format);
    }
    
})
Vue.filter('formatunix',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "x"
        return moment(timeStamp,'YYYY-MM-DD').unix(format);
    }
    
})