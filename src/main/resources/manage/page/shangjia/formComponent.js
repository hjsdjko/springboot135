Vue.component('shangjia-form', {
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
                <el-form-item label="商家账号" prop="shangjiazhanghao" class="input-item">
                    <el-input v-model="form.shangjiazhanghao"
                           placeholder="商家账号"
                           type="text"
                           :readonly="!isAdd||disabledForm.shangjiazhanghao?true:false"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="mima" class="input-item">
                    <el-input v-model="form.mima"
                           placeholder="密码"
                           type="password"
                           :readonly="!isAdd||disabledForm.mima?true:false"></el-input>
                </el-form-item>
                <el-form-item  label="商家名称" prop="shangjiamingcheng" class="input-item">
                    <el-input v-model="form.shangjiamingcheng"
                       placeholder="商家名称"
                       type="text"
                       :readonly="!isAdd||disabledForm.shangjiamingcheng?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="tupian" v-if="formVisible" class="imgUpload-item">
                    <file-upload
                            :disabled="!isAdd||disabledForm.tupian?true:false"
                            tip="点击上传图片"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :file-urls="form.tupian?form.tupian:''"
                            @change="tupianUploadSuccess"
                    ></file-upload>
                </el-form-item>
                <el-form-item  label="负责人" prop="fuzeren" class="input-item">
                    <el-input v-model="form.fuzeren"
                       placeholder="负责人"
                       type="text"
                       :readonly="!isAdd||disabledForm.fuzeren?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="联系电话" prop="lianxidianhua" class="input-item">
                    <el-input v-model="form.lianxidianhua"
                       placeholder="联系电话"
                       type="text"
                       :readonly="!isAdd||disabledForm.lianxidianhua?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商家地址" prop="shangjiadizhi" class="input-item">
                    <el-input v-model="form.shangjiadizhi"
                       placeholder="商家地址"
                       type="text"
                       :readonly="!isAdd||disabledForm.shangjiadizhi?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="星级" prop="xingji" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.xingji?true:false"
                        v-model="form.xingji"
                        placeholder="请选择星级"
                    >
                        <el-option v-for="(item,index) in xingjiLists" :label="item"
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
        formName:'商家',
        rules:{
            shangjiazhanghao: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            mima: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            shangjiamingcheng: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            tupian: [
            ],
            fuzeren: [
            ],
            lianxidianhua: [
                { validator: toolUtil.fromValidate.mobile, trigger: 'blur' },
            ],
            shangjiadizhi: [
            ],
            xingji: [
            ],
        },
        isAdd:false,
        disabledForm:{
            shangjiazhanghao : false,
            mima : false,
            shangjiamingcheng : false,
            tupian : false,
            fuzeren : false,
            lianxidianhua : false,
            shangjiadizhi : false,
            xingji : false,
        },
        //星级列表
        xingjiLists:[],
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
                if(x=='shangjiazhanghao'){
                    this.form.shangjiazhanghao = row[x];
                    this.disabledForm.shangjiazhanghao = true;
                    continue;
                }
                if(x=='mima'){
                    this.form.mima = row[x];
                    this.disabledForm.mima = true;
                    continue;
                }
                if(x=='shangjiamingcheng'){
                    this.form.shangjiamingcheng = row[x];
                    this.disabledForm.shangjiamingcheng = true;
                    continue;
                }
                if(x=='tupian'){
                    this.form.tupian = row[x];
                    this.disabledForm.tupian = true;
                    continue;
                }
                if(x=='fuzeren'){
                    this.form.fuzeren = row[x];
                    this.disabledForm.fuzeren = true;
                    continue;
                }
                if(x=='lianxidianhua'){
                    this.form.lianxidianhua = row[x];
                    this.disabledForm.lianxidianhua = true;
                    continue;
                }
                if(x=='shangjiadizhi'){
                    this.form.shangjiadizhi = row[x];
                    this.disabledForm.shangjiadizhi = true;
                    continue;
                }
                if(x=='xingji'){
                    this.form.xingji = row[x];
                    this.disabledForm.xingji = true;
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
        })
        this.xingjiLists = "一级,二级,三级,四级,五级".split(',')
    },
    getInfo(){
        http.get(`shangjia/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            shangjiazhanghao: '',
            mima: '',
            shangjiamingcheng: '',
            tupian: '',
            fuzeren: '',
            lianxidianhua: '',
            shangjiadizhi: '',
            xingji: '',
        }
    },




        //图片上传回调
    tupianUploadSuccess(e){
        this.form.tupian = e
    },




    //关闭
    closeClick(){
        this.formVisible = false
    },
    //提交
    save(){
        if(this.form.tupian!=null) {
            this.form.tupian = this.form.tupian.replace(new RegExp(baseUrl,"g"),"");
        }
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
                http.get('shangjia/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`shangjia/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`shangjia/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
document.write(`<script src="../../components/FileUpload.js"></script>`)
