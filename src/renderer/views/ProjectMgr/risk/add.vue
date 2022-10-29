<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">输变电联合系统安全风险定量评估作业定义</v-card-title>
                <!-- 表单 -->
                <v-form
                    ref="form"
                    class="work-form"
                >
                    <!-- 作业名称 -->
                    <div class="row-flex">
                        <v-text-field
                            v-model="workForm.name"
                            label="作业名称"
                            required
                        ></v-text-field>

                        <!--
                        <v-dialog
                            v-model="addDialog"
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
                                    <v-btn text @click="addDialog = false">取消</v-btn>
                                    <v-btn text @click="addDialog = false" color="success">保存</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        -->
                    </div>

                    <!-- 计算信息选择 
                    <div class="label-title">计算信息选择</div>
                    <v-radio-group label="重构方法选择" v-model="workForm.radio" row>
                        <v-radio label="一阶" value="0" ></v-radio>
                        <v-radio label="二接" value="1" ></v-radio>
                    </v-radio-group>
                    -->
                    <!-- 备注 
                    <v-textarea
                        label="备注"
                        outline
                        v-model="workForm.remark"
                    ></v-textarea>
                    -->

                    <!-- 系统运行方式选择 -->
                    <div class="label-title">系统运行方式选择</div>
                    <v-select
                        v-model="workForm.select"
                        :items="selectItems"
                        item-text="name"
                        item-value="index"
                        label="拓扑重构作业方案"
                        @change="confirmSelTopo"
                    ></v-select>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog
                            v-model="resultDialog"
                            persistent
                            max-width="700"
                        >
                            <!--
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" color="success" style="margin: 0 6px 0 0;">结果输出</v-btn>
                            </template>
                            -->
                            <v-card>
                                <v-card-title class="text-h3">风险评估结果</v-card-title>
                                <v-card-text>
                                    <v-form
                                        ref="form"
                                        lazy-validation
                                        class="pd-8"
                                    >
                                        <v-text-field
                                            v-model="resultForm.name"
                                            label="作业名称"
                                        ></v-text-field>
                                        <v-tabs v-model="resultForm.active">
                                            <v-tab>风险指标</v-tab>
                                            <v-tab>系统运行指标</v-tab>

                                            <v-tab-item>我是图表</v-tab-item>
                                            <v-tab-item>我是系统运行指标</v-tab-item>
                                        </v-tabs>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="resultDialog = false" color="success">输出报表</v-btn>
                                    <v-btn text @click="resultDialog = false" color="success">确定</v-btn>
                                    <v-btn text @click="resultDialog = false">取消</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn color="success" @click="saveCompute">保存计算</v-btn>
                        <v-btn>取消</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>

         <v-snackbar
                v-model="snackbar"
                right
                top
                :color="submitResult ? 'success' : 'error'"
        >
            {{ snackbarMsg}}
            <v-btn
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>

    </v-layout>
</template>

<script>
import {
    loadTopoMethod,
    saveRiskTask
} from '../../../../api/compute_risk'
import {app, remote, shell} from 'electron'
export default {
    data() {
        return {
            // 操作提示
            snackbar: false,
            snackbarMsg: '',

            addDialog: false,
            resultDialog: false,
            workForm: {
                name: '',
                radio: '0',
                remark: '',
                select: ''
            },
            addForm: {  // 新建弹窗表单
                name: ''
            },
            resultForm: {
                name: '',
                active: 1
            },
            selectItems: [],
            topo: {}
        }
    },
    watch: {
        submitResult: {
            handler(val) {
                if (val) {
                    this.snackbarMsg = this.snackbarMsg ? this.snackbarMsg : '操作成功'
                } else {
                    this.snackbarMsg = this.snackbarMsg ? this.snackbarMsg : '操作失败'
                }
            }
        },
        snackbar: {
            handler(val) {
                if (!val) {
                    // 重置结果显示相关
                    this.submitResult = false
                    this.snackbarMsg = ''
                }
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            //判断工程
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                this.loading = false
                return
            }
            loadTopoMethod(currentProject.id).then(result => {
                this.selectItems = result.data.head
                this.topo = result.data
            }).catch(err => {

            })
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
            saveRiskTask(this.workForm, this.topo, currentProject.id).then(result => {
                if(result.code === 200) {
                    this.$http.post(`http://127.0.0.1:8081/api/task/compute/risk/${result.data.id}`, {
                        headers: {}
                    }).catch(function(error) {
                        console.log(error)
                    }).then(function(response) {
                        console.log(response)
                    })
                    this.$router.push({path: '/projectMgr/task/risk/list'})
                }
            }).catch(err => {
                this.snackbar = true
                this.snackbarMsg = err.message
                this.loading = false
                return
            })
        },

        confirmSelTopo(item) {
            this.workForm.select = item
        }
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
.row-title {
    font-size: 16px;
    margin: 0 20px 0 0 ;
}
.label-title {
    font-size: 18px;
    color: hsla(0,0%,100%,0.7);
    font-weight: bold;
    margin-top: 12px;
}
</style>
