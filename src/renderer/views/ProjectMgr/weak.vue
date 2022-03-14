<template>
    <v-layout>
        <div class="work-container">
            <!-- 标题 -->
            <div class="title">系统薄弱环节分析</div>
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
                <v-spacer></v-spacer>
                <div class="label-title">系统运行方式选择</div>
                <v-select
                    v-model="workForm.select"
                    :items="selectItems"
                    item-text="label"
                    item-value="id"
                    label="风险评估方案"
                    required
                ></v-select>
                <div class="row-flex center">
                    <v-dialog
                        v-model="dialogSet"
                        persistent
                        max-width="800"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" color="primary">开始分析</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h3">网络等值设置</v-card-title>
                            <v-card-text>
                                <v-text-field
                                    v-model="settingName"
                                    label="作业名称"
                                    style="width: 400px"
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                <v-data-table
                                    :headers="headers"
                                    :items="desserts"
                                    hide-actions
                                    class="elevation-1"
                                >
                                    <template slot="items" slot-scope="props">
                                        <td>{{ props.item.name }}</td>
                                        <td>{{ props.item.calories }}</td>
                                        <td>{{ props.item.fat }}</td>
                                        <td>{{ props.item.carbs }}</td>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="dialogSet = false" color="success">输出报表</v-btn>
                                <v-btn text @click="dialogSet = false" color="success">确认</v-btn>
                                <v-btn text @click="dialogSet = false">取消</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    
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
            dialogSet: false,
            workForm: { // 表单提交数据
                name: '',
                select: ''
            },
            addForm: {  // 添加表单数据
                name: ''
            },
            selectItems: [ // 下拉框数据
                {label: '方案一', id: 1},
                {label: '方案二', id: 2},
                {label: '方案三', id: 3},
            ],
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
            desserts: [
                {
                    name: 'AC1201',
                    calories: '红石坡1',
                    fat: '木兰1',
                    carbs: '区内1',
                },
                {
                    name: 'AC1202',
                    calories: '红石坡',
                    fat: '木兰',
                    carbs: '区内',
                },
            ],
            settingName: '',   // 
        }
    },
    mounted() {
        
    },
    methods: {
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
        }
    }
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
.row-flex-start {
    align-items: flex-start;
}
.text-h3 {
    font-size: 20px;
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
