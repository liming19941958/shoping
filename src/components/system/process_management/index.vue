<template>
    <div class="log-query-page">
        <el-row style="width: 100%;height: 100%;margin-top: 17px;position: relative">
            <el-col style="
                    /*min-height:100px;*/
                    /*height: 5%;*/
                    width:100%;
                    position:relative;
                    padding: 1px 11px 20px 11px;
                    border-bottom: 1px solid #cacaca;
                    float: left">
                <div style="height: 32px;width: 25%;min-width: 305px;float:left;position: relative;display: inline-block;">
                    <el-button type="primary" @click="addTenant">新增</el-button>
                    <el-button type="primary" @click="deleteProcess" >删除</el-button>
                </div>
                <div style="height: 32px;width: 21.5%;min-width: 305px;float:left;position: relative;display: inline-block;">
                    <div style="height: 32px;color: #7e7e7e;float:left;line-height: 32px;position: relative;display: inline-block;">
                        搜索内容：
                    </div>
                    <el-input
                            size="medium" v-model="params.search" placeholder="请输入流程名称"
                            style="display: inline-block;width: 20%;min-width: 220px;margin-right: 15px;position: relative;height: 32px;padding: 0 0;float: left">
                    </el-input>
                </div>
                <el-button type="primary" @click="serach">查询</el-button>

            </el-col>
            <el-col style="height: 95%;width:100%;padding: 15px 15px 15px 15px; margin-top: 10px;">
                <el-table
                        :empty-text="dataText"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.08)"
                        :data="tableData"
                        style="height: 80%; overflow: scroll"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="行号"
                            type="index"
                            :index="indexMethod">
                    </el-table-column>
                    <el-table-column
                            label="流程名称"
                    >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper" v-if="scope.row.Remark.length===0">
                                <el-tag size="medium">{{ scope.row.Subject }}</el-tag>
                            </div>
                            <el-popover trigger="hover" placement="top" v-if="scope.row.Remark.length > 0">
                                <p>{{ scope.row.Subject }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Subject }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="流程描述"
                    >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper" v-if="scope.row.Remark.length===0">
                                <el-tag size="medium" v-html="scope.row.Remark"></el-tag>
                            </div>
                            <el-popover trigger="hover" placement="top" v-if="scope.row.Remark.length >0">
                                <p>{{ scope.row.Remark }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium" v-html="scope.row.Remark"></el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="流程节点">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.process }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.process }}</el-tag>
                                </div>
                            </el-popover>
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
        <el-dialog
                title="新增信息"
                :visible.sync="dialogVisible"
                width="35%!important"
                top="10vh">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="流程名称" prop="processName">
                        <el-input v-model="ruleForm.processName" placeholder="输入公司名称" style="width: 140%!important;"></el-input>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input type="textarea" v-model="ruleForm.description" placeholder="输入邮箱信息" style="width: 140%;"></el-input>
                    </el-form-item>
                    <p style="margin-bottom: 15px;font-weight: bold;">*流程节点设计</p>
                    <el-collapse v-model="activeNames" @change="handleChange" style="margin-left: 33px;">
                        <el-collapse-item title="物业保安部" name="1">
                            <span>顺序值：</span><el-input-number v-model="num1" controls-position="right" :min="1" :max="10" @change="handleChangeNum"></el-input-number>
                        </el-collapse-item>
                        <el-collapse-item title="物业工程部" name="2">
                            <span>顺序值：</span><el-input-number v-model="num2" controls-position="right" :min="1" :max="10" @change="handleChangeNum"></el-input-number>
                        </el-collapse-item>
                        <el-collapse-item title="物业维修部" name="3">
                            <span>顺序值：</span><el-input-number v-model="num3" controls-position="right" :min="1" :max="10" @change="handleChangeNum"></el-input-number>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button class="submitBtn" type="primary"  @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "UserManagement",
        data() {
            return {
                num1: 1,
                num2: 1,
                num3: 1,
                activeNames: ['1','2','3'],
                dialogVisible: false,
                total: null,
                totalPage: null,
                ruleForm: {
                    processName: '',
                    description: '',
                    email: '',
                    FromBuilding: '',
                    floor: '',
                    waterMeterNumber: '',
                    roomNo: '',
                    leaseArea: '',
                    contactPerson:'',
                    contactDetails:'',
                    electricMeterNumber:'',
                    GasMeterNumber:''
                },
                rules: {
                    processName: [
                        { required: true, message: '请输入流程名称', trigger: 'blur' },
                    ],
                    accountNumber: [
                        { required: true, message: '请选择账号', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ]
                },
                params: {
                    size: 10,
                    page: 1,
                    search: '',
                },
                dataText: '',
                userLog: [],
                loading: true,
                multipleSelection: [],
                ids:'',
                tableData: []
            };
        },
        created() {
            this.GetListByPage();
        },
        mounted() {

        },
        methods: {
            handleChangeNum(value) {
                console.log(value);
            },
            handleChange(val) {
                console.log(val);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            addTenant() {
                this.ruleForm.companyName= '';
                this.ruleForm.accountNumber = '';
                this.ruleForm.email = '';
                this.ruleForm.FromBuilding = '';
                this.ruleForm.floor = '';
                this.ruleForm.waterMeterNumber = '';
                this.ruleForm.roomNo = '';
                this.ruleForm.leaseArea = '';
                this.ruleForm.contactPerson ='';
                this.ruleForm.contactDetails ='';
                this.ruleForm.electricMeterNumber ='';
                this.ruleForm.GasMeterNumber ='';
                this.dialogVisible = true;
            },
            deleteProcess(){
                if (this.multipleSelection.length === 0){
                    this.$message({
                        type: 'warning',
                        message: '请至少选择一条信息!'
                    });
                } else{
                    this.multipleSelection.forEach(item=>{
                        this.ids += 'checkbox'+ item.Id + ','
                    })
                    this.$confirm('确定要删除选中的记录吗？', '提示信息', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get('Building/FlowInfo/Delete',{
                            params:{
                                ids:this.ids
                            }
                        }).then(res=>{
                            if (res.data.IsSuc){
                                this.GetListByPage();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '系统错误，请联系管理员！'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            },
            serach() {//在查询之前首先要把传给后台的page重新置0
                this.params.page = 1;
                this.GetListByPage();
            },
            GetListByPage() {
                this.dataText = ' ';
                this.$http.get('Building/FlowInfo/GetListByPage',
                    {
                        params:{
                            rows: this.params.size,
                            page: this.params.page,
                            company:this.params.search
                        }
                    }).then(result => {
                    if (result.status === 200) {
                        let tableData = result.data.Result;
                        tableData.forEach(item=>{
                            let processNode = '';
                            for (var i=0;i <item.Users.length;i++){
                                for (var j=0;j < item.Orgs.length;j++){
                                    if (i === j ){
                                        processNode += '-＞' + item.Users[i].DisPlayName + '['+ item.Orgs[j].Name + ']'
                                    }
                                }
                            }
                            item['process'] = processNode;
                        });
                        this.tableData = tableData;
                        this.total = result.data.RsCount;
                        if (this.total < this.params.size) {
                            this.totalPage = 1
                        } else if (this.total % this.params.size === 0) {
                            this.totalPage = this.total / this.params.size
                        } else if (this.total % this.params.size > 0) {
                            this.totalPage = parseInt(this.total / this.param.size) + 1
                        }

                        if (this.tableData.length !== 0) {
                            this.loading = false;
                        }
                    }
                    if (this.tableData.length === 0) {
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
                this.params.size = `${val}`;
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

    .log-query-page {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        ::v-deep .el-collapse-item__content {
            padding: 15px 0 15px 0!important;
            font-size: 13px;
            color: #303133;
            line-height: 1.769230769230769;
            .el-input__inner {
                height: 38px;
                outline: none;
            }
        }
        ::v-deep .el-form-item {
            margin-bottom: 20px;
            .el-input__inner {
                height: 38px;
                outline: none;
            }
             .el-form-item__label {
                font-weight: bold!important;
            }
        }
        .submitBtn{
            margin: 0 13px 0 25px;
            float: right!important;
        }

        .el-button--primary {
            color: #FFF;
            background-color: #51caa7;
            border-color: #51caa7;
            display: inline-block;
            float: left;
            width: 20% !important;
            max-width: 70px !important;
            min-width: 35px !important;
            height: 32px !important;
            position: relative;
            padding: 0 0;

            &:hover {
                background-color: #3ea28a;
            }
        }
    }


</style>

