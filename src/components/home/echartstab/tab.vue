<template>
    <div class="box1">
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
            <div class="child num2">
                <p>本月设备保修情况</p>
                <div class="secondChild">
                    <dl>
                        <dd>
                            <h1>报修量</h1>
                            <span>{{DeviceRepairTotal}}</span>
                        </dd>
                        <dd>
                            <h1>已完成</h1>
                            <span>{{DeviceRepairIsTrue}}</span>
                        </dd>
                        <dd>
                            <h1>处理中</h1>
                            <span>{{DeviceRepairCount}}</span>
                        </dd>
                        <dd >
                            <rate></rate>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="child" ref="EnergyConsumption"></div>
            <div class="child">
                <div>
                    <span>公告栏</span>
                    <span @click="editMsg">更多</span>
                </div>
                <div  class="list" >
                    <ul>
                        <li v-for="(item,index) in listData" :key="index" @click="handleClickOpen(item)">{{item.Subject}}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import rate from '../Completion_rate/index'
    // 1、引入基本模板
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    //2、引入柱状图图组件
    require('echarts/lib/chart/bar');
    //3、引入折线图组件
    require('echarts/lib/chart/line')
    //4、引入marker组件 (标注 、title)
    // 1.1引入提示框和title组件


    require('echarts/lib/component/markLine')
    require('echarts/lib/component/markArea')
    require('echarts/lib/component/markPoint')
    // require('echarts/lib/component/toolbox')
    export default {
        name: "home",
        data(){
            return{
                contents:'888',
                isShow:true,
                isWord:false,
                visitTotal:null,
                seriesData:[],
                xAxisData:[],
                listData:[],
                like:'0',
                VisitCount:'',
                PassCount:'',
                DeviceRepairCount:'',
                DeviceRepairTotal:'',
                DeviceRepairIsTrue:'',
            }
        },
        components:{
            rate,
        },
        created(){
            this.getVisitCount();
            this.getPassCount();
            this.getVisitList();
            this.getDeviceRepairCount();
            this.getDeviceRepairTotal();
            this.getDeviceRepairIsTrue();
            this.list();
        },
        mounted(){

            this.energy();
        },
        methods:{
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let VisitorTrendGraph = echarts.init(this.$refs.VisitorTrendGraph);
                // 绘制设备运行状态图表
                VisitorTrendGraph.setOption({
                    title: {
                        left:20,
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            fontSize: 18,
                            color: '#69696B',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                        },
                        text: '本周访客趋势图(总人数：'+ this.visitTotal + ' 人）',
                    },
                    color: ['#51CAA7'],
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
                            data: this.xAxisData,
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
                            name: '访问人数',
                            type: 'bar',
                            barWidth: '40%',
                            data:this.seriesData,
                        }
                    ]
                });

                window.addEventListener("resize",function(){//设置图表随div大小变化而变化
                    VisitorTrendGraph.resize();
                    // EnergyConsumption.resize();
                });
            },
            energy(){
                let EnergyConsumption = echarts.init(this.$refs.EnergyConsumption);
                EnergyConsumption.setOption({
                    title: {
                        left:20,
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            fontSize: 18,
                            color: '#69696B',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                        },
                        text: '本月能源资源消耗趋势图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['耗电量', '耗水量']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
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
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '耗电量',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                color:'#0f77ef',
                                opacity:0.5
                            },
                            lineStyle: {
                                color: '#0088e6',
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '耗水量',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                color:'#1ae3df',
                                opacity:0.5
                            },
                            lineStyle: {
                                color: '#45e1cd',
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },

                    ]
                });
                window.addEventListener("resize",function(){//设置图表随div大小变化而变化
                    EnergyConsumption.resize();
                });
            },
            getVisitList(){
                this.$http.get('Building/Business/getVisitList').then(res=>{
                    if (res.data.IsSuc){
                        this.visitTotal = res.data.Result.Total;
                        res.data.Result.Children.forEach(item=>{
                            this.seriesData.push(item.OUTPUTQTY);
                            this.xAxisData.push(item.DATEID)
                        });

                        this.drawLine();
                        console.log(this.visitTotal)
                    }
                }).catch((err=>{
                    this.$message.error(err)
                }))
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
            getDeviceRepairTotal(){
                this.$http.get('Building/Business/getDeviceRepairTotal').then(res=>{
                    if (res.data.IsSuc){
                        this.DeviceRepairTotal = res.data.Result
                    }
                })
            },
            getDeviceRepairIsTrue(){
                this.$http.get('Building/Business/getDeviceRepairIsTrue').then(res=>{
                    if (res.data.IsSuc){
                        this.DeviceRepairIsTrue = res.data.Result
                    }
                })
            },
            list(){
                this.$http.post('platform/notice/list',{
                    page:1,
                    rows:50
                }).then(res=>{
                    if (res.data.IsSuc){
                        this.listData = res.data.Result
                    }
                })
            },
            handleClickOpen(item){
                console.log(item)
                this.$store.commit('setNews',item)
            },
            editMsg(){
                this.$store.commit('setEdit')
            }

        }
    }
