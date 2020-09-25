<template>
    <div class="editText">
        <div style="width: 100%;margin-bottom: 50px;">
            <span style="text-align: center;height: 32px;width: 85px;font-size: 18px;float: left;display: inline-block;line-height: 32px;">主题：</span>
            <span style="width:  calc(100% - 85px);float: left;display: inline-block">
                <el-input v-model="theme" placeholder="请输入主题"></el-input>
            </span>
        </div>
        <div>
            <h4 style="margin-left: 15px;">附件：</h4>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="platform/file/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    :auto-upload="false"
                    name="myfile"
            style="margin-left: 85px;margin-bottom: 30px;">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
<!--            <upload></upload>-->
        </div>
        <div style="overflow-y: scroll;max-height: 500px;">
            <quill-editor v-model="contents" style="min-height: 80px;"></quill-editor>
        </div>

        <div class="footer">
            <div class="footer-content">
                <el-button class="subBtn1" style="margin: 10px 0 ;" @click="backHome">取 消</el-button>
                <el-button class="subBtn2" style="margin: 10px 25px 0 ;" @click="subText">发 布</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    // import upload from './upload'
    export default {
        name: "editAdd",
        data(){
            return{
                fileList:[],
                contents:null,
                ids:[],
                files:'',
                theme:'',
            }
        },
        components:{
            // upload
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response){
                this.files += response.Result.Id + ';';
console.log(this.files)
                // this.ids.push(response.Result.Id)

            },
            // upload(){
            //     let a = this.$refs.file.value;
            //     this.$http.post('platform/file/upload',a).then(res=>{
            //         console.log(res)
            //     })
            // },
            subText(){
                this.files = this.files.substring(0,this.files.length - 1);
                console.log(this.files)
                // let files = this.files;
                if (this.theme.length > 0 ){
                    this.$http.post('platform/notice/add',{
                        body:this.contents,
                        files:this.files,
                        subject:this.theme
                    }).then(res=>{
                        if (res.data.IsSuc){
                            this.$message.success('添加成功！')
                            this.$store.commit('setEdit')
                        }
                    }).catch((err=>{
                        this.$message.error(err);
                    }))
                }else {
                    this.$message.warning('主题不能为空！')
                }

            },
            backHome(){
                this.$store.commit('setEdit')
            }

        }
    }
</script>

<style scope lang="scss">
    .editText{
        width: 100%;
        max-height: 500px;
        padding-top: 25px;
        /*overflow-y: scroll;*/
        /*background-color: #fff5c1;*/
        .el-upload__input {
            /*opacity: 0;*/
            display: none!important;
        }
        .submitBtn{
            opacity: 0;
            position: absolute;
            left: -0.2px;
            z-index: 9;
        }
        .footer{
            width: 100%;
            height: 80px;
            justify-content: center;
            align-items: center;
            display: -webkit-flex;
            /*background-color: #7f7f7f;*/
        .footer-content{
            padding-top: 15px;
            width: 200px;
            height: 100%;
            /*background-color: #77ffe4;*/
            .subBtn2{
                background-color: rgb(16,196,167);
                color: #ffffff;
            }
            .subBtn2:hover{
                background-color: #4d9983;
            }
        }
    }
}
</style>
