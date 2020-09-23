<template>
   <div class="message">
       <el-button style="margin: 10px 0 ;" @click="backHome">返 回</el-button>
       <div class="titleBar">{{$store.state.item.Subject}}</div>
       <div class="mainWord" v-html="$store.state.item.Body"></div>
       <div class="files">
           <span>附件：</span>
           <span v-if="$store.state.item.Attachments.length == 0 " style="color: rgba(0,0,0,0.47);">无附件</span>
           <span v-if="$store.state.item.Attachments.length > 0 " style="color: #007aff;cursor: pointer" title="下载附件" @click="downloadFile">{{$store.state.item.Attachments[0].FileName}}</span>
       </div>
   </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{

            }
        },
        methods:{
            backHome(){
                this.$store.commit('setTab')
            },
            downloadFile(){

                this.$http.get('/platform/file/download',{
                    params:{
                        id:this.$store.state.item.Attachments[0].Id,
                    }
                }).then(res=>{
                    if (res.status === 200) {
                        window.open('http://192.168.1.127:9003/platform/file/download'+'?id='+ this.$store.state.item.Attachments[0].Id, 'newWindow', 'height=200, width=600, top=350, left=300, ' +
                            'toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
                    }else {
                        this.$message.error('系统错误，请联系管理员！')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .message{
        width: 100%;
        height: 100%;
        /*overflow-y: scroll;*/
        .titleBar{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(127, 127, 127, 0.3);
            /*background-color: #c5ffc0;*/
        }
        .mainWord {
            overflow-y: scroll;
            width: 100%;
            min-height: 350px;
            max-height: 500px;
            margin-bottom:30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(127, 127, 127, 0.3);
            /*background-color: #ffad18;*/
        }
        .files{
            width: 100%;
            min-height: 50px;
            /*background-color: #2dd5ff;*/
            span{
                color: #69696b;
            }
        }
    }
</style>
