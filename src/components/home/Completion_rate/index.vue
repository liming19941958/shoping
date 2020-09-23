<template>
    <div style="width: 100%;height: 100%;align-items: center;display: -webkit-flex;justify-content: center">
        <div class="con">
            <div class="percent-circle percent-circle-left">
                <div class="left-content" ref="leftContent"></div>
            </div>
            <div class="percent-circle percent-circle-right">
                <div class="right-content" ref="rightContent"></div>
            </div>
            <div class="text-circle" ref="textCircle">
                <div class="title1">完成率</div>
                <div>{{rate}}%</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                rate:'0'
            }
        },
        created() {
            this.getRates();
        },
        mounted(){

        },
        methods: {
            getRates(){
                this.$http.get('Building/Business/getDeviceRepairRadial').then(res=>{
                    if (res.data.IsSuc){
                        // let a =  res.data.Result;
                        this.rate = res.data.Result;
                        this.getRate();
                    }

                }).catch((err=>{
                    if (err){
                        this.$message.error('登录信息已失效，请重新登录！');
                        this.$router.push('/login')
                    }
                }))
            },
            getRate() {

                console.log('oko')
                var leftContent = this.$refs.leftContent;
                var rightContent = this.$refs.rightContent;
                // 先是leftContent旋转角度从0增加到180度，
                // 然后是rightContent旋转角度从0增加到180度
                    var angle = 0;
                    angle = this.rate * 360 / 100;
                    function setPercent(angle){
                        if (angle > 180) {
                            leftContent.setAttribute('style', 'transform: rotate(' + 180 + 'deg)');//左边要加上180度
                            rightContent.setAttribute('style', 'transform: rotate(' + (angle-180) + 'deg)');//右边加上剩余的度数
                        } else {
                            leftContent.setAttribute('style', 'transform: rotate(' + angle + 'deg)');
                        }
                    }
                    setPercent(angle);

            }
        }
    }
</script>

<style scoped lang="scss">
    .con {
        position: relative;
        display: inline-block;
        height: 200px;
        width: 200px;
    }

    .percent-circle {
        position: absolute;
        height: 100%;
        background: #51CAA7;
        align-items: center;
        overflow: hidden;
    }

    .percent-circle-right {
        right: 0;
        width: 100px;
        border-radius: 0 100px 100px 0/0 100px 100px 0;
    }

    .percent-circle-right .right-content {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        transform-origin: left center;
        transform: rotate(0deg);
        border-radius: 0 100px 100px 0/0 100px 100px 0;
        background: #bbb;
    }

    .percent-circle-left {
        width: 100px;
        border-radius: 100px 0 0 100px/100px 0 0 100px;
    }

    .percent-circle-left .left-content {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        transform-origin: right center;
        transform: rotate(0deg);
        border-radius: 100px 0 0 100px/100px 0 0 100px;
        background: #bbb;
    }
    .title1 {
        margin-top: 40px;
        font-size: 20px;
        color: #69696b;
        font-weight: normal;
    }
    .text-circle {
        position: absolute;
        /*display: flex;*/
        align-items: center;
        justify-content: center;
        height: 92%;
        width: 92%;
        top: 8px;
        left: 8px;
        font-size: 50px;
        font-weight: bold;
        border-radius: 100%;
        background: #ffffff;
        color: #51CAA7;
    }
</style>
