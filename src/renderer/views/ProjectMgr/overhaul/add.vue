<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">检修过渡方案建议</v-card-title>
                <v-card-text>
                    <!-- 表单 -->
                    <v-form
                        ref="form"
                        class="work-form"
                    >
                        <!-- 作业名称 -->
                        <v-text-field
                            v-model="workForm.name"
                            label="方案名称"
                            required
                        ></v-text-field>
                        <!-- 站外进线重构方案 -->
                        <v-spacer></v-spacer>
                        <div class="label-title">方案描述</div>
                        <v-text-field
                            v-model="workForm.name"
                            label="悬空节点"
                            required
                        ></v-text-field>
                        <v-flex xs12 sm6 d-flex>
                            <v-select
                            v-model="workForm.select"
                            :items="items"
                            label="站外节点对接"
                            ></v-select>
                        </v-flex>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success">拓扑结构</v-btn>
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
            items: ['方案一', '方案二']
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
