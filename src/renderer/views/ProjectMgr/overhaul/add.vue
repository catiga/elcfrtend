<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">检修过渡方案智能决策作业定义</v-card-title>
                <v-card-text>
                    <!-- 表单 -->
                    <v-form
                        ref="form"
                        class="work-form"
                    >
                        <!-- 作业名称 -->
                        <v-text-field
                            v-model="workForm.name"
                            label="作业名称"
                            required
                        ></v-text-field>
                        <!-- 站外进线重构方案 -->
                        <v-spacer></v-spacer>
                        <!-- 左右多选下拉框 -->
                        <div class="row-flex" style="margin: 20px 0 0 0;">
                            <select id="sel_all_area" multiple="multiple" class="multiple-select" v-model="parentValue">
                                <option v-for="(item, index) in projBranchList" :key="index" :value="item.id + '-' + index ">{{item.value}}</option>
                            </select>
                            <div class="multiple-center">
                                <v-btn small color="success" class="white--text" @click="handleMultipleAdd">
                                    添加<v-icon right dark>double_arrow</v-icon>
                                </v-btn>
                                <v-btn small color="blue-grey" class="white--text" @click="handleMultipleDelete">
                                    删除<v-icon right dark>delete_forever</v-icon>
                                </v-btn>
                            </div>
                            <select id="sel_all_area" multiple="multiple" class="multiple-select" v-model="childValue">
                                <option v-for="(item, index) in todoChildList" :key="index" :value="item.id + '-' + index + '|' + item.parentIndex">{{item.value}}</option>
                            </select>
                        </div>


                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success">开始计算</v-btn>
                            <v-btn color="blue-grey" @click="$router.go(-1)">取消</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import {
    loadBranchInfo
} from '../../../../api/compute_station'
import { remote } from 'electron'
export default {
    data() {
        return {
            addDialog: false,
            workForm: {
                name: ''
            },
            addForm: {
                name: ''
            },
            allParentList: [
                {id: 1, value: '北京'},
                {id: 2, value: '上海'},
                {id: 3, value: '深圳'},
            ],
            todoChildList: [],
            parentValue: [],
            childValue: [],

            projBranchList: [],
        }
    },
    mounted() {
        this.loadProjBranchList()
    },
    methods: {
        handleMultipleAdd() {
            if (this.parentValue.length === 0) return;
            let checkedIndexArr = this.parentValue.map(v => {
                return v.split('-')[1]
            })
            let checkedItem = ''
            console.log('checkedIndexArr----->', checkedIndexArr)
            checkedIndexArr.forEach((v) => {
                checkedItem = this.projBranchList.splice(v, 1)
                checkedItem[0].parentIndex = v
                this.todoChildList.push(checkedItem[0])
            })
            this.parentValue = []
        },
        handleMultipleDelete() {
            if (this.childValue.length === 0) return;
            let checkedIndexArr = this.childValue.map(v => {
                return v.split('-')[1]
            })
            let checkedItem = ''
            checkedIndexArr.forEach((v) => {
                checkedItem = this.todoChildList.splice(v.split('|')[0], 1)
                this.projBranchList.splice(v.split('|')[1], 0, checkedItem[0])
            })
            this.childValue = []
        },
        loadProjBranchList() {
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                this.loading = false
                return
            }
            loadBranchInfo(currentProject.id).then(result => {
                if(result.code === 200) {
                    let tmpData = []
                    for(let x in result.data) {
                        let tmp = result.data[x]
                        tmpData.push({id:tmp.id, value:tmp.name})
                    }
                    this.projBranchList = tmpData
                }
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
.multiple-select {
    width: 240px;
    height: 200px;
    outline: none;
    border: 1px solid #666;
}
.multiple-center {
    width: 100px;
}
.label-title {
    font-size: 20px;
    color: hsla(0,0%,100%,0.7);
    margin: 12px 0 0 0;
}
.flex.sm6 {
    max-width: 100% !important;
}
</style>
