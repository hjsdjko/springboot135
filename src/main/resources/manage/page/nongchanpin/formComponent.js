Vue.component('nongchanpin-form', {
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
                <el-form-item  label="产品名称" prop="chanpinmingcheng" class="input-item">
                    <el-input v-model="form.chanpinmingcheng"
                       placeholder="产品名称"
                       type="text"
                       :readonly="!isAdd||disabledForm.chanpinmingcheng?true:false" ></el-input>
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
                <el-form-item label="产品分类" prop="chanpinfenlei" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.chanpinfenlei?true:false"
                        v-model="form.chanpinfenlei"
                        placeholder="请选择产品分类"
                    >
                        <el-option v-for="(item,index) in chanpinfenleiLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格" prop="guige" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.guige?true:false"
                        v-model="form.guige"
                        placeholder="请选择规格"
                    >
                        <el-option v-for="(item,index) in guigeLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="出产地" prop="chuchandi" class="input-item">
                    <el-input v-model="form.chuchandi"
                       placeholder="出产地"
                       type="text"
                       :readonly="!isAdd||disabledForm.chuchandi?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="产品详情" prop="chanpinxiangqing" class="input-item">
                    <el-input v-model="form.chanpinxiangqing"
                       placeholder="产品详情"
                       type="text"
                       :readonly="!isAdd||disabledForm.chanpinxiangqing?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商家账号" prop="shangjiazhanghao" class="input-item">
                    <el-input v-model="form.shangjiazhanghao"
                       placeholder="商家账号"
                       type="text"
                       :readonly="!isAdd||disabledForm.shangjiazhanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商家名称" prop="shangjiamingcheng" class="input-item">
                    <el-input v-model="form.shangjiamingcheng"
                       placeholder="商家名称"
                       type="text"
                       :readonly="!isAdd||disabledForm.shangjiamingcheng?true:false" ></el-input>
                </el-form-item>
                <el-form-item v-if="type=='info'" label="收藏数量" prop="storeupnum" class="input-item">
                    <el-input v-model="form.storeupnum"
                       placeholder="收藏数量"
                       type="text"
                       :readonly="!isAdd||disabledForm.storeupnum?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="价格" prop="price" class="input-item">
                    <el-input v-model="form.price"
                       placeholder="价格"
                       type="text"
                       :readonly="!isAdd||disabledForm.price?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="单限" prop="onelimittimes" class="input-item">
                    <el-input v-model="form.onelimittimes"
                       placeholder="单限"
                       type="text"
                       :readonly="!isAdd||disabledForm.onelimittimes?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="库存" prop="alllimittimes" class="input-item">
                    <el-input v-model="form.alllimittimes"
                       placeholder="库存"
                       type="text"
                       :readonly="!isAdd||disabledForm.alllimittimes?true:false" ></el-input>
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
        formName:'农产品',
        rules:{
            chanpinmingcheng: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            tupian: [
            ],
            chanpinfenlei: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            guige: [
            ],
            chuchandi: [
            ],
            chanpinxiangqing: [
            ],
            shangjiazhanghao: [
            ],
            shangjiamingcheng: [
            ],
            storeupnum: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            clicktime: [
            ],
            price: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            onelimittimes: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            alllimittimes: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
        },
        isAdd:false,
        disabledForm:{
            chanpinmingcheng : false,
            tupian : false,
            chanpinfenlei : false,
            guige : false,
            chuchandi : false,
            chanpinxiangqing : false,
            shangjiazhanghao : false,
            shangjiamingcheng : false,
            storeupnum : false,
            clicktime : false,
            price : false,
            onelimittimes : false,
            alllimittimes : false,
        },
        //产品分类列表
        chanpinfenleiLists:[],
        //规格列表
        guigeLists:[],
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
                if(x=='chanpinmingcheng'){
                    this.form.chanpinmingcheng = row[x];
                    this.disabledForm.chanpinmingcheng = true;
                    continue;
                }
                if(x=='tupian'){
                    this.form.tupian = row[x];
                    this.disabledForm.tupian = true;
                    continue;
                }
                if(x=='chanpinfenlei'){
                    this.form.chanpinfenlei = row[x];
                    this.disabledForm.chanpinfenlei = true;
                    continue;
                }
                if(x=='guige'){
                    this.form.guige = row[x];
                    this.disabledForm.guige = true;
                    continue;
                }
                if(x=='chuchandi'){
                    this.form.chuchandi = row[x];
                    this.disabledForm.chuchandi = true;
                    continue;
                }
                if(x=='chanpinxiangqing'){
                    this.form.chanpinxiangqing = row[x];
                    this.disabledForm.chanpinxiangqing = true;
                    continue;
                }
                if(x=='shangjiazhanghao'){
                    this.form.shangjiazhanghao = row[x];
                    this.disabledForm.shangjiazhanghao = true;
                    continue;
                }
                if(x=='shangjiamingcheng'){
                    this.form.shangjiamingcheng = row[x];
                    this.disabledForm.shangjiamingcheng = true;
                    continue;
                }
                if(x=='storeupnum'){
                    this.form.storeupnum = row[x];
                    this.disabledForm.storeupnum = true;
                    continue;
                }
                if(x=='clicktime'){
                    this.form.clicktime = row[x];
                    this.disabledForm.clicktime = true;
                    continue;
                }
                if(x=='price'){
                    this.form.price = row[x];
                    this.disabledForm.price = true;
                    continue;
                }
                if(x=='onelimittimes'){
                    this.form.onelimittimes = row[x];
                    this.disabledForm.onelimittimes = true;
                    continue;
                }
                if(x=='alllimittimes'){
                    this.form.alllimittimes = row[x];
                    this.disabledForm.alllimittimes = true;
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
            this.form.storeupnum='0'
            this.form.price='0'
            this.form.onelimittimes='-1'
            this.form.alllimittimes='-1'
            this.formVisible = true
        }
        http.get(this.sessionTable+'/session').then(res=>{
            var json = res.data.data
            if((json.shangjiazhanghao || json.shangjiazhanghao==0) && toolUtil.storageGet("role")!="管理员"){
                this.form.shangjiazhanghao = json.shangjiazhanghao
                this.disabledForm.shangjiazhanghao = true;
            }
            if((json.shangjiamingcheng || json.shangjiamingcheng==0) && toolUtil.storageGet("role")!="管理员"){
                this.form.shangjiamingcheng = json.shangjiamingcheng
                this.disabledForm.shangjiamingcheng = true;
            }
        })
        http.get(`option/chanpinfenlei/chanpinfenlei`).then(res=>{
            this.chanpinfenleiLists = res.data.data
        })
        this.guigeLists = "数量,公斤,斤,件,个".split(',')
    },
    getInfo(){
        http.get(`nongchanpin/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            chanpinmingcheng: '',
            tupian: '',
            chanpinfenlei: '',
            guige: '',
            chuchandi: '',
            chanpinxiangqing: '',
            shangjiazhanghao: '',
            shangjiamingcheng: '',
            storeupnum: '0',
            clicktime: '',
            price: '0',
            onelimittimes: '-1',
            alllimittimes: '-1',
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
                http.get('nongchanpin/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`nongchanpin/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`nongchanpin/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