</script>

<style scoped lang="scss">
    @media screen and (max-width:1200px) {
        .child {
            width: 100%!important;
            height: 45% !important;
            /*max-height:400px;*/
        }
        .mainContent{
            /*min-height: 250px!important;*/
            height: 10px!important;
        }

    }
.box1{
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    /*padding: 0 15px 15px 15px;*/
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
            /*background-color: #a5d5ff;*/
            div{
                width: 50%;
                height: 50%;
                float: left;
                position: relative;
                p{
                    color:#69696B;
                    font-size: 18px;
                }
                .secondChild{
                    width: 100%;
                    height: 100%;
                    padding-bottom: 60px;
                    /*background-color: #ff9546;*/
                    dl {
                        width: 100%;
                        height: 100%;
                        margin-top: 0;
                        margin-bottom: 2px;
                        dd{
                            float: left;
                            width: 23%;
                            height: 95%;
                            text-align: center;
                            border: 2px solid #51CAA7;
                            /*border-right: none;*/
                            position: relative;
                            span{
                                display: block;
                                width: 100%;
                                height: 100%;
                                text-align: center;
                                font-size: 50px;
                                font-family: Arial;
                                color: #51CAA7;
                                position: absolute;
                                top: 50%;
                            }
                        }
                        dd:nth-child(4){
                            width: 31%;
                            position: relative;
                            /*background-color: #b5ff70;*/
                            border-top: none;
                            border-right: none;
                            border-bottom: none;
                        }
                        h1{
                            color: white;
                            background: #51CAA7;
                            text-align: center;
                            height: 50px;
                            line-height: 50px;
                            font-size: 16px;
                            position: absolute;
                            width: 100%;
                            margin-top: 0;
                        }
                    }

                }
            }
            div:nth-child(4){
                overflow-y: scroll;
                div{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                }
                .list{
                    width: 100%;
                    ul{
                        padding-right: 18px;
                        margin-top: 20px;
                        margin-left: -20px;
                        list-style: none;
                        li{
                            color:#999999;
                            height: 50px;
                            line-height: 50px;
                            border-top: 1px solid #51CAA7;
                        }
                        li:hover{
                            color:#51CAA7;
                            cursor: pointer;
                        }
                        li:last-child{
                            border-bottom: 1px solid #51CAA7;
                        }
                    }
                }
                span:nth-child(1){
                    color:#69696B;
                    float: left;
                    font-size: 18px;
                }
                span:nth-child(2){
                    color:#69696B;
                    float: right;
                    font-size: 18px;
                    cursor: pointer;
                }
                span:nth-child(2):hover{
                    color:#51CAA7;
                }
                /*background-color: #1cff52;*/
            }
        }
}
</style>
