<template>
    <div class="msgTab">
        <el-button style="margin: 10px 0 ;" @click="backHome">返 回</el-button>
        <msgTab></msgTab>
    </div>
</template>

<script>
    import msgTab from './msgTab'
    export default {
        name: "editor",
        data(){
            return{
                contents:null,
            }
        },
        components:{
            msgTab
        },
        methods:{
            backHome(){
                this.$store.commit('setTab')
            },
        }
    }
</script>

<style scoped lang="scss">
    .msgTab{
        width: 100%;
        height: 100%;
    }
</style>
