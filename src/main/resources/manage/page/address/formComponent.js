Vue.component('address-form', {
template:`
<template>
    <div>
        <el-dialog
                :visible.sync="formVisible"
                :title="formTitle"
                v-if="formVisible"
                custom-class="formModel"
                width="60%" >
            <el-form class="formModel_form" ref="formRef" :model="form" :rules="rules" >
                <el-form-item  label="地址" prop="address" class="input-item">
                    <el-input v-model="form.address"
                       placeholder="地址"
                       type="text"
                       :readonly="!isAdd||disabledForm.address?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="收货人" prop="name" class="input-item">
                    <el-input v-model="form.name"
                       placeholder="收货人"
                       type="text"
                       :readonly="!isAdd||disabledForm.name?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="电话" prop="phone" class="input-item">
                    <el-input v-model="form.phone"
                       placeholder="电话"
                       type="text"
                       :readonly="!isAdd||disabledForm.phone?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="是否默认地址" prop="isdefault" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.isdefault?true:false"
                        v-model="form.isdefault"
                        placeholder="请选择是否默认地址"
                    >
                        <el-option v-for="(item,index) in isdefaultLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="formModel-btns" v-if="isAdd||type=='logistics'||type=='reply'">
                <el-button class="formModel_cancel" @click="closeClick">取消</el-button>
                <el-button class="formModel_confirm" type="primary" @click="save"
                    >
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
`,
data() {
    return {
        formVisible:false,
        formTitle:'',
        id:0,
        form:{},
        type:'',
        formName:'地址',
        rules:{
            address: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            name: [
            ],
            phone: [
            ],
            isdefault: [
            ],
            userid: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
        },
        isAdd:false,
        disabledForm:{
            address : false,
            name : false,
            phone : false,
            isdefault : false,
            userid : false,
        },
        //是否默认地址列表
        isdefaultLists:[],
        crossRow:'',
        crossTips:'',
        crossColumnName:'',
        crossColumnValue:'',
        userInfo:{},
        sessionTable:localStorage.getItem('admin_sessionTable'),
    }
},
watch:{
},
methods: {
    init(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null){
        this.resetForm()
        if(formId){
            this.id = formId
            this.type = formType
        }
        if(formType == 'add'){
            this.isAdd = true
            this.formTitle = '新增' + this.formName
            this.formVisible = true
        } else if(formType == 'info'){
            this.isAdd = false
            this.formTitle = '查看' + this.formName
            this.getInfo()
        } else if(formType == 'edit'){
            this.isAdd = true
            this.formTitle = '修改' + this.formName
            this.getInfo()
        } else if(formType == 'logistics'){
            this.isAdd = false
            this.formTitle = '修改物流信息'
            this.getInfo()
        } else if(formType == 'reply'){
            this.type = formType
            this.isAdd = true
            this.disabledForm.cpicture = true
            this.disabledForm.content = true
            this.formTitle = '回复'
            this.getInfo()
        } else if(formType == 'cross'){
            this.isAdd = true
            this.formTitle = formNames
            for(let x in row){
                if(x=='address'){
                    this.form.address = row[x];
                    this.disabledForm.address = true;
                    continue;
                }
                if(x=='name'){
                    this.form.name = row[x];
                    this.disabledForm.name = true;
                    continue;
                }
                if(x=='phone'){
                    this.form.phone = row[x];
                    this.disabledForm.phone = true;
                    continue;
                }
                if(x=='isdefault'){
                    this.form.isdefault = row[x];
                    this.disabledForm.isdefault = true;
                    continue;
                }
            }
            if(row){
                this.crossRow = row
            }
            if(table){
                this.crossTable = table
            }
            if(tips){
                this.crossTips = tips
            }
            if(statusColumnName){
                this.crossColumnName = statusColumnName
            }
            if(statusColumnValue){
                this.crossColumnValue = statusColumnValue
            }
            this.form.isdefault='否'
            this.formVisible = true
        }
    },
    getInfo(){
        http.get(`address/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            address: '',
            name: '',
            phone: '',
            isdefault: '否',
            userid: '',
        }
    },





    //关闭
    closeClick(){
        this.formVisible = false
    },
    //提交
    save(){
        this.form.userid = toolUtil.storageGet('userid')
        let objcross;
        let crossUserId = ''
        let crossRefId = ''
        let crossOptNum = ''
        if(this.type == 'cross'){
            objcross = JSON.parse(JSON.stringify(this.crossRow))
            if(this.crossColumnName!=''){
                if(!this.crossColumnName.startsWith('[')){
                    for(let o in objcross){
                        if(o == this.crossColumnName){
                            objcross[o] = this.crossColumnValue
                        }
                    }
                }else{
                    crossUserId = toolUtil.storageGet('userid')
                    crossRefId = objcross['id']
                    crossOptNum = this.crossColumnName.replace(/\[|\]/g,"")
                }
            }
        }
        this.$refs.formRef.validate((valid)=>{
            if(!valid)return
            if(crossUserId&&crossRefId){
                this.form.crossuserid = crossUserId
                this.form.crossrefid = crossRefId
                let params = {
                    page: 1,
                    limit: 1000,
                    crossuserid:this.form.crossuserid,
                    crossrefid:this.form.crossrefid,
                }
                http.get('address/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`address/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
                            if(this.type == 'cross'){
                                //修改跨表数据
                                this.changeCrossData(objcross)
                            }
                            this.$message.success('操作成功')
                            this.formVisible = false
                            this.$emit('change')
                        })
                    }
                })
            }else{
                http.post(`address/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
                    if(this.type == 'cross'){
                        //修改跨表数据
                        this.changeCrossData(objcross)
                    }
                    this.$message.success('操作成功')
                    this.formVisible = false
                    this.$emit('change')
                })
            }
        })
    },
    changeCrossData(data){
         http.post(`${this.crossTable}/update`,data)
    },
},
})
