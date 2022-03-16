//定义一个对象把兼容代码封装进去
export default {
    //不同浏览器获得对象的兼容代码
    getEvent : function(e){//getEvent在这里是属性,所以用冒号不用等号!!!!
        return window.event || e;
    },
    //获得可视区域横坐标的兼容代码
    getClientX : function(evt){
        return this.getEvent(evt).clientX;
    },
    //获得可视区域纵坐标的兼容代码
    getClientY : function(evt){
        return this.getEvent(evt).clientY;
    },
    //获得向左卷曲出去的兼容代码
    getScrollLeft : function (){
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft ||0;
    },
    //获得向上卷曲出去的兼容代码
    getScrollTop : function (){
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop ||0;
    },
    //获取整个页面的横坐标的兼容代码
    getPageX : function(evt){
        return this.getEvent(evt).pageXOffset ? this.getEvent(evt).pageXOffset :
        this.getClientX(evt) + this.getScrollLeft();
    },
    //获取整个页面的纵坐标的兼容代码
    getPageY : function(evt){
        return this.getEvent(evt).pageYOffset ? this.getEvent(evt).pageYOffset :
        this.getClientY(evt) + this.getScrollTop();
    }
}