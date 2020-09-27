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
                    <el-button type="primary" @click="editTenant">修改</el-button>
                    <el-button type="primary" @click="deleteTenant" >删除</el-button>
                </div>
                <div style="height: 32px;width: 21.5%;min-width: 305px;float:left;position: relative;display: inline-block;">
                    <div style="height: 32px;color: #7e7e7e;float:left;line-height: 32px;position: relative;display: inline-block;">
                        搜索内容：
                    </div>
                    <el-input
                            size="medium" v-model="params.search" placeholder="请输入查询内容"
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
                            label="公司名称"
                    >
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Company }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Company }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户账号"
                    >
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Account }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium" v-html="scope.row.Account"></el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="邮箱">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Email }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Email }}</el-tag>
                                </div>
                           </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="楼栋">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.FromBuilding }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.FromBuilding }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="楼层">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Floor }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Floor }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="房号">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Room }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Room }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="租用面积">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.RenterArea }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.RenterArea }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="联系人">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.LinkMan }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.LinkMan }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="联系方式">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.Phone }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.Phone }}</el-tag>
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
                title="提示"
                :visible.sync="dialogVisible"
                width="40%!important">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="formLeft">
                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="ruleForm.companyName" placeholder="输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="accountNumber">
                        <el-select v-model="ruleForm.accountNumber" placeholder="请输入账号信息">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" placeholder="输入邮箱信息"></el-input>
                    </el-form-item>
                    <el-form-item label="楼栋">
                        <el-input v-model="ruleForm.FromBuilding" placeholder="输入楼栋信息"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-input v-model="ruleForm.floor" placeholder="输入楼层信息"></el-input>
                    </el-form-item>
                    <el-form-item label="水表表号">
                        <el-input v-model="ruleForm.waterMeterNumber" placeholder="输入水表表号信息"></el-input>
                    </el-form-item>
                </div>
                <div class="formRight">
                    <el-form-item label="房号">
                        <el-input v-model="ruleForm.roomNo" placeholder="输入房号信息"></el-input>
                    </el-form-item>
                    <el-form-item label="租用面积">
                        <el-input v-model="ruleForm.leaseArea" placeholder="输入租用面积信息"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="ruleForm.contactPerson" placeholder="输入联系人信息"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="ruleForm.contactDetails" placeholder="输入联系方式信息"></el-input>
                    </el-form-item>
                    <el-form-item label="电表表号">
                        <el-input v-model="ruleForm.electricMeterNumber" placeholder="输入电表表号信息"></el-input>
                    </el-form-item>
                    <el-form-item label="气表表号">
                        <el-input v-model="ruleForm.GasMeterNumber" placeholder="输入气表表号信息"></el-input>
                    </el-form-item>
                </div>
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
                dialogVisible: false,
                total: null,
                totalPage: null,
                ruleForm: {
                    companyName: '',
                    accountNumber: '',
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
                    companyName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
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
            editTenant(){
                if (this.multipleSelection.length === 1){
                    this.ruleForm.companyName= this.multipleSelection[0].Company;
                    this.ruleForm.accountNumber = this.multipleSelection[0].Account;
                    this.ruleForm.email = this.multipleSelection[0].Email;
                    this.ruleForm.FromBuilding = this.multipleSelection[0].FromBuilding;
                    this.ruleForm.floor = this.multipleSelection[0].Floor;
                    this.ruleForm.waterMeterNumber =this.multipleSelection[0].WaterMeter;
                    this.ruleForm.roomNo = this.multipleSelection[0].Room;
                    this.ruleForm.leaseArea = this.multipleSelection[0].RenterArea;
                    this.ruleForm.contactPerson =this.multipleSelection[0].LinkMan;
                    this.ruleForm.contactDetails =this.multipleSelection[0].Phone;
                    this.ruleForm.electricMeterNumber =this.multipleSelection[0].ElectricMeter;
                    this.ruleForm.GasMeterNumber =this.multipleSelection[0].GasMeter;
                    this.dialogVisible = true;
                }else if (this.multipleSelection.length === 0){
                    this.$message.warning('请选择一条要修改的信息！')
                }else if (this.multipleSelection.length > 1){
                    this.$message.warning('只能选择一条要修改的信息！')
                }

            },
            deleteTenant(){
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
                        this.$http.get('Building/RenterInfo/Delete',{
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
                this.$http.get('Building/RenterInfo/GetListByPage',
                    {
                        params:{
                            rows: this.params.size,
                            page: this.params.page,
                            company:this.params.search
                        }
                    }).then(result => {
                    if (result.status === 200) {
                        this.tableData = result.data.Result;
                        this.total = result.data.RsCount;
                        if (this.total < this.params.size) {
                            this.totalPage = 1
                        } else if (this.total % this.params.size === 0) {
                            this.totalPage = this.total / this.params.size
                        } else if (this.total % this.params.size > 0) {
                            this.totalPage = parseInt(this.total / this.params.size) + 1
                        }

                        if (this.tableData.length !== 0) {
                            this.loading = false;
                        }
                    }
                    if (this.userLog.length === 0) {
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
        .el-form-item {
            margin-bottom: 20px;
        }
        .formLeft{
            height: 100%;
            width: 50%;
            float: left;
            margin-bottom: 20px;
        }
        .formRight{
            height: 100%;
            width: 50%;
            float: left;
            margin-bottom: 20px;
        }
        .submitBtn{
            margin: 0 25px 0 25px;
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
