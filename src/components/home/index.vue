<template>
    <div class="homeMain">
        <div class="menu" style="height: 100%;background-color: rgb(51, 50, 53);">
            <div class="logo">
                <div class="logoimg"></div>
            </div>
            <el-scrollbar style="height: 89%;">
            <el-menu background-color="rgb(51, 50, 53)"
                     text-color="#9B9B9B"
                     active-text-color="#ffffff"
                     :collapse="isCollapse"
                     :default-active="active"
                     class="el-menu-vertical-demo"
                     @open="handleOpen" @close="handleClose"
                     style="min-width: 79px"
           >
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_sy.png" alt="">
                        </i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/tenant">
                    <el-menu-item index="1">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_rentergl.png" alt="">
                        </i>
                        <span slot="title">租户管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menus">
                    <el-menu-item index="2">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_fkgl.png" alt="">
                        </i>
                        <span slot="title">访客管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menus">
                    <el-menu-item index="3">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_fxt.png" alt="">
                        </i>
                        <span slot="title">放行条管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menus">
                    <el-menu-item index="4">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_sbbx.png" alt="">
                        </i>
                        <span slot="title">设备保修</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menus">
                    <el-menu-item index="5">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_jfgl.png" alt="">
                        </i>
                        <span slot="title">缴费管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menus">
                    <el-menu-item index="6">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_jfcx.png" alt="">
                        </i>
                        <span slot="title">缴费查询</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="2">
                    <template slot="title">
                        <i>
                            <img src="http://192.168.1.197:8090/Content/building/images/i_ico_sbwb.png" alt="">
                        </i>
                        <span slot="title">设备维保</span>
                    </template>
                        <router-link to="/CustomerInformationPage">
                            <el-menu-item index="2-1">巡检参数</el-menu-item>
                        </router-link>
                        <router-link to="/DataImportPage">
                            <el-menu-item index="2-2">保养参数</el-menu-item>
                        </router-link>
                        <router-link to="/StaffInformationPage">
                            <el-menu-item index="2-3-1">巡保模板</el-menu-item>
                        </router-link>
                        <router-link to="/StaffInformationPage">
                            <el-menu-item index="2-3-1">设备台账</el-menu-item>
                        </router-link>
                        <router-link to="/shift">
                            <el-menu-item index="2-3-2">巡保任务</el-menu-item>
                        </router-link>
                        <router-link to="/SchedulingInformationPage">
                            <el-menu-item index="2-3-3">图片管理</el-menu-item>
                        </router-link>
                    </el-submenu>
                        <router-link to="/menus">
                            <el-menu-item index="6">
                                <i>
                                    <img src="http://192.168.1.197:8090/Content/building/images/i_ico_xxfb.png" alt="">
                                </i>
                                <span slot="title">信息发布</span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="2-4">
                            <template slot="title">
                                <i>
                                    <img src="http://192.168.1.197:8090/Content/building/images/i_ico_sbgl.png" alt="">
                                </i>
                                <span slot="title">设备管理</span>
                            </template>
                            <router-link to="/UnitOfMeasurementPage">
                                <el-menu-item index="2-4-1">照明控制</el-menu-item>
                            </router-link>
                            <router-link to="/MaterialInformationPage">
                                <el-menu-item index="2-4-2">给排水控制</el-menu-item>
                            </router-link>
                            <router-link to="/MaterialBOMPage">
                                <el-menu-item index="2-4-3">电表电量计费</el-menu-item>
                            </router-link>
                            <router-link to="/PackingSpecificationPage">
                                <el-menu-item index="2-4-4">空调电量计费</el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="2-5">
                            <template slot="title">
                                <i>
                                    <img src="http://192.168.1.197:8090/Content/building/images/i_ico_xtgl.png" alt="">
                                </i>
                                <span slot="title">系统设置</span>
                            </template>
                            <router-link to="/SamplingStandardPage">
                                <el-menu-item index="2-5-1">流程管理</el-menu-item>
                            </router-link>
                            <router-link to="/TestItemsPage">
                                <el-menu-item index="2-5-2">用户管理</el-menu-item>
                            </router-link>
                            <router-link to="/InspectionPlanPage">
                                <el-menu-item index="2-5-3">部门管理</el-menu-item>
                            </router-link>
                            <router-link to="/UnpleasantSightPage">
                                <el-menu-item index="2-5-4">权限管理</el-menu-item>
                            </router-link>
                            <router-link to="/BadReasonsPage">
                                <el-menu-item index="2-5-5">位置拖放</el-menu-item>
                            </router-link>
                            <router-link to="/BadReasonsPage">
                                <el-menu-item index="2-5-5">服务器管理</el-menu-item>
                            </router-link>
                        </el-submenu>
            </el-menu>
            </el-scrollbar>
        </div>
        <div class="container">
            <div class="header">
                <div class="menubtn">
                    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleCollapsed"> </i>
                    <span>首页</span>
                </div>
                <ul class="btn">
                    <li>
                        <img src="../../images/user.png" alt="">
                        <span>{{username}}</span>
                    </li>
                    <li @click="dialogFormVisible = true">
                        <img src="../../images/password.png" alt="">
                        <span>修改密码</span>
                    </li>
                    <li @click="logout">
                        <img src="../../images/logout.png" alt="">
                        <span>退出</span>
                    </li>
                </ul>
                <el-dialog title="修改密码" :visible.sync="dialogFormVisible" top="5vh">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="新密码：" prop="newPassWord">
                            <el-input v-model="ruleForm.newPassWord" placeholder="请输入新密码" style="margin: 0 0 5px 0;"></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入：" prop="repeatPassword">
                            <el-input v-model="ruleForm.repeatPassword"  placeholder="请再次输入新密码" style="margin: 0 0 5px 0;"></el-input>
                            <p v-if="isShowMsg" style="color: #f56c6c;">两次输入的密码不一致！</p>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="resetForm('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #11C4A4;">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div class="content">
                <transition name="content">
                    <router-view></router-view>
                </transition>

            </div>
            <div class="footer">版权所有：惠州市物联微电子有限公司</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                dialogFormVisible:false,
                active:'',
                isCollapse:false,
                isShowMsg:false,
                username:'',
                ruleForm: {
                    newPassWord: '',
                    repeatPassword:''
                },
                rules: {
                    newPassWord: [
                        { required: true, message: '请输入新密码！', trigger: 'blur' },
                        { min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur' }
                    ],
                    repeatPassword: [
                        { required: true, message: '请再次输入密码！', trigger: 'blur' },
                        { min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created(){
            this.getDisPlayName();
        },
        mounted(){
            this.active = this.$route.name;

        },
        methods:{
            submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if (this.ruleForm.newPassWord === this.ruleForm.repeatPassword){
                                this.isShowMsg =false;
                                this.$http.get('Building/UserInfo/UpdatePW',{
                                    params:{
                                        password:this.ruleForm.newPassWord
                                    }
                                }).then(res=>{
                                    if (res.data.IsSuc){
                                        this.$message({
                                            type:"success",
                                            message:"修改成功，请重新登录！"
                                        });
                                        this.$router.push('/login')
                                    }
                                });
                                this.dialogFormVisible = false;
                            }else{
                                this.isShowMsg =true;
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });


            },
            toggleCollapsed(){
                this.isCollapse = !this.isCollapse;
            },
            resetForm(formName){
                this.isShowMsg =false;
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();

            },
            logout(){
                this.$router.push('/login')
            },
            getDisPlayName(){
                this.$http.get('Building/Business/getDisPlayName').then(res=>{
                    if (res.data.IsSuc){
                        this.username = res.data.Result;
                        // this.$store.commit('setUser',username)
                    }else {
                        // this.$store.commit('setUser','Admin');
                        this.username = 'Admin';
                    }
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    .content-enter{
        transform: translateX(-100%);
        opacity: 0;
        position: absolute;

    }
    .content-leave-to{
        transform: translateX(100%);
        opacity: 0;
        position: absolute;
    }
    .content-enter-active,
    .content-leave-active{
        transition: all 1s ease;
    }
    .homeMain {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        display: flex;

        .menu{
            z-index: 999;
            /*min-width: 79px;*/
            .logo{
                height: 110px;
                width: 100%;
                padding: 10px;
            }
            .logoimg{
                width: 100%;
                height: 100%;
                /*background-color: #6cff12;*/
                background: url("../../images/logo_03.jpg") no-repeat;
                background-size: 100%;
            }
            height: 100%;
            .el-menu-item{
                font-size: 18px;
                height: 67px;
                line-height: 67px;
            }
            .el-submenu__title:hover{
                background-color: rgb(17,196,164)!important;
                i{
                    color: #ffffff !important;
                    img{
                        right: -5.5px;
                    }

                }
            }
            .el-menu-item:hover {
                background-color: rgb(17,196,164)!important;
                color: #ffffff !important;

                i{
                    color: #ffffff !important;
                    img{
                        right: -5.5px;
                    }

                }
            }
            i{
                margin-right: -6px;
                margin-left: -6px;
                margin-bottom: 8px;
                width: 39px;
                height: 39px;
                overflow: hidden;
                display: inline-block;
                position: relative;
                img{
                    height: 115%;
                    position:absolute;
                    display: inline-block;
                }
            }
            span{
                margin-left: 15px;
                font-size: 18px;
            }
        }
        .container{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: rgb(240,240,240);
            .header{
                width: 100%;
                flex: 8;
                min-height: 53px;
                /*background-color: #e7ff34;*/
                border-bottom:1px solid #d1d1d1;
                .el-form-item {
                    margin-bottom: 16px;
                }
                .menubtn{
                    font-size: 25px;
                    color: #8e8c92;
                    float: left;
                    /*width: 50px;*/
                    height: 100%;
                    right: 0;
                    display: flex;
                    list-style: none;
                    text-align: center;
                    align-items: center;
                    cursor: auto;
                    box-shadow:none ;
                    span{
                        margin-left: 15px;
                        color: #7f7f7f;
                    }
                }
                .btn{
                    width: 25%;
                    min-width: 380px;
                    height: 100%;
                    float: right;
                    right: 0;
                    display: flex;
                    list-style: none;
                    text-align: center;
                    align-items: center;
                    cursor: auto;
                    box-shadow:none ;
                    li:nth-child(1):hover {
                        cursor: auto;
                        span{
                            cursor: text;
                        }

                    }
                    li:nth-child(2):hover{
                        cursor: pointer;
                        span{
                            color: rgb(81,202,167);
                        }
                    }
                    li:nth-child(3):hover{
                        cursor: pointer;
                        span{
                            color: rgb(81,202,167);
                        }
                    }
                    li{
                        flex: 1;
                        span{
                            margin-left: 5px;
                            color: #666666;
                        }
                    }
                }
            }
            .content{
                width: 100%;
                flex: 87;
                position: relative;
            }
            .footer{
                flex: 5;
                width: 100%;
                justify-content: center;
                align-items: center;
                display: -webkit-flex;
                border-top:1px solid #d1d1d1;
            }
        }
    }
</style>
