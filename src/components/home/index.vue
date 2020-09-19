<template>
    <div class="homeMain">
        <div class="menu">
        </div>
        <div class="container">
            <div class="header">
                <div class="menubtn">
                    <i :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleCollapsed"> </i>
                    <span>首 页</span>
                </div>
                <ul class="btn">
                    <li>
                        <img src="../../images/user.png" alt="">
                        <span>{{username}}</span>
                    </li>
                    <li @click="openForm">
                        <img src="../../images/password.png" alt="">
                        <span>修改密码</span>
                    </li>
                    <li @click="logout">
                        <img src="../../images/logout.png" alt="">
                        <span>退出</span>
                    </li>
                </ul>
            </div>
            <div class="content">
                <router-view></router-view>
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
                collapsed:true
            }
        },
        methods:{
            logout(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .homeMain {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        display: flex;
        .menu{
            flex: 1.2;
            min-width: 180px;
            height: 100%;
            background-color: #daff60;
        }
        .container{
            flex: 8.8;
            height: 100%;
            display: flex;
            flex-direction: column;
            .header{
                width: 100%;
                flex: 8;
                min-height: 53px;
                /*background-color: #e7ff34;*/
                border-bottom:1px solid #d1d1d1;
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
