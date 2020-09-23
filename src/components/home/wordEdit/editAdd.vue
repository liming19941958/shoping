<template>
    <div class="editText">
        <el-button style="margin: 10px 0 ;" @click="backHome">返 回</el-button>
        <div style="width: 100%;margin-bottom: 50px;">
            <span style="text-align: center;height: 32px;width: 85px;font-size: 18px;float: left;display: inline-block;line-height: 32px;">主题：</span>
            <span style="width:  calc(100% - 85px);float: left;display: inline-block">
                <el-input ></el-input>
            </span>
        </div>
        <quill-editor v-model="contents" style="min-height: 80px;"></quill-editor>
    </div>
</template>

<script>
    export default {
        name: "editAdd",
        data(){
            return{
                contents:null,
            }
        },
        methods:{
            backHome(){
                this.$store.commit('setEdit')
            }

        }
    }
</script>

<style scope lang="scss">
    .editText{
        width: 100%;
        height: 100%;
        /*background-color: #fff5c1;*/
    }
</style>
