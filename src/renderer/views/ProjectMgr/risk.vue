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
                    <!-- 计算信息选择 -->
                    <div class="label-title">计算信息选择</div>
                    <v-radio-group label="重构方法选择" v-model="workForm.radio" row>
                        <v-radio label="一阶" value="0" ></v-radio>
                        <v-radio label="二接" value="1" ></v-radio>
                    </v-radio-group>
                    <!-- 备注 -->
                    <v-textarea
                        label="备注"
                        outline
                        v-model="workForm.remark"
                    ></v-textarea>
                    <!-- 系统运行方式选择 -->
                    <div class="label-title">系统运行方式选择</div>
                    <v-select
                        v-model="workForm.select"
                        :items="selectItems"
                        item-text="label"
                        item-value="id"
                        label="拓扑重构作业方案"
                    ></v-select>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog
                            v-model="resultDialog"
                            persistent
                            max-width="700"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" color="success" style="margin: 0 6px 0 0;">结果输出</v-btn>
                            </template>
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
                        <v-btn color="success">开始计算</v-btn>
                        <v-btn>取消</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
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
            selectItems: [
                {label: '方案一', id: 1},
                {label: '方案二', id: 2},
                {label: '方案三', id: 3},
            ],
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
