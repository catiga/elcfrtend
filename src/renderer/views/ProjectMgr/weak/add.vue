<template>
    <v-layout row>
         <v-flex xs12 d-flex>
             <v-card>
                <v-card-title class="text-h3">系统薄弱环节分析</v-card-title>
                <!-- 表单 -->
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    class="work-form"
                >
                    <div class="row-flex">
                        <v-text-field
                            v-model="workForm.name"
                            label="作业名称"
                        ></v-text-field>

                        <!--
                        <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="400"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" color="primary">新建</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="text-h3">新建</v-card-title>
                                <v-card-text>
                                    <v-form
                                        ref="form"
                                        v-model="addvalid"
                                        lazy-validation
                                        class="pd-8"
                                    >
                                        <v-text-field
                                            v-model="addForm.name"
                                            label="Name"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="addForm.name"
                                            label="Name"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="dialog = false">取消</v-btn>
                                    <v-btn text @click="dialog = false" color="success">保存</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        -->
                    </div>
                    <v-spacer></v-spacer>
                    <div class="label-title">系统运行方式选择</div>
                    <v-select
                        v-model="workForm.select"
                        :items="selectItems"
                        item-text="name"
                        item-value="index"
                        label="风险评估方案"
                        required
                    ></v-select>
                    <div class="row-flex center">
                        <v-btn color="primary" @click="saveCompute">保存计算</v-btn>
                        <v-btn @click="handleCancle">取消</v-btn>
                    </div>
                </v-form>
             </v-card>
         </v-flex>
        <div class="work-container">
        </div>

    </v-layout>
</template>

<script>

import {
    loadTopoMethod,
    saveWeakTask
} from '../../../../api/compute_weak'
import { remote } from 'electron'
export default {
    data() {
        return {
            valid: true,
            addvalid: true,
            setvalid: true,
            dialog: false,
            dialogSet: false,
            workForm: { // 表单提交数据
                name: '',
                select: ''
            },
            addForm: {  // 添加表单数据
                name: ''
            },
            selectItems: [], // 下拉框数据
            headers: [
                {
                    text: '元件名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '元件类型', sortable: false, value: 'calories' },
                { text: '元件位置', sortable: false, value: 'fat' },
                { text: '元件失效后系统主要风险指标', sortable: false, value: 'carbs' },
            ],
            desserts: [],
            settingName: '',   // 
            topo: {}
        }
    },
    mounted() {
        this.initialData()
    },
    methods: {
        // 获取风险下来框列表
        initialData() {
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                this.loading = false
                return
            }
            loadTopoMethod(currentProject.id).then(result => {
                console.log(result)
                this.selectItems = result.data.head
                this.topo = result.data
            }).catch(err => {

            })
        },
        // 网络等值设置 - 添加
        handleAddTableData() {
            let item = {
                name: 'AC1203',
                calories: '红石坡',
                fat: '木兰',
                carbs: '区内',
                protein: '区外',
            }
            this.desserts.push(item)
        },
        handleDeleteTableData() {
            this.desserts.splice(this.desserts.length-1, 1)
        },
        handleCancle() {
            this.$router.go(-1)
        },

        saveCompute() {
            console.log(this.workForm, this.topo)
             //判断工程
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                this.loading = false
                return
            }
            this.loading = true
            saveWeakTask(this.workForm, this.topo, currentProject.id).then(result => {
                if(result.code === 200) {
                    this.$http.get(`http://127.0.0.1:8081/api/task/compute/weak/${result.data.id}`).catch(function(error) {
                        console.log(error)
                    }).then(function(response) {
                        console.log(response)
                    })
                    this.$router.push({path: '/projectMgr/task/weak/list'})
                }
            }).catch(err => {
                this.snackbar = true
                this.snackbarMsg = err.message
                this.loading = false
                return
            })
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
.work-form {
    width: 600px;
    margin: 20px auto 40px;
}
.row-flex {
    display: flex;
    align-items: center;
}
.row-flex-start {
    align-items: flex-start;
}
.text-h3 {
    font-size: 16px;
    font-weight: bold;
}
.label-title {
    font-size: 18px;
    color: hsla(0,0%,100%,0.7);
    font-weight: bold;
    margin-top: 12px;
}
</style>
<style type="text/css" lang="scss">
::v-deep .v-btn--floating .v-btn__content {
    height: auto !important;    
}
.center {
    justify-content: space-around;
}
.center-btn {
    margin: 0 auto;
}
</style>
