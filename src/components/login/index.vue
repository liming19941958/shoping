<template>
    <div class="login-page">
<!--        <transition>-->
            <div class="f-login-container">
                <div class="f-logo">
                    <h1>智能楼宇系统</h1>
                </div>
                <div class="ant-form ant-form-horizontal f-login-form">
                    <form>
                        <div class="f-logo-input">
                            <div class="login-account-number">
                                <i class="el-icon-user"></i>
                                <input type="text" v-model="loginForm.loginName" class="login-input" placeholder="登录名/手机/邮箱" v-focus>
                            </div>
                            <div class="login-account-password">
                                <i class="el-icon-lock"></i>
                                <input type="text" v-model="loginForm.password" class="login-password" placeholder="请输入密码"  @keyup.enter="login()">
                                <el-row class="login-btn-row" >
                                    <el-button type="primary"  round class="login-btn" @click="login()">登录</el-button>
                                </el-row>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="f-bottom-mes">
                    <p class="f-version">物联微电子有限公司</p>
                    <p class="f-version">Version：{{version}}</p>
                </div>
            </div>
<!--        </transition>-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="25%"
        top="1vh">
            <span slot="title">
                <i class="el-icon-warning-outline" style="color:#ffb72c;font-size: 20px;margin-right: 10px;"></i>
                <span style="font-size: 20px">提 示</span>
            </span>
            <span style="margin-left: 55px;">{{errorMsg}}</span>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        data(){
            return {
                visible: false,
                dialogVisible:false,
                errorMsg:'',
                version:'',
                loginForm:{
                    loginName:'admin',
                    password:'123456'
                }

            }
        },
        created(){
            this.getVersion()
        },
        methods:{
            getVersion(){
                this.$http.get('platform/users/version').then(res=>{
                    this.version = res.data;
                })
            },
            login(){
                if (this.loginForm.loginName !='' && this.loginForm.password !=''){
                    this.$http.get('platform/users/login',{
                        params:{
                            loginName:this.loginForm.loginName,
                            password:this.loginForm.password,
                        }
                    }).then(res=>{
                        if (res.data.IsSuc) {
                            this.$message.success('登录成功');
                            this.$router.push('/home')
                        }else{
                            this.errorMsg = '登录名或密码不正确，请重新输入！';
                            this.dialogVisible = true;
                        }
                    })
                } else{
                    this.errorMsg = '登录名或密码不能为空！';
                    this.dialogVisible = true;
                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .v-enter{
        transform: translateX(100%);
        opacity: 0;
        /*position: absolute;*/
    }
    .v-leave-to{
        transform: translateX(-100%);
        opacity: 0;
        position: absolute;
    }
    .v-leave-active,
    .v-enter-active{
        transition: all 1s ease;
    }
    .login-page {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url("../../images/free-backgrounds.jpg") no-repeat 100%;
        .f-bottom-mes{
            margin-top: 200px;
        }
        .f-login-container{
            width: 800px;
            height: 350px;
            margin: 250px auto;
            color: #ffffff;
            text-align: center;

            h1{
                font-size: 70px;
            }
            .f-login-form{
                padding:32px;
                margin: 90px auto;
                width: 675px;
                height: 100px;
                color: rgba(0, 0, 0, 0.60);
                background-color:rgba(255, 255, 255, 0.4);
                .f-logo-input{
                    position: relative;
                    padding:0 5px;
                    margin: auto;
                    width: 610px;
                    height: 36px;
                    .login-account-number{float: left;
                        width: 230px;
                        height: 100%;
                        border:1px solid #dad9d9;
                        border-radius: 10px;
                        background-color: #fff;
                        i{
                            color: rgba(2, 2, 2,0.8);
                        }
                        .login-input{
                            margin-left: 3px;
                            width: 200px;
                            height: 100%;
                            outline:none;
                            border:none;
                        }
                    }
                    .login-account-password{
                        margin-left: 20px;
                        float: left;
                        width: 230px;
                        height: 100%;
                        border:1px solid #dad9d9;
                        border-radius: 10px;
                        background-color: #fff;
                        i{
                            color: rgba(2, 2, 2,0.8);
                        }
                        .login-password{
                            margin-left: 3px;
                            width: 200px;
                            height: 100%;
                            outline:none;
                            border:none;
                        }
                    }
                    .login-btn-row{
                        position: absolute;
                        top:0;
                        right:5px;
                        width: 100px;
                    }
                    .login-btn{
                        width: 100px;
                        height: 100%;
                    }
                }
            }
        }
    }

</style>
