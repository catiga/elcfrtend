<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-text>
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
                        </div>
                        <!-- 站外进线重构方案 -->
                        <v-spacer></v-spacer>
                        <div class="label-title">站外进线重构方案</div>
                        <div class="row-flex" style="margin: 5px 0 0 0;">
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
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success">开始计算</v-btn>
                            <v-btn color="blue-grey">取消</v-btn>
                        </v-card-actions>
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
    font-size: 16px;
    color: hsla(0,0%,100%,0.7);
}
</style>
