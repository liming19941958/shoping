<template>
    <div class="home">
        <div class="firstLine">
            <span>
                待办流程（访客管理：
                <span style="margin-right: 20px;">
                    <span style="color: red">{{VisitCount}}</span> 条
                </span>
                放行条管理：
                <span style="margin-right: 20px;">
                    <span style="color: red">{{PassCount}}</span> 条
                </span>
                设备报修：
                <span style="color: red">{{DeviceRepairCount}}</span> 条）
            </span>
        </div>
        <div class="mainContent">
            <div class="child"  ref="VisitorTrendGraph"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
        </div>

    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    //5、引入柱状图图组件
    require('echarts/lib/chart/bar');
    //5、引入marker组件 (标注 、title)
    // 1.1引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/markLine')
    require('echarts/lib/component/markArea')
    require('echarts/lib/component/markPoint')
    require('echarts/lib/component/toolbox')
    export default {
        name: "home",
        data(){
           return{
               VisitCount:'',
               PassCount:'',
               DeviceRepairCount:'',
               DeviceRepairRadial:'',
           }
        },
        created(){
            this.getVisitCount();
            this.getPassCount();
            this.getDeviceRepairCount();
            this.getDeviceRepairRadial();
        },
        mounted(){
            this.drawLine();
        },
        methods:{
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let VisitorTrendGraph = echarts.init(this.$refs.VisitorTrendGraph);
                // 绘制设备运行状态图表
                VisitorTrendGraph.setOption({
                    title: {
                        top:20,
                        left:20,
                        text: '某地区蒸发量和降水量',
                        subtext: '纯属虚构'
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                });
            },
            getVisitCount(){
               this.$http.get('Building/Business/getVisitCount').then(res=>{
                   if (res.data.IsSuc){
                       this.VisitCount = res.data.Result;
                   }
               })
           },
            getPassCount(){
                this.$http.get('Building/Business/getPassCount').then(res=>{
                    if (res.data.IsSuc){
                        this.PassCount = res.data.Result;
                    }
                })
            },
            getDeviceRepairCount(){
                this.$http.get('Building/Business/getDeviceRepairCount').then(res=>{
                    if (res.data.IsSuc){
                        this.DeviceRepairCount = res.data.Result;
                    }
                })
            },
            getDeviceRepairRadial(){
                this.$http.get('Building/Business/getDeviceRepairRadial').then(res=>{
                    if (res.data.IsSuc){
                        this.DeviceRepairRadial = res.data.Result;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @media screen and (max-width:1300px) {
        .child {
            width: 100%!important;
        }
    }
    .home{
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding: 0 15px 15px 15px;
        display: flex;
        flex-direction: column;
        .firstLine{
            flex: 0.5;
            height: 45px;
            line-height: 45px;
            color: #69696B;
            font-size: 16px;
        }
        .mainContent{
            flex:99.5;
            height: 100%;
            background-color: #a5d5ff;

            div{
                width: 50%;
                height: 50%;
                float: left;
                position: relative;
            }
            div:nth-child(1){
                /*background-color: #2cff54;*/
            }
            div:nth-child(2){
                background-color: #fffc26;
            }
            div:nth-child(3){
                background-color: #1da4ff;
            }
            div:nth-child(4){
                background-color: #fa40ff;
            }
        }
    }
</style>
