Vue.component('news-form', {
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
                <el-form-item  label="标题" prop="title" class="input-item">
                    <el-input v-model="form.title"
                       placeholder="标题"
                       type="text"
                       :readonly="!isAdd||disabledForm.title?true:false" ></el-input>
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
                <el-form-item label="简介" prop="introduction" class="textarea-item">
                    <el-input v-model="form.introduction" placeholder="简介"
                              type="textarea"
                              :readonly="!isAdd||disabledForm.introduction?true:false"
                    />
                </el-form-item>
                <el-form-item label="内容" prop="content" v-if="formVisible" class="rich-item">
                     <my-editor
                             :value="form.content" placeholder="请输入内容"
                             :readonly="!isAdd||disabledForm.content?true:false"
                             @change="(e)=>editorChange(e,'content')"></my-editor  >
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
        formName:'公告信息',
        rules:{
            title: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            introduction: [
            ],
            picture: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            content: [
                {required: true,validator:toolUtil.fromValidate.richText,trigger: 'blur'},

            ],
        },
        isAdd:false,
        disabledForm:{
            title : false,
            introduction : false,
            picture : false,
            content : false,
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
                if(x=='title'){
                    this.form.title = row[x];
                    this.disabledForm.title = true;
                    continue;
                }
                if(x=='introduction'){
                    this.form.introduction = row[x];
                    this.disabledForm.introduction = true;
                    continue;
                }
                if(x=='picture'){
                    this.form.picture = row[x];
                    this.disabledForm.picture = true;
                    continue;
                }
                if(x=='content'){
                    this.form.content = row[x];
                    this.disabledForm.content = true;
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
    },
    getInfo(){
        http.get(`news/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            res.data.data.content = res.data.data.content?(res.data.data.content.replace(reg,'../../../cl634511100/upload')):'';
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            title: '',
            introduction: '',
            picture: '',
            content: '',
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
                http.get('news/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`news/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`news/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
