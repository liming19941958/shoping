<template>
    <div class="log-query-page">
        <el-row style="width: 100%;height: 100%;position: relative">
            <el-col style="
                    /*min-height:100px;*/
                    /*height: 5%;*/
                    width:100%;
                    position:relative;
                    padding: 1px 11px 20px 11px;
                    border-bottom: 1px solid #cacaca;
                    float: left">
<!--                <div style="height: 32px;width: 6%;color: #7e7e7e;min-width: 98px;float:left;align-items:center; display: flex;">选择时间区间：</div>-->
<!--                <DatePicker type="datetimerange" placeholder="请选择日期" style="width: 20%;min-width: 315px;float: left;margin-right: 40%;"></DatePicker>-->
                <div class="block" style="height: 32px;min-width: 350px;float: left;align-items:center; display: flex;">
                    <span class="demonstration" style="color: #7e7e7e;">开始时间：</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="block" style="height: 32px;min-width: 350px;float: left;align-items:center;display: flex;">
                    <span class="demonstration" style="color: #7e7e7e;">结束时间：</span>
                    <el-date-picker
                            v-model="value2"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div style="height: 32px;width: 18%;min-width: 305px;float:left;position: relative;display: inline-block;">
                    <div style="height: 32px;color: #7e7e7e;float:left;line-height: 32px;position: relative;display: inline-block;">搜索内容：</div>
                    <el-input
                            size="medium" v-model="params.search" placeholder="请输入查询内容"
                            style="display: inline-block;width: 20%;min-width: 220px;margin-right: 15px;position: relative;height: 32px;padding: 0 0;float: left">
                    </el-input>
                </div>
                <el-button type="primary" style="display: inline-block;float: left;width: 5%;min-width: 35px;height: 32px;position: relative;padding: 0 0;" @click="serach">查询</el-button>
                <el-button type="primary" style="display: inline-block;float: left;width: 5%;min-width: 35px;height: 32px;position: relative;padding: 0 0;" @click="editAdd">新增</el-button>
            </el-col>
            <el-col style="height: 95%;width:100%;padding: 15px 15px 15px 15px; margin-top: 10px;">
                <el-table
                        :empty-text="dataText"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.08)"
                        :data="userLog"
                        style="height: 75%; overflow: scroll">
                    <el-table-column
                            label="行号"
                            type="index"
                            :index="indexMethod">
                    </el-table-column>
                    <el-table-column
                            label="主题"
                            >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name}}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.Subject }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="内容"
                           >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium" v-html="scope.row.Body" ></el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="时间"
                            >
                        <template slot-scope="scope">
<!--                                                        <el-popover trigger="hover" placement="top">-->
<!--                                                            <p>姓名: {{ scope.row.name }}</p>-->
<!--                                                            <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.createDate }}</el-tag>
                            </div>
<!--                                                        </el-popover>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block"
                     style="position:relative;
                     height: 25%;
                            margin-top: 20px;float: right">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="params.page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="params.size"
                            layout="total,slot,sizes, prev, pager, next, jumper"
                            :total="total">
                        <span>共{{totalPage}}页</span>
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserManagement",
        data() {
            return {
                value1: '',
                value2: '',
                startTime:'',
                endTime:'',
                total:null,
                totalPage:null,
                params:{
                  size:10,
                  page:1,
                  search:'',
                },
                dataText:'',
                userLog:[],
                loading:true,
                tableData: []
            };
        },
        created(){
            this.getList();
        },
        mounted(){

        },
        methods: {
            editAdd(){
                this.$store.commit('setEditAdd')
            },
            serach(){//在查询之前首先要把传给后台的page重新置0
                this.params.page='1';
                console.log('查询-当前页'+this.params.page);
                this.getList();
            },
            getList(){
                this.dataText = ' ';
                // let r_path = '/userlog';
                // sessionStorage.setItem('Path',r_path );
                this.params.startTime = this.changeDateTime(this.value1);
                this.params.endTime = this.changeDateTime(this.value2);
                if(this.params.startTime === this.params.endTime){
                    this.params.startTime=this.params.endTime=null;
                }
                this.$http.post('platform/notice/list',
                    {
                        rows:this.params.size,
                        page:this.params.page,
                        begin:this.params.startTime,
                        end:this.params.endTime,
                        key:this.params.search

                    }).then(result=>{
                    if (result.status === 200) {
                        let userLogData = result.data.Result;
                        this.userLog = userLogData;
                        this.total = result.data.RsCount;
                        if (this.total < this.params.size){
                            this.totalPage = 1
                        }else if (this.total % this.params.size === 0){
                            this.totalPage = this.total / this.params.size
                        }else if (this.total % this.params.size > 0){
                            this.totalPage = parseInt(this.total / this.params.size) +1
                        }

                        if(this.userLog.length !==0){
                            this.loading = false;
                        }
                    }
                    if(this.userLog.length === 0){
                        this.dataText = "暂无数据";
                    }
                })
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                this.params.size= `${val}`;
                this.getList();
                console.log(this.params.size);
            },
            handleCurrentChange(val) {
                this.params.page = `${val}`;
                this.getList();
                console.log(`当前页: ${val}`);
            },
            indexMethod(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },
        }
    }
</script>

<style scoped lang="scss">
    .log-query-page{
        overflow: scroll;
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;

    }
</style>
