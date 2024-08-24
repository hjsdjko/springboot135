Vue.component('liuyanban-form', {
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
                <el-form-item  label="标题" prop="biaoti" class="input-item">
                    <el-input v-model="form.biaoti"
                       placeholder="标题"
                       type="text"
                       :readonly="!isAdd||disabledForm.biaoti?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="用户账号" prop="yonghuzhanghao" class="input-item">
                    <el-input v-model="form.yonghuzhanghao"
                       placeholder="用户账号"
                       type="text"
                       :readonly="!isAdd||disabledForm.yonghuzhanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="fabushijian" class="date-item">
                    <el-date-picker
                            v-model="form.fabushijian"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :readonly="!isAdd||disabledForm.fabushijian?true:false"
                            placeholder="请选择发布时间"/>
                </el-form-item>
                <el-form-item label="问题" prop="wenti" class="textarea-item">
                    <el-input v-model="form.wenti" placeholder="问题"
                              type="textarea"
                              :readonly="!isAdd||disabledForm.wenti?true:false"
                    />
                </el-form-item>
                <el-form-item label="具体情况" prop="jutiqingkuang" class="textarea-item">
                    <el-input v-model="form.jutiqingkuang" placeholder="具体情况"
                              type="textarea"
                              :readonly="!isAdd||disabledForm.jutiqingkuang?true:false"
                    />
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
        formName:'留言板',
        rules:{
            biaoti: [
            ],
            wenti: [
            ],
            jutiqingkuang: [
            ],
            yonghuzhanghao: [
            ],
            fabushijian: [
            ],
        },
        isAdd:false,
        disabledForm:{
            biaoti : false,
            wenti : false,
            jutiqingkuang : false,
            yonghuzhanghao : false,
            fabushijian : false,
        },
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
                this.form.fabushijian = toolUtil.getCurDateTime()
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
                if(x=='biaoti'){
                    this.form.biaoti = row[x];
                    this.disabledForm.biaoti = true;
                    continue;
                }
                if(x=='wenti'){
                    this.form.wenti = row[x];
                    this.disabledForm.wenti = true;
                    continue;
                }
                if(x=='jutiqingkuang'){
                    this.form.jutiqingkuang = row[x];
                    this.disabledForm.jutiqingkuang = true;
                    continue;
                }
                if(x=='yonghuzhanghao'){
                    this.form.yonghuzhanghao = row[x];
                    this.disabledForm.yonghuzhanghao = true;
                    continue;
                }
                if(x=='fabushijian'){
                    this.form.fabushijian = row[x];
                    this.disabledForm.fabushijian = true;
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
            this.formVisible = true
        }
        http.get(this.sessionTable+'/session').then(res=>{
            var json = res.data.data
            if((json.yonghuzhanghao || json.yonghuzhanghao==0) && toolUtil.storageGet("role")!="管理员"){
                this.form.yonghuzhanghao = json.yonghuzhanghao
                this.disabledForm.yonghuzhanghao = true;
            }
        })
    },
    getInfo(){
        http.get(`liuyanban/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            biaoti: '',
            wenti: '',
            jutiqingkuang: '',
            yonghuzhanghao: '',
            fabushijian: '',
        }
    },





    //关闭
    closeClick(){
        this.formVisible = false
    },
    //提交
    save(){
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
                http.get('liuyanban/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`liuyanban/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`liuyanban/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
