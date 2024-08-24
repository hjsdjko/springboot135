Vue.component('cart-form', {
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
                <el-form-item  label="商品表名" prop="tablename" class="input-item">
                    <el-input v-model="form.tablename"
                       placeholder="商品表名"
                       type="text"
                       :readonly="!isAdd||disabledForm.tablename?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商品id" prop="goodid" class="input-item">
                    <el-input v-model="form.goodid"
                       placeholder="商品id"
                       type="text"
                       :readonly="!isAdd||disabledForm.goodid?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商品名称" prop="goodname" class="input-item">
                    <el-input v-model="form.goodname"
                       placeholder="商品名称"
                       type="text"
                       :readonly="!isAdd||disabledForm.goodname?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="picture" v-if="formVisible" class="imgUpload-item">
                    <file-upload
                            :disabled="!isAdd||disabledForm.picture?true:false"
                            tip="点击上传图片"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :file-urls="form.picture?form.picture:''"
                            @change="pictureUploadSuccess"
                    ></file-upload>
                </el-form-item>
                <el-form-item  label="购买数量" prop="buynumber" class="input-item">
                    <el-input v-model="form.buynumber"
                       placeholder="购买数量"
                       type="text"
                       :readonly="!isAdd||disabledForm.buynumber?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="单价" prop="price" class="input-item">
                    <el-input v-model="form.price"
                       placeholder="单价"
                       type="text"
                       :readonly="!isAdd||disabledForm.price?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="折扣价" prop="discountprice" class="input-item">
                    <el-input v-model="form.discountprice"
                       placeholder="折扣价"
                       type="text"
                       :readonly="!isAdd||disabledForm.discountprice?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商户名称" prop="shangjiazhanghao" class="input-item">
                    <el-input v-model="form.shangjiazhanghao"
                       placeholder="商户名称"
                       type="text"
                       :readonly="!isAdd||disabledForm.shangjiazhanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="商品类型" prop="goodtype" class="input-item">
                    <el-input v-model="form.goodtype"
                       placeholder="商品类型"
                       type="text"
                       :readonly="!isAdd||disabledForm.goodtype?true:false" ></el-input>
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
        formName:'购物车',
        rules:{
            tablename: [
            ],
            goodid: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            goodname: [
            ],
            picture: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            buynumber: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            price: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            discountprice: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            userid: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            shangjiazhanghao: [
            ],
            goodtype: [
            ],
        },
        isAdd:false,
        disabledForm:{
            tablename : false,
            goodid : false,
            goodname : false,
            picture : false,
            buynumber : false,
            price : false,
            discountprice : false,
            userid : false,
            shangjiazhanghao : false,
            goodtype : false,
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
                if(x=='tablename'){
                    this.form.tablename = row[x];
                    this.disabledForm.tablename = true;
                    continue;
                }
                if(x=='goodid'){
                    this.form.goodid = row[x];
                    this.disabledForm.goodid = true;
                    continue;
                }
                if(x=='goodname'){
                    this.form.goodname = row[x];
                    this.disabledForm.goodname = true;
                    continue;
                }
                if(x=='picture'){
                    this.form.picture = row[x];
                    this.disabledForm.picture = true;
                    continue;
                }
                if(x=='buynumber'){
                    this.form.buynumber = row[x];
                    this.disabledForm.buynumber = true;
                    continue;
                }
                if(x=='price'){
                    this.form.price = row[x];
                    this.disabledForm.price = true;
                    continue;
                }
                if(x=='discountprice'){
                    this.form.discountprice = row[x];
                    this.disabledForm.discountprice = true;
                    continue;
                }
                if(x=='shangjiazhanghao'){
                    this.form.shangjiazhanghao = row[x];
                    this.disabledForm.shangjiazhanghao = true;
                    continue;
                }
                if(x=='goodtype'){
                    this.form.goodtype = row[x];
                    this.disabledForm.goodtype = true;
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
            this.form.tablename='nongchanpin'
            this.formVisible = true
        }
    },
    getInfo(){
        http.get(`cart/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            tablename: 'nongchanpin',
            goodid: '',
            goodname: '',
            picture: '',
            buynumber: '',
            price: '',
            discountprice: '',
            userid: '',
            shangjiazhanghao: '',
            goodtype: '',
        }
    },




        //图片上传回调
    pictureUploadSuccess(e){
        this.form.picture = e
    },






    //关闭
    closeClick(){
        this.formVisible = false
    },
    //提交
    save(){
        if(this.form.picture!=null) {
            this.form.picture = this.form.picture.replace(new RegExp(baseUrl,"g"),"");
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
                http.get('cart/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`cart/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`cart/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
