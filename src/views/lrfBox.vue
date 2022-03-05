<template>
    <div class="main-container">
        <div class="main-box">
            <router-view></router-view>
        </div>
        <div id="starry-box">
      <vue-particles
        color="#c93232"
        :particleOpacity="0.7"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="3"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="80"
        :moveSpeed="2"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
    </div>
  </div>
</template>

<script>
//装载登录、注册、重置代码的父组件
</script>

<style lang="scss">
    @import '@/scss/lrfBox'
</style>