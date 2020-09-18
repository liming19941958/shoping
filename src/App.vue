<template>
    <div id="app">
        <transition name="main">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "App",
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
   .main-enter{
       transform: translateX(-100%);
       opacity: 0;
   }
   .main-leave-to{
       transform: translateX(-100%);
       position: absolute;
       opacity: 0;
   }
    .main-enter-active,
    .main-leave-active{
        transition: all 0.7s ease;
    }
</style>
