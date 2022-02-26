<template>
    <!-- 首页 -->
    <div id="homepage">
        <div class="box">
            <div class="chinese">
                <div><span>你的密码</span></div>
                <div><span>小助手</span></div>
            </div>
            <div class="english">
                <div><span>Your</span></div>
                <div><span>P</span>a<span>s</span>s<span>w</span>ord</div>
                <div><span>L</span>ittle <span>Ass</span>istant</div>
            </div>
            <div class='hamal'>
                <span>@{{userName}}</span>
            </div>
            <div class='tips'>
                <span>不止于密码 / It's not just about passwords</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userName:''
        }
    },
    name: "homepage",
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[0];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        this.userName = window.localStorage.getItem('userName');
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[0];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
</style>