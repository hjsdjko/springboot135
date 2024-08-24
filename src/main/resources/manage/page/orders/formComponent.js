Vue.component('orders-form', {
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
                <el-form-item label="订单编号" prop="orderid" class="input-item">
                    <el-input v-model="form.orderid" :readonly="true"
                              placeholder="订单编号"></el-input>
                </el-form-item>
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
                <el-form-item  label="总价" prop="total" class="input-item">
                    <el-input v-model="form.total"
                       placeholder="总价"
                       type="text"
                       :readonly="!isAdd||disabledForm.total?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="折扣总价格" prop="discounttotal" class="input-item">
                    <el-input v-model="form.discounttotal"
                       placeholder="折扣总价格"
                       type="text"
                       :readonly="!isAdd||disabledForm.discounttotal?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="type" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.type?true:false"
                        v-model="form.type"
                        placeholder="请选择支付类型"
                    >
                        <el-option v-for="(item,index) in typeLists" :label="item"
                               :value="index + 1"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="订单状态" prop="status" class="input-item">
                    <el-input v-model="form.status"
                       placeholder="订单状态"
                       type="text"
                       :readonly="!isAdd||disabledForm.status?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="地址" prop="address" class="input-item">
                    <el-input v-model="form.address"
                       placeholder="地址"
                       type="text"
                       :readonly="!isAdd||disabledForm.address?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="电话" prop="tel" class="input-item">
                    <el-input v-model="form.tel"
                       placeholder="电话"
                       type="text"
                       :readonly="!isAdd||disabledForm.tel?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="收货人" prop="consignee" class="input-item">
                    <el-input v-model="form.consignee"
                       placeholder="收货人"
                       type="text"
                       :readonly="!isAdd||disabledForm.consignee?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="备注" prop="remark" class="input-item">
                    <el-input v-model="form.remark"
                       placeholder="备注"
                       type="text"
                       :readonly="!isAdd||disabledForm.remark?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="addtime" class="date-item">
                    <el-date-picker
                            v-model="form.addtime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :readonly="!isAdd||disabledForm.addtime?true:false"
                            placeholder="请选择创建时间"/>
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
                <el-form-item label="下单时间" prop="addtime" class="input-item">
                    <el-input v-model="form.addtime" placeholder="下单时间"
                           readonly></el-input>
                </el-form-item>
                <el-form-item label="物流" prop="logistics" v-if="formVisible" class="rich-item">
                     <my-editor
                             :value="form.logistics" placeholder="请输入物流"
                             :readonly="type == 'logistics'?false:true"
                             @change="(e)=>editorChange(e,'logistics')"></my-editor>
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
        formName:'商品订单',
        rules:{
            orderid: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
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
            total: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            discounttotal: [
                { validator: toolUtil.fromValidate.number, trigger: 'blur' },
            ],
            type: [
            ],
            status: [
            ],
            address: [
            ],
            tel: [
            ],
            consignee: [
            ],
            remark: [
            ],
            logistics: [
            ],
            addtime: [
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
            orderid : false,
            tablename : false,
            goodid : false,
            goodname : false,
            picture : false,
            buynumber : false,
            price : false,
            discountprice : false,
            total : false,
            discounttotal : false,
            type : false,
            status : false,
            address : false,
            tel : false,
            consignee : false,
            remark : false,
            logistics : false,
            addtime : false,
            userid : false,
            shangjiazhanghao : false,
            goodtype : false,
        },
        //支付类型列表
        typeLists:[],
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
                if(x=='orderid'){
                    this.form.orderid = row[x];
                    this.disabledForm.orderid = true;
                    continue;
                }
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
                if(x=='total'){
                    this.form.total = row[x];
                    this.disabledForm.total = true;
                    continue;
                }
                if(x=='discounttotal'){
                    this.form.discounttotal = row[x];
                    this.disabledForm.discounttotal = true;
                    continue;
                }
                if(x=='type'){
                    this.form.type = row[x];
                    this.disabledForm.type = true;
                    continue;
                }
                if(x=='status'){
                    this.form.status = row[x];
                    this.disabledForm.status = true;
                    continue;
                }
                if(x=='address'){
                    this.form.address = row[x];
                    this.disabledForm.address = true;
                    continue;
                }
                if(x=='tel'){
                    this.form.tel = row[x];
                    this.disabledForm.tel = true;
                    continue;
                }
                if(x=='consignee'){
                    this.form.consignee = row[x];
                    this.disabledForm.consignee = true;
                    continue;
                }
                if(x=='remark'){
                    this.form.remark = row[x];
                    this.disabledForm.remark = true;
                    continue;
                }
                if(x=='logistics'){
                    this.form.logistics = row[x];
                    this.disabledForm.logistics = true;
                    continue;
                }
                if(x=='addtime'){
                    this.form.addtime = row[x];
                    this.disabledForm.addtime = true;
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
        this.typeLists = "现金,积分".split(',')
    },
    getInfo(){
        http.get(`orders/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            res.data.data.logistics = res.data.data.logistics?(res.data.data.logistics.replace(reg,'../../../cl634511100/upload')):'';
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            orderid: new Date().getTime(),
            tablename: 'nongchanpin',
            goodid: '',
            goodname: '',
            picture: '',
            buynumber: '',
            price: '',
            discountprice: '',
            total: '',
            discounttotal: '',
            type: '',
            status: '',
            address: '',
            tel: '',
            consignee: '',
            remark: '',
            logistics: '',
            addtime: '',
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
    //富文本
    editorChange(e,name){
        this.form[name] = e
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
                http.get('orders/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`orders/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`orders/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
document.write(`<script src="${baseUrl}manage/static/modules/wangeditor/index.min.js"></script>`)
document.write(`<script src="../../components/myEditor.js"></script>`)
document.write(`<link rel="stylesheet" href="${baseUrl}manage/static/modules/wangeditor/style.css"></link>`)
