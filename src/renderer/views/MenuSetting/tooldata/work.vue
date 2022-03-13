<template>
    <v-layout>
        <div class="work-container">
            <!-- 标题 -->
            <div class="title">检修作业定义</div>
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
                <v-select
                    v-model="workForm.select"
                    :items="items"
                    item-text="label"
                    item-value="id"
                    :rules="[v => !!v || 'Item is required']"
                    label="检查厂站选择"
                    required
                ></v-select>
                <v-select
                    v-model="workForm.select"
                    :items="items"
                    item-text="label"
                    item-value="id"
                    :rules="[v => !!v || 'Item is required']"
                    label="检修电压等级"
                    required
                ></v-select>
                <div class="row-flex">
                    <v-select
                        v-model="workForm.select"
                        :items="items"
                        item-text="label"
                        item-value="id"
                        :rules="[v => !!v || 'Item is required']"
                        label="一次主线拓扑"
                        required
                    ></v-select>
                    <v-btn color="primary">选择</v-btn>
                </div>
                <div class="row-flex">
                    <v-select
                        v-model="workForm.select"
                        :items="items"
                        item-text="label"
                        item-value="id"
                        :rules="[v => !!v || 'Item is required']"
                        label="元件可靠性参数"
                        required
                    ></v-select>
                    <v-btn color="primary">选择</v-btn>
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
            dialog: false,
            workForm: { // 表单提交数据
                name: '',
            },
            addForm: {  // 添加表单数据
                name: ''
            },
            items: [
                {label: 'Item 1', id: 1},
                {label: 'Item 2', id: 2},
                {label: 'Item 3', id: 3},
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ]
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
        .row-flex {
            display: flex;
            align-items: center;
        }
    }
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
</style>
