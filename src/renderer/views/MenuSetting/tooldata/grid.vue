<template>
    <v-layout>
        <div class="work-container">
            <!-- 标题 -->
            <div class="title">区域电网等值作业定义</div>
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
                        :rules="nameRules"
                        label="作业名称"
                        required
                    ></v-text-field>

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
                </div>
                <div class="row-flex">
                    <v-text-field
                        v-model="workForm.name"
                        :rules="nameRules"
                        label="待评估区域节点规模"
                        required
                    ></v-text-field>
                    <v-btn color="primary">计算</v-btn>
                </div>
                <div class="row-flex">
                    <v-dialog
                        v-model="dialogSet"
                        persistent
                        max-width="800"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" color="primary" class="center-btn">网络等值设置</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h3">网络等值设置</v-card-title>
                            <v-card-text>
                                <div class="row-flex">
                                    <v-data-table
                                        :headers="headers"
                                        :items="desserts"
                                        hide-default-footer
                                        class="elevation-1"
                                    >
                                    </v-data-table>
                                    <div class="row-flex-right">
                                        <v-btn color="success">添加</v-btn>
                                        <v-btn color="error">删除</v-btn>
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="dialogSet = false" color="success">结果预览</v-btn>
                                <v-btn text @click="dialogSet = false" color="success">确认</v-btn>
                                <v-btn text @click="dialogSet = false">取消</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                <div class="row-flex center">
                    <v-btn color="primary">开始等值</v-btn>
                    <v-btn color="primary">取消</v-btn>
                </div>
            </v-form>
        </div>

    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            addvalid: true,
            setvalid: true,
            dialog: false,
            dialogSet: true,
            workForm: { // 表单提交数据
                name: '',
            },
            addForm: {  // 添加表单数据
                name: ''
            },
            items: [ // 下拉框数据
                {label: 'Item 1', id: 1},
                {label: 'Item 2', id: 2},
                {label: 'Item 3', id: 3},
            ],
            nameRules: [ // 表单验证
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            headers: [
                {
                    text: '支路名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'I侧母线', value: 'calories' },
                { text: 'J侧母线', value: 'fat' },
                { text: 'I侧位置', value: 'carbs' },
                { text: 'J侧位置', value: 'protein' },
            ],
            desserts: [
                {
                    name: 'AC1201',
                    calories: '红石坡1',
                    fat: '木兰1',
                    carbs: '区内1',
                    protein: '区外1',
                },
                {
                    name: 'AC1202',
                    calories: '红石坡',
                    fat: '木兰',
                    carbs: '区内',
                    protein: '区外',
                },
            ],
        }
    },
    mounted() {
        console.log('-========-------', this.desserts)
    },
}
</script>

<style type="text/css" lang="scss" scoped>
.work-container {
    align-self: start;
    width: 100%;
    .title {
        font-size: 16px;
        font-weight: bold;
    }
    .work-form {
        width: 600px;
        margin: 20px auto 40px;
    }
}
.row-flex {
    display: flex;
    align-items: center;
}
.text-h3 {
    font-size: 20px;
    font-weight: bold;
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
.v-dialog .elevation-1 {
    width: 680px;
}
.row-flex-right {
    width: 120px;
}
</style>
