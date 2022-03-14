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
                                <option v-for="(item, index) in allParentList" :key="index" :value="item.id + '-' + index ">{{item.value}}</option>
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
                        <v-radio-group label="重构方法选择" v-model="workForm.radio" row>
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
                                <option v-for="(item, index) in linesList" :key="index" :value="id">{{item.value}}</option>
                            </select>
                            <div class="multiple-center">
                                <v-btn small color="success" class="white--text">添加</v-btn>
                                <v-btn small color="blue-grey" class="white--text">删除</v-btn>
                            </div>
                        </div>
                        <div class="row-flex btn-group">
                            <v-dialog
                                v-model="resultDialog"
                                persistent
                                max-width="400"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" small color="primary" class="white--text">结果输出</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h3">重构方案拓扑检查</v-card-title>
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
                                            <v-textarea
                                                name="input-7-1"
                                                label="Default style"
                                                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                                                hint="Hint text"
                                            ></v-textarea>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="resultDialog = false">取消</v-btn>
                                        <v-btn text @click="resultDialog = false" color="success">保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-btn small color="success" class="white--text" style="margin: 0 0 0 auto;">确定</v-btn>
                            <v-btn small color="blue-grey" class="white--text">取消</v-btn>
                        </div>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
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
            allParentList: [
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
            linesValue: []
        }
    },
    methods: {
        handleMultipleAdd() {
            if (this.parentValue.length === 0) return;
            let checkedIndexArr = this.parentValue.map(v => {
                return v.split('-')[1]
            })
            let checkedItem = ''
            checkedIndexArr.forEach((v) => {
                checkedItem = this.allParentList.splice(v, 1)
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
                this.allParentList.splice(v.split('|')[1], 0, checkedItem[0])
            })
            this.childValue = []
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
    font-size: 20px;
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
</style>
