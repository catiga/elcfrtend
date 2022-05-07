<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <!-- <v-card-title>变电站外进线拓扑重构作业定义</v-card-title> -->
                <v-card-text>
                    <!-- 表单 -->
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class="work-form"
                    >
                        <!-- 作业名称 -->
                        <div class="row-flex">
                            <v-text-field
                                v-model="workForm.name"
                                label="作业名称"
                                required
                            ></v-text-field>

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
                                        <v-btn text @click="addDialog = false">取消</v-btn>
                                        <v-btn text @click="addDialog = false" color="success">保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                        <v-select
                            v-model="workForm.select"
                            :items="selectItems"
                            item-text="label"
                            item-value="id"
                            label="检修类型"
                            required
                        ></v-select>
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

                        <!-- <v-radio-group label="重构方法选择" v-model="workForm.radio" row>
                            <v-radio label="手动" value="0" ></v-radio>
                            <v-radio label="自动" value="1" ></v-radio>
                        </v-radio-group>
                        <div class="row-flex">
                            <v-select
                                v-model="workForm.select"
                                :items="selectItems"
                                item-text="label"
                                item-value="id"
                                label="方案名称"
                                required
                            ></v-select>
                            <v-btn color="primary">新建</v-btn>
                        </div>

                        
                        <div class="row-flex row-flex-start">
                            <div class="row-title">线路对接方案</div>
                            <select id="sel_all_area" multiple="multiple" class="multiple-select" v-model="linesValue">
                                <option v-for="(item, index) in linesList" :key="index" :value="item.id">{{item.value}}</option>
                            </select>
                            <div class="multiple-center">
                                <v-btn small color="success" class="white--text">添加</v-btn>
                                <v-btn small color="blue-grey" class="white--text">删除</v-btn>
                            </div>
                        </div> -->

                        <!-- new -->
                        <div class="bottom-wrapper">
                            <div class="bottom-title">站内外对接节点</div>
                            <div class="bottom-wrapper-inner">
                                <v-card class="bottom-wrapper-left">
                                    <div class="table-header">
                                        <v-card-title><h4>序号</h4></v-card-title>
                                        <v-card-title><h4>变电站节点编号</h4></v-card-title>
                                        <v-card-title><h4>站外母线名称</h4></v-card-title>
                                    </div>
                                    <div class="table-row" v-for="(item,index) in tableFormList" :key="index">
                                        <div class="order">{{index + 1}}</div>
                                        <div class="select">
                                            <v-select
                                                v-model="item.select"
                                                :items="selectItems"
                                                item-text="label"
                                                item-value="id"
                                                label="检修类型"
                                            ></v-select>
                                        </div>
                                        <div class="select">
                                            <v-select
                                                v-model="item.select1"
                                                :items="selectItems"
                                                item-text="label"
                                                item-value="id"
                                                label="检修类型"
                                            ></v-select>
                                        </div>
                                    </div>
                                </v-card>
                                <div class="group-button">
                                    <v-btn small color="success" class="white--text" @click="handleAddNew">新增行</v-btn>
                                    <v-btn small color="blue-grey" class="white--text" @click="handleDelete">删除行</v-btn>
                                </div>
                            </div>
                            <!-- 按钮 -->
                            <div class="bottom-wrapper-button">
                                <v-btn color="primary" small class="white--text">开始重构</v-btn>

                                <v-dialog
                                    v-model="resultDialog"
                                    persistent
                                    max-width="400"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" color="primary" small class="white--text">结果预览</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-h3">重构方案结果预览</v-card-title>
                                        <v-card-text>
                                            <v-form
                                                ref="form"
                                                lazy-validation
                                                class="pd-8"
                                            >
                                                <v-select
                                                    v-model="workForm.select"
                                                    :items="selectItems"
                                                    item-text="label"
                                                    item-value="id"
                                                    label="方案名称"
                                                    required
                                                ></v-select>
                                                <v-card>
                                                    <v-card-title><h4>站外节点对接</h4></v-card-title>
                                                    <v-tabs fixed-tabs v-model="dialogTabActive" @change="handleChangeTab">
                                                        <v-tab
                                                            v-for="n in 2"
                                                            :key="n"
                                                        >
                                                            Item {{ n }}
                                                        </v-tab>
                                                        <v-tab-item
                                                            v-for="n in 2"
                                                            :key="n"
                                                        >
                                                            <v-list dense>
                                                                <v-list-tile>
                                                                    <v-list-tile-content>方案1</v-list-tile-content>
                                                                    <v-list-tile-content>方案2</v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-list-tile>
                                                                    <v-list-tile-content>方案3</v-list-tile-content>
                                                                </v-list-tile>
                                                            </v-list>
                                                        </v-tab-item>
                                                    </v-tabs>
                                                    
                                                </v-card>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="resultDialog = false">取消</v-btn>
                                            <v-btn text @click="resultDialog = false" color="success">保存</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                                <v-btn color="primary" small class="white--text">重置方案</v-btn>
                            </div>
                        </div>

                        
                        <div class="row-flex btn-group">
                            <v-btn small color="success" class="white--text">保存</v-btn>
                            <v-btn small color="blue-grey" class="white--text">取消</v-btn>
                        </div>
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
import {app, remote, shell} from 'electron'
export default {
    data() {
        return {
            addDialog: false,   // 新建弹窗
            addvalid: true,
            resultDialog: false, // 重构方案拓扑检查弹窗
            valid: true,
            workForm: { 
                name: '',
                radio: '',
            },
            addForm: {
                name: '',
                select: ''
            },
            selectItems: [
                {label: 'Item 1', id: 1},
                {label: 'Item 2', id: 2},
                {label: 'Item 3', id: 3},
            ],
            //检修一次性设备列表
            projBranchList: [
                {id: 1, value: '北京'},
                {id: 2, value: '上海'},
                {id: 3, value: '深圳'},
            ],
            linesList: [
                {id: 1, value: '线路1'},
                {id: 2, value: '线路2'},
                {id: 3, value: '线路3'},
            ],
            todoChildList: [],
            parentValue: [],
            childValue: [],
            linesValue: [],

            tableFormList: [
                { select: '', select1: '' },
                { select: '', select1: '' },
            ],
            dialogTabActive: 0,
        }
    },
    mounted() {
        this.loadProjBranchList()
    },
    methods: {
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
        handleMultipleAdd() {
            if (this.parentValue.length === 0) return;
            let checkedIndexArr = this.parentValue.map(v => {
                return v.split('-')[1]
            })
            let checkedItem = ''
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
        // 新增行
        handleAddNew() {
            this.tableFormList.push({
                select: '', select1: ''
            })
        },
        // 删除行
        handleDelete() {
            this.tableFormList.splice(this.tableFormList.length - 1, 1)
        },
        handleChangeTab(e) {
            console.log('3333', e)
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
.multiple-select {
    width: 240px;
    height: 300px;
    outline: none;
    border: 1px solid #666;
}
.multiple-center {
    width: 100px;
}
.btn-group {
    margin: 20px 0 0 0;
}

.bottom-wrapper {
    .bottom-wrapper-inner {
        display: flex;
        .v-card {
            flex: 1;
        }

        .group-button {
            width: 100px;
        }
    }
    .bottom-title {
        border-bottom: 1px solid #666;
        font-size: 18px;
        padding: 24px 0 6px;
    }
    .table-header {
        display: flex;
        align-items: center;
        ::v-deep .v-card__title {
            h4 {
                width: 100%;
                text-align: center;
            }
            flex: 1;
        }
    }
    .table-row {
        display: flex;
        align-items: center;
        .order {
            text-align: center;
        }
        .order,
        .select {
            flex: 1;
            margin: 0 5px;
        }
    }
    .bottom-wrapper-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 100px;
    }
}
.v-list > div {
    cursor: pointer;
}
</style>
